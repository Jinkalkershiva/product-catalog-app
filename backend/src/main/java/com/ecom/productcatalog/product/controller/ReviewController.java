package com.ecom.productcatalog.product.controller;

import com.ecom.productcatalog.product.model.Product;
import com.ecom.productcatalog.product.model.Review;
import com.ecom.productcatalog.product.repository.ProductRepository;
import com.ecom.productcatalog.product.repository.ReviewRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products/{productId}/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewController(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewRepository.findByProductId(productId));
    }

    @PostMapping
    public ResponseEntity<Review> addReview(@PathVariable Long productId, @RequestBody Review review) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        review.setProduct(product);
        Review savedReview = reviewRepository.save(review);

        // Recalculate average rating of the product
        List<Review> reviews = reviewRepository.findByProductId(productId);
        double averageRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(4.5);

        // Round to 1 decimal place
        averageRating = Math.round(averageRating * 10.0) / 10.0;
        product.setRating(averageRating);
        productRepository.save(product);

        return ResponseEntity.ok(savedReview);
    }
}
