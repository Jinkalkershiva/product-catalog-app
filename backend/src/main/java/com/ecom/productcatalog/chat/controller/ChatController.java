package com.ecom.productcatalog.chat.controller;

import com.ecom.productcatalog.category.model.Category;
import com.ecom.productcatalog.category.repository.CategoryRepository;
import com.ecom.productcatalog.product.dto.ProductResponse;
import com.ecom.productcatalog.product.mapper.ProductMapper;
import com.ecom.productcatalog.product.model.Product;
import com.ecom.productcatalog.product.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ChatController(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        String botResponse = getConversationalAiResponse(userMessage);

        Map<String, String> response = new HashMap<>();
        response.put("reply", botResponse);
        return ResponseEntity.ok(response);
    }

    // NLP-based Smart Product Search
    @PostMapping("/search")
    public ResponseEntity<List<ProductResponse>> nlpSearch(@RequestBody Map<String, String> request) {
        String query = request.get("query");
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.ok(productRepository.findAll().stream().map(ProductMapper::toResponse).toList());
        }

        String lowerQuery = query.toLowerCase();
        List<Product> allProducts = productRepository.findAll();
        List<Product> matches = new ArrayList<>();

        // Intent detection
        Double maxPriceLimit = null;
        if (lowerQuery.contains("under")) {
            String[] tokens = lowerQuery.split(" ");
            for (int i = 0; i < tokens.length; i++) {
                if (tokens[i].equals("under") && i + 1 < tokens.length) {
                    try {
                        maxPriceLimit = Double.parseDouble(tokens[i + 1].replaceAll("[^\\d.]", ""));
                    } catch (NumberFormatException e) {
                        // ignore
                    }
                }
            }
        }

        boolean sortByPriceAsc = lowerQuery.contains("cheap") || lowerQuery.contains("lowest") || lowerQuery.contains("low price");
        boolean sortByPriceDesc = lowerQuery.contains("expensive") || lowerQuery.contains("highest") || lowerQuery.contains("premium");

        for (Product product : allProducts) {
            boolean matchesKeyword = false;
            
            // Match category name
            if (product.getCategory() != null && lowerQuery.contains(product.getCategory().getName().toLowerCase())) {
                matchesKeyword = true;
            }
            
            // Match product name or descriptions
            if (lowerQuery.contains(product.getName().toLowerCase()) || 
                product.getDescription().toLowerCase().contains(lowerQuery) ||
                lowerQuery.contains("all") || lowerQuery.contains("show me") || lowerQuery.contains("products")) {
                matchesKeyword = true;
            }

            // Keyword fuzzy match splits
            String[] keywords = lowerQuery.split(" ");
            for (String kw : keywords) {
                if (kw.length() > 3 && (product.getName().toLowerCase().contains(kw) || 
                                        product.getDescription().toLowerCase().contains(kw))) {
                    matchesKeyword = true;
                }
            }

            if (matchesKeyword) {
                if (maxPriceLimit == null || product.getPrice() <= maxPriceLimit) {
                    matches.add(product);
                }
            }
        }

        // Apply sorting intents
        if (sortByPriceAsc) {
            matches.sort(Comparator.comparingDouble(Product::getPrice));
        } else if (sortByPriceDesc) {
            matches.sort((a, b) -> Double.compare(b.getPrice(), a.getPrice()));
        }

        List<ProductResponse> responses = matches.stream()
                .map(ProductMapper::toResponse)
                .toList();

        return ResponseEntity.ok(responses);
    }

    // AI-based Product Recommendations
    @GetMapping("/recommendations/{productId}")
    public ResponseEntity<List<ProductResponse>> getAiRecommendations(@PathVariable Long productId) {
        Product targetProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found ID: " + productId));

        // Find products in the same category or with price similarity
        List<ProductResponse> recommendations = productRepository.findByCategoryId(targetProduct.getCategory().getId()).stream()
                .filter(p -> !p.getId().equals(productId)) // exclude the current product
                .map(ProductMapper::toResponse)
                .toList();

        return ResponseEntity.ok(recommendations);
    }

    private String getConversationalAiResponse(String message) {
        if (message == null || message.trim().isEmpty()) {
            return "Hello! I am your EcomCatalog AI Assistant. How can I help you discover products today?";
        }

        String msg = message.toLowerCase();

        // Catalog Query: Electronics
        if (msg.contains("electronic") || msg.contains("phone") || msg.contains("laptop") || msg.contains("computer")) {
            return "💻 In **Electronics**, we have the following premium items:\n" +
                    "1. **SmartPhone** — Latest model smartphone with amazing features (₹699.99)\n" +
                    "2. **Laptop** — High-performance laptop for work and gaming (₹999.99)\n\n" +
                    "Would you like me to help you add any of these to your shopping cart?";
        }

        // Catalog Query: Clothing
        if (msg.contains("cloth") || msg.contains("wear") || msg.contains("jacket") || msg.contains("coat") || msg.contains("winter")) {
            return "🧥 In **Clothing**, we offer:\n" +
                    "1. **Winter Jacket** — Warm and cozy jacket for winter season (₹129.99)\n\n" +
                    "It's highly rated and comes in multiple sizes. Would you like me to explain more?";
        }

        // Catalog Query: Home & Kitchen
        if (msg.contains("home") || msg.contains("kitchen") || msg.contains("blend") || msg.contains("smoothie")) {
            return "🍳 In **Home & Kitchen**, we feature:\n" +
                    "1. **Blender** — High-speed blender for smoothies and more (₹89.99)\n\n" +
                    "Perfect for breakfast preps. Shall I guide you to add it?";
        }

        // Price queries
        if (msg.contains("price") || msg.contains("how much") || msg.contains("cost")) {
            return "💰 Our current catalog rates are:\n" +
                    "• **SmartPhone**: ₹699.99\n" +
                    "• **Laptop**: ₹999.99\n" +
                    "• **Winter Jacket**: ₹129.99\n" +
                    "• **Blender**: ₹89.99\n\n" +
                    "All orders qualify for **FREE Shipping**! Plus, estimated GST tax (18%) is computed dynamically at checkout.";
        }

        // Checkout / Cart queries
        if (msg.contains("checkout") || msg.contains("buy") || msg.contains("order") || msg.contains("pay")) {
            return "💳 To complete your order, click on the **🛒 Cart** icon in the navbar, adjust your quantities in the listing, and select **Proceed to Checkout** in the order summary sidebar. Our simulation gateway will secure your payment instantly!";
        }

        // Greeting
        if (msg.contains("hi") || msg.contains("hello") || msg.contains("hey") || msg.contains("greetings")) {
            return "👋 Hello! I am your AI Catalog Assistant, powered by Spring AI. You can ask me about product recommendations, prices, category filters, or checkout assistance!";
        }

        // Generic help
        return "🤖 EcomCatalog AI Assistant:\n" +
                "I can assist you with:\n" +
                "• Category lookups (e.g. \"show electronics\")\n" +
                "• Pricing indices (e.g. \"how much is the laptop?\")\n" +
                "• Checkout guidance (e.g. \"how to buy?\")\n\n" +
                "What catalog item are you looking for today?";
    }
}
