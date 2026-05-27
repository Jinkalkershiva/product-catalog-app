package com.ecom.productcatalog.common.seeder;

import com.ecom.productcatalog.category.model.Category;
import com.ecom.productcatalog.category.repository.CategoryRepository;
import com.ecom.productcatalog.product.model.Product;
import com.ecom.productcatalog.product.repository.ProductRepository;
import com.ecom.productcatalog.user.model.User;
import com.ecom.productcatalog.user.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        // Clear existing data (in dependency order)
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        userRepository.deleteAll();

        // ── Users ──────────────────────────────────────────────────────────

        User admin = new User();
        admin.setFullName("System Administrator");
        admin.setUsername("admin");
        admin.setEmail("admin@ecom.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRoles(Set.of("ROLE_ADMIN"));

        User user = new User();
        user.setFullName("Default User");
        user.setUsername("user");
        user.setEmail("user@ecom.com");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setRoles(Set.of("ROLE_USER"));

        User john = new User();
        john.setFullName("John Doe");
        john.setUsername("john_doe");
        john.setEmail("john@ecom.com");
        john.setPassword(passwordEncoder.encode("john123"));
        john.setRoles(Set.of("ROLE_USER"));

        User jane = new User();
        jane.setFullName("Jane Smith");
        jane.setUsername("jane_smith");
        jane.setEmail("jane@ecom.com");
        jane.setPassword(passwordEncoder.encode("jane123"));
        jane.setRoles(Set.of("ROLE_USER"));

        User manager = new User();
        manager.setFullName("Product Manager");
        manager.setUsername("manager");
        manager.setEmail("manager@ecom.com");
        manager.setPassword(passwordEncoder.encode("manager123"));
        manager.setRoles(Set.of("ROLE_ADMIN", "ROLE_USER"));

        userRepository.saveAll(Arrays.asList(admin, user, john, jane, manager));

        // ── Categories ─────────────────────────────────────────────────────

        Category electronics = new Category();
        electronics.setName("Electronics");

        Category clothing = new Category();
        clothing.setName("Clothing");

        Category home = new Category();
        home.setName("Home and Kitchen");

        Category sports = new Category();
        sports.setName("Sports and Outdoors");

        Category books = new Category();
        books.setName("Books and Stationery");

        Category beauty = new Category();
        beauty.setName("Beauty and Personal Care");

        categoryRepository.saveAll(Arrays.asList(electronics, clothing, home, sports, books, beauty));

        // ── Electronics ────────────────────────────────────────────────────

        Product phone = new Product();
        phone.setName("SmartPhone");
        phone.setDescription("Latest model smartphone with amazing features.");
        phone.setImageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60");
        phone.setPrice(699.99);
        phone.setCategory(electronics);

        Product laptop = new Product();
        laptop.setName("Laptop");
        laptop.setDescription("High-performance laptop for work and gaming.");
        laptop.setImageUrl("https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?w=600&auto=format&fit=crop&q=60");
        laptop.setPrice(999.99);
        laptop.setCategory(electronics);

        Product tablet = new Product();
        tablet.setName("Tablet");
        tablet.setDescription("Lightweight tablet perfect for reading, browsing, and streaming.");
        tablet.setImageUrl("https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=60");
        tablet.setPrice(449.99);
        tablet.setCategory(electronics);

        Product headphones = new Product();
        headphones.setName("Wireless Headphones");
        headphones.setDescription("Noise-cancelling over-ear headphones with 30-hour battery life.");
        headphones.setImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60");
        headphones.setPrice(199.99);
        headphones.setCategory(electronics);

        Product smartwatch = new Product();
        smartwatch.setName("Smart Watch");
        smartwatch.setDescription("Feature-rich smartwatch with health tracking and GPS.");
        smartwatch.setImageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60");
        smartwatch.setPrice(299.99);
        smartwatch.setCategory(electronics);

        Product camera = new Product();
        camera.setName("DSLR Camera");
        camera.setDescription("24MP DSLR camera with 18-55mm kit lens, ideal for photography enthusiasts.");
        camera.setImageUrl("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60");
        camera.setPrice(849.99);
        camera.setCategory(electronics);

        Product speaker = new Product();
        speaker.setName("Bluetooth Speaker");
        speaker.setDescription("Portable waterproof speaker with 360-degree sound.");
        speaker.setImageUrl("https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=60");
        speaker.setPrice(79.99);
        speaker.setCategory(electronics);

        // ── Clothing ───────────────────────────────────────────────────────

        Product jacket = new Product();
        jacket.setName("Winter Jacket");
        jacket.setDescription("Warm and cozy jacket for winter season.");
        jacket.setImageUrl("https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=60");
        jacket.setPrice(129.99);
        jacket.setCategory(clothing);

        Product tshirt = new Product();
        tshirt.setName("Classic T-Shirt");
        tshirt.setDescription("100% cotton crew-neck t-shirt available in multiple colors.");
        tshirt.setImageUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60");
        tshirt.setPrice(24.99);
        tshirt.setCategory(clothing);

        Product jeans = new Product();
        jeans.setName("Slim Fit Jeans");
        jeans.setDescription("Comfortable slim-fit denim jeans for everyday wear.");
        jeans.setImageUrl("https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60");
        jeans.setPrice(59.99);
        jeans.setCategory(clothing);

        Product sneakers = new Product();
        sneakers.setName("Running Sneakers");
        sneakers.setDescription("Lightweight and breathable sneakers built for daily runs.");
        sneakers.setImageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60");
        sneakers.setPrice(89.99);
        sneakers.setCategory(clothing);

        Product dress = new Product();
        dress.setName("Summer Dress");
        dress.setDescription("Floral printed midi dress perfect for warm weather outings.");
        dress.setImageUrl("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=60");
        dress.setPrice(49.99);
        dress.setCategory(clothing);

        // ── Home and Kitchen ───────────────────────────────────────────────

        Product blender = new Product();
        blender.setName("Blender");
        blender.setDescription("High-speed blender for smoothies and more.");
        blender.setImageUrl("https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=600&auto=format&fit=crop&q=60");
        blender.setPrice(89.99);
        blender.setCategory(home);

        Product coffeeMaker = new Product();
        coffeeMaker.setName("Coffee Maker");
        coffeeMaker.setDescription("Programmable 12-cup coffee maker with built-in grinder.");
        coffeeMaker.setImageUrl("https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&auto=format&fit=crop&q=60");
        coffeeMaker.setPrice(119.99);
        coffeeMaker.setCategory(home);

        Product airFryer = new Product();
        airFryer.setName("Air Fryer");
        airFryer.setDescription("5.8-quart digital air fryer with 8 preset cooking modes.");
        airFryer.setImageUrl("https://images.unsplash.com/photo-1648179546676-3de6bc4b85d2?w=600&auto=format&fit=crop&q=60");
        airFryer.setPrice(99.99);
        airFryer.setCategory(home);

        Product vacuumCleaner = new Product();
        vacuumCleaner.setName("Robot Vacuum Cleaner");
        vacuumCleaner.setDescription("Smart robot vacuum with auto-scheduling and mapping technology.");
        vacuumCleaner.setImageUrl("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60");
        vacuumCleaner.setPrice(349.99);
        vacuumCleaner.setCategory(home);

        Product bedSheets = new Product();
        bedSheets.setName("Luxury Bed Sheet Set");
        bedSheets.setDescription("1000-thread-count Egyptian cotton bed sheets, king size.");
        bedSheets.setImageUrl("https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=60");
        bedSheets.setPrice(69.99);
        bedSheets.setCategory(home);

        // ── Sports and Outdoors ────────────────────────────────────────────

        Product yogaMat = new Product();
        yogaMat.setName("Yoga Mat");
        yogaMat.setDescription("Non-slip eco-friendly yoga mat with carrying strap.");
        yogaMat.setImageUrl("https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=60");
        yogaMat.setPrice(34.99);
        yogaMat.setCategory(sports);

        Product dumbbells = new Product();
        dumbbells.setName("Adjustable Dumbbells");
        dumbbells.setDescription("Space-saving adjustable dumbbells ranging from 5 to 52.5 lbs.");
        dumbbells.setImageUrl("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60");
        dumbbells.setPrice(299.99);
        dumbbells.setCategory(sports);

        Product bicycle = new Product();
        bicycle.setName("Mountain Bicycle");
        bicycle.setDescription("21-speed mountain bike with front suspension and disc brakes.");
        bicycle.setImageUrl("https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=60");
        bicycle.setPrice(499.99);
        bicycle.setCategory(sports);

        Product tent = new Product();
        tent.setName("Camping Tent");
        tent.setDescription("4-person waterproof camping tent with easy setup design.");
        tent.setImageUrl("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=60");
        tent.setPrice(149.99);
        tent.setCategory(sports);

        // ── Books and Stationery ───────────────────────────────────────────

        Product novel = new Product();
        novel.setName("Bestselling Novel");
        novel.setDescription("Award-winning fiction novel — a gripping tale of mystery and adventure.");
        novel.setImageUrl("https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=60");
        novel.setPrice(14.99);
        novel.setCategory(books);

        Product notebook = new Product();
        notebook.setName("Hardcover Notebook");
        notebook.setDescription("200-page dotted hardcover notebook, ideal for journaling and planning.");
        notebook.setImageUrl("https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=60");
        notebook.setPrice(12.99);
        notebook.setCategory(books);

        Product penSet = new Product();
        penSet.setName("Premium Pen Set");
        penSet.setDescription("Set of 10 smooth-writing gel pens in assorted colors.");
        penSet.setImageUrl("https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=60");
        penSet.setPrice(9.99);
        penSet.setCategory(books);

        // ── Beauty and Personal Care ───────────────────────────────────────

        Product skincare = new Product();
        skincare.setName("Skincare Gift Set");
        skincare.setDescription("Complete skincare routine set including cleanser, toner, serum, and moisturizer.");
        skincare.setImageUrl("https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&auto=format&fit=crop&q=60");
        skincare.setPrice(59.99);
        skincare.setCategory(beauty);

        Product hairDryer = new Product();
        hairDryer.setName("Ionic Hair Dryer");
        hairDryer.setDescription("Professional 1875W ionic hair dryer with diffuser and concentrator attachments.");
        hairDryer.setImageUrl("https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&auto=format&fit=crop&q=60");
        hairDryer.setPrice(49.99);
        hairDryer.setCategory(beauty);

        Product perfume = new Product();
        perfume.setName("Luxury Perfume");
        perfume.setDescription("Elegant long-lasting fragrance with notes of jasmine, sandalwood, and musk.");
        perfume.setImageUrl("https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&auto=format&fit=crop&q=60");
        perfume.setPrice(79.99);
        perfume.setCategory(beauty);

        // ── Save All Products ──────────────────────────────────────────────

        productRepository.saveAll(Arrays.asList(
                // Electronics
                phone, laptop, tablet, headphones, smartwatch, camera, speaker,
                // Clothing
                jacket, tshirt, jeans, sneakers, dress,
                // Home and Kitchen
                blender, coffeeMaker, airFryer, vacuumCleaner, bedSheets,
                // Sports and Outdoors
                yogaMat, dumbbells, bicycle, tent,
                // Books and Stationery
                novel, notebook, penSet,
                // Beauty and Personal Care
                skincare, hairDryer, perfume
        ));
    }
}