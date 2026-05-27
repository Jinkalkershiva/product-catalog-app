package com.ecom.productcatalog.order.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String address;
    private String paymentMethod;
    private List<OrderItemRequest> items;
}
