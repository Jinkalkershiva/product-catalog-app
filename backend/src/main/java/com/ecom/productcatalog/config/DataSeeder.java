package com.ecom.productcatalog.config;

import com.ecom.productcatalog.model.Category;
import com.ecom.productcatalog.model.Product;
import com.ecom.productcatalog.repository.CategoryRepository;
import com.ecom.productcatalog.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataSeeder(CategoryRepository categoryrepository, ProductRepository productRepository) {
        this.categoryRepository = categoryrepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception{
        //first going to start so,we have Clear all existing data
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        //create category
        Category electronics =new Category();
        electronics.setName("Electronics");

        Category clothing =new Category();
        clothing.setName("Clothing");

        Category home =new Category();
        home.setName("Home and Kitchen");
        //save category
        categoryRepository.saveAll(Arrays.asList(electronics, clothing, home));

        //create product
        Product phone=new Product();
        phone.setName("SmartPhone");
        phone.setDescription("Latest Model of SmartPhone are have Amazing features.");
        phone.setImageUrl("https://placehold.co/600x400");
        phone.setPrice(699.99);
        phone.setCategory(electronics);

        Product laptop=new Product();
        laptop.setName("Laptop");
        laptop.setDescription("High-Performance Laptop for working and Gaming.");
        laptop.setImageUrl("https://placehold.co/600x400");
        laptop.setPrice(999.99);
        laptop.setCategory(electronics);

        Product jacket =new Product();
        jacket.setName("Winter Jacket");
        jacket.setDescription("warm and cozy jacket in winter season sutaible wearing.");
        jacket.setImageUrl("https://placehold.co/600x400");
        jacket.setPrice(129.99);
        jacket.setCategory(clothing);

        Product blender =new Product();
        blender.setName("Blender");
        blender.setDescription("High-speed blender for smoothies and more. ");
        blender.setImageUrl("https://placehold.co/600x400");
        blender.setPrice(89.99);
        blender.setCategory(home);

        productRepository.saveAll(Arrays.asList(phone,laptop,jacket,blender));



    }
}
