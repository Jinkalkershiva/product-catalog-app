package com.ecom.productcatalog.service;

import com.ecom.productcatalog.model.Product;
import com.ecom.productcatalog.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product>getAllProducts(){
        return productRepository.findAll();
    }

    public List<Product>getProductByCategory(Long categoryId){
        return productRepository.findByCategoryId(categoryId);
    }
}
