import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { showToast } = useToast();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    showToast("💳 Simulating secure payment Gateway...", "info");
    
    setTimeout(() => {
      showToast("🚀 Order placed successfully! Thank you for shopping with EcomCatalog.", "success");
      clearCart();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="close-drawer-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer-empty">
            <span className="cart-drawer-empty-icon">🛒</span>
            <p>Your shopping cart is empty.</p>
            <button className="btn-shop-now" onClick={onClose}>
              Shop Our Catalog
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-drawer-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">₹{item.price}</p>
                    <div className="cart-quantity-selector">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="cart-quantity-num">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-drawer-total">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <p className="cart-disclaimer">Taxes and shipping calculated at checkout.</p>
              <div className="cart-actions-row">
                <button className="btn-checkout" onClick={handleCheckout}>
                  Secure Checkout
                </button>
                <button className="btn-clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
