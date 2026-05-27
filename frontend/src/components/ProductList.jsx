import "./ProductList.css";
import { useCart } from "../context/CartContext";

function ProductList({ products }) {
  const { addToCart } = useCart();

  return (
    <div className="grid animate-fade-in">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <div className="image-wrapper">
            <img src={product.imageUrl} alt={product.name} />
            <div className="overlay" onClick={() => addToCart(product)}>
              <span>🛒 Add to Cart</span>
            </div>
          </div>

          <div className="content">
            <div className="category-row">
              <span className="category-badge">{product.categoryName}</span>
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price-row">
              <div className="price-col">
                <span className="price-label">Price</span>
                <span className="price">₹{product.price}</span>
              </div>
              <button className="btn-add-to-cart" onClick={() => addToCart(product)}>
                + Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;