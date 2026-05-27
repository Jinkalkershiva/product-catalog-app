package com.ecom.productcatalog.product.dto;

import lombok.Data;

@Data
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    private Double price;

    private Integer stock;

    private Double rating;

    private Double discount;

    private Long categoryId;

    private String categoryName;
}