package com.ecom.productcatalog.product.mapper;

import com.ecom.productcatalog.product.dto.ProductResponse;
import com.ecom.productcatalog.product.model.Product;

public class ProductMapper {

    public static ProductResponse toResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setImageUrl(product.getImageUrl());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setRating(product.getRating());
        response.setDiscount(product.getDiscount());

        if (product.getCategory() != null) {
            response.setCategoryId(product.getCategory().getId());
            response.setCategoryName(product.getCategory().getName());
        }

        return response;
    }
}