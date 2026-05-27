package com.ecom.productcatalog.delivery.controller;

import com.ecom.productcatalog.delivery.model.Delivery;
import com.ecom.productcatalog.delivery.repository.DeliveryRepository;
import com.ecom.productcatalog.order.model.Order;
import com.ecom.productcatalog.order.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    private final DeliveryRepository deliveryRepository;
    private final OrderRepository orderRepository;

    public DeliveryController(DeliveryRepository deliveryRepository, OrderRepository orderRepository) {
        this.deliveryRepository = deliveryRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries() {
        return ResponseEntity.ok(deliveryRepository.findAll());
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Delivery> getDeliveryByOrder(@PathVariable Long orderId) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Delivery details not found for Order ID: " + orderId));
        return ResponseEntity.ok(delivery);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Delivery> updateDeliveryStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery not found with ID: " + id));

        String newStatus = payload.get("status"); // PENDING, PICKED_UP, ON_THE_WAY, REACHED, DELIVERED
        delivery.setStatus(newStatus);
        delivery.setUpdatedAt(LocalDateTime.now());

        // Update corresponding order status
        Order order = delivery.getOrder();
        if (order != null) {
            if ("DELIVERED".equals(newStatus)) {
                order.setStatus("DELIVERED");
            } else if ("ON_THE_WAY".equals(newStatus)) {
                order.setStatus("SHIPPED");
            }
            orderRepository.save(order);
        }

        Delivery saved = deliveryRepository.save(delivery);
        return ResponseEntity.ok(saved);
    }
}
