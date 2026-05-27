package com.ecom.productcatalog.order.dto;

import lombok.Data;

@Data
public class OrderResponse {
    private Long id;
    private String address;
    private String paymentMethod;
    private Double totalAmount;
    private String status;
}
