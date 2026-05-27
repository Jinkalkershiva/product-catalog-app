import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    total,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("💳 Simulation Mode: Order placed successfully! Thank you for purchasing.");
    clearCart();
    navigate("/home");
  };

  return (
    <div className="cart-page container animate-fade-in">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>Review your selected catalogue items before checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state cart-empty-state">
          <span className="empty-cart-icon">🛒</span>
          <h3>Your cart is empty</h3>
          <p>You haven't added any products to your shopping cart yet.</p>
          <button className="btn-shop-now" onClick={() => navigate("/home")}>
            Browse Catalog
          </button>
        </div>
      ) : (
        <div className="cart-content-layout">
          {/* Left Side: Items List */}
          <div className="cart-items-list-wrapper">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600"}
                  alt={item.name}
                  className="cart-item-thumbnail"
                />
                
                <div className="cart-item-details-block">
                  <span className="cart-item-category">{item.categoryName}</span>
                  <h3>{item.name}</h3>
                  <p className="cart-item-price-unit">₹{item.price.toFixed(2)} each</p>
                </div>

                <div className="cart-item-qty-block">
                  <div className="cart-item-stepper">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="stepper-btn"
                    >
                      −
                    </button>
                    <span className="stepper-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="stepper-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-total-price-block">
                  <span className="cart-item-subtotal-val">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  className="cart-item-remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  &times;
                </button>
              </div>
            ))}

            <div className="cart-list-actions">
              <button className="btn-continue-shopping" onClick={() => navigate("/home")}>
                ← Continue Shopping
              </button>
              <button className="btn-clear-cart-red" onClick={clearCart}>
                Clear All Items
              </button>
            </div>
          </div>

          {/* Right Side: Order Summary Sidebar */}
          <div className="cart-summary-sidebar">
            <div className="summary-card glass">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Estimated GST (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-row shipping-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              
              <hr className="summary-divider" />
              
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <p className="summary-disclaimer">
                Secure checkout encrypted with dynamic TLS filters.
              </p>

              <button className="btn-checkout-summary-cta" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
