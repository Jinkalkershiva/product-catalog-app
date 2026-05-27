package com.ecom.productcatalog.order.controller;

import com.ecom.productcatalog.delivery.model.Delivery;
import com.ecom.productcatalog.delivery.repository.DeliveryRepository;
import com.ecom.productcatalog.order.dto.OrderItemRequest;
import com.ecom.productcatalog.order.dto.OrderRequest;
import com.ecom.productcatalog.order.dto.OrderResponse;
import com.ecom.productcatalog.order.model.Order;
import com.ecom.productcatalog.order.model.OrderItem;
import com.ecom.productcatalog.order.repository.OrderRepository;
import com.ecom.productcatalog.product.model.Product;
import com.ecom.productcatalog.product.repository.ProductRepository;
import com.ecom.productcatalog.security.services.UserDetailsImpl;
import com.ecom.productcatalog.user.model.User;
import com.ecom.productcatalog.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final DeliveryRepository deliveryRepository;

    public OrderController(OrderRepository orderRepository,
                           UserRepository userRepository,
                           ProductRepository productRepository,
                           DeliveryRepository deliveryRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.deliveryRepository = deliveryRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getMyOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl principal = (UserDetailsImpl) auth.getPrincipal();

        List<OrderResponse> responses = orderRepository.findByUserId(principal.getId()).stream()
                .map(this::mapToResponse)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        List<OrderResponse> responses = orderRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl principal = (UserDetailsImpl) auth.getPrincipal();

        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setAddress(request.getAddress());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus("CONFIRMED");

        double totalAmount = 0.0;
        List<OrderItem> items = new ArrayList<>();

        for (OrderItemRequest reqItem : request.getItems()) {
            Product product = productRepository.findById(reqItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found ID: " + reqItem.getProductId()));

            // Reduce stock
            if (product.getStock() >= reqItem.getQuantity()) {
                product.setStock(product.getStock() - reqItem.getQuantity());
                productRepository.save(product);
            }

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(reqItem.getQuantity());
            item.setPrice(product.getPrice());
            item.setOrder(order);
            items.add(item);

            totalAmount += product.getPrice() * reqItem.getQuantity();
        }

        // Apply dynamic GST (18%)
        double tax = totalAmount * 0.18;
        order.setTotalAmount(totalAmount + tax);
        order.setItems(items);

        Order savedOrder = orderRepository.save(order);

        // Auto-provision a delivery tracking row!
        Delivery delivery = new Delivery();
        delivery.setOrder(savedOrder);
        delivery.setStatus("PENDING");
        delivery.setUpdatedAt(LocalDateTime.now());
        deliveryRepository.save(delivery);

        return ResponseEntity.ok(mapToResponse(savedOrder));
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse res = new OrderResponse();
        res.setId(order.getId());
        res.setAddress(order.getAddress());
        res.setPaymentMethod(order.getPaymentMethod());
        res.setTotalAmount(order.getTotalAmount());
        res.setStatus(order.getStatus());
        return res;
    }
}
