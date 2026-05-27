import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Helper to resolve category badge class/color
  const getCategoryClass = (catName) => {
    switch (catName?.toLowerCase()) {
      case "electronics":
        return "badge-electronics";
      case "clothing":
        return "badge-clothing";
      case "home and kitchen":
      case "home & kitchen":
        return "badge-home";
      default:
        return "badge-default";
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-img-wrapper">
        <img
          src={product.imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600"}
          alt={product.name}
          className="product-card-img"
        />
        <div className="product-card-hover-overlay" onClick={() => addToCart(product)}>
          <span>Quick Add 🛒</span>
        </div>
      </div>

      <div className="product-card-body">
        <span className={`category-pill ${getCategoryClass(product.categoryName)}`}>
          {product.categoryName}
        </span>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-price-row">
          <span className="product-card-price">₹{product.price.toFixed(2)}</span>
        </div>
        <button
          className="product-card-add-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
