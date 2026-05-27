package com.ecom.productcatalog.category.mapper;

import com.ecom.productcatalog.category.dto.CategoryResponse;
import com.ecom.productcatalog.category.model.Category;

public class CategoryMapper {

    public static CategoryResponse toResponse(Category category) {

        CategoryResponse response =
                new CategoryResponse();

        response.setId(category.getId());
        response.setName(category.getName());

        return response;
    }
}