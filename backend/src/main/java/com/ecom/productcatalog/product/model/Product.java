package com.ecom.productcatalog.product.model;

import com.ecom.productcatalog.category.model.Category;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    private Double price;

    private Integer stock = 50;

    private Double rating = 4.5;

    private Double discount = 0.0; // discount percentage e.g. 15.0 for 15% off

    @ManyToOne
    @JoinColumn(
            name = "category_id",
            nullable = false
    )
    private Category category;
}