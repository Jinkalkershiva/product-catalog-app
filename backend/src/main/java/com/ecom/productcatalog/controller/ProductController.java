package com.ecom.productcatalog.controller;

import com.ecom.productcatalog.model.Product;
import com.ecom.productcatalog.service.ProductService;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService ;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping
    public List<Product> getAllProduct(){
        return productService.getAllProducts();
    }
    @GetMapping("/category/{categoryId}")
    public List<Product>getAllProductByCategoryId(@PathVariable Long categoryId){
        return productService.getProductByCategory(categoryId);
    }
}
