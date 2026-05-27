import "./FilterBar.css";

function FilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="filter-bar" id="categories">
      <div className="filter-group">
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group price-slider-group">
        <div className="slider-label-row">
          <label htmlFor="price-slider">Max Price</label>
          <span className="price-value">₹{priceRange}</span>
        </div>
        <input
          id="price-slider"
          type="range"
          min="0"
          max="2000"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
          className="slider-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Sort By</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
