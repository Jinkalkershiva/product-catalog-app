import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setFilteredProducts(data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let result = products;

    if (category !== "All") {
      result = result.filter(
        (p) => p.category?.name === category
      );
    }

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [category, search, products]);

  return (
  <div className="container">
    <h1>🛍 Product Catalog</h1>

    <div className="search-filter">
      <SearchBar setSearch={setSearch} />
      <Filter setCategory={setCategory} />
    </div>

    {filteredProducts.length > 0 ? (
      <ProductList products={filteredProducts} />
    ) : (
      <p className="empty">No Products Found</p>
    )}
  </div>
);
}

export default App;