package com.ecom.productcatalog.delivery.model;

import com.ecom.productcatalog.order.model.Order;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Data
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    private String driverName = "Vikram Singh";

    private String driverPhone = "+91 98765 43210";

    private String status = "PENDING"; // PENDING, PICKED_UP, ON_THE_WAY, REACHED, DELIVERED

    private LocalDateTime updatedAt = LocalDateTime.now();
}
