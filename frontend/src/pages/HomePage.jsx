import { useState, useEffect } from "react";
import { productAPI } from "../services/api";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";

function HomePage({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const prodData = await productAPI.getProducts();
        const catData = await productAPI.getCategories();
        setProducts(prodData || []);
        setFilteredProducts(prodData || []);
        setCategories(catData || []);
      } catch (err) {
        console.error("Failed to load home data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Filter and sort products when states change
  useEffect(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.categoryName === selectedCategory);
    }

    // 2. Search Filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 3. Price Filter
    result = result.filter((p) => p.price <= priceRange);

    // 4. Sorting logic
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const handleHeroCTA = () => {
    const el = document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="pulse-loader">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <p className="loader-text">Loading catalog items...</p>
      </div>
    );
  }

  return (
    <div className="homepage-content">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-banner-overlay"></div>
        <div className="hero-banner-content container">
          <h1>Discover Premium Products</h1>
          <p>
            Experience a curated selection of world-class goods. Handpicked quality, certified catalog indexes, and high-performance shopping experiences.
          </p>
          <button className="hero-cta-btn" onClick={handleHeroCTA}>
            Explore Products
          </button>
        </div>
      </section>

      {/* Filter and Catalog Section */}
      <section className="catalog-section container animate-fade-in">
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Products Found</h3>
            <p>Try clearing your active filters or adjusting search parameters.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
