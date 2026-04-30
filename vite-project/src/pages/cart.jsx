import React from 'react';
import './cart.css';
import { FiPackage, FiTruck, FiAlertTriangle } from 'react-icons/fi';
import WatchImg from '../assets/watch.png';

const Cart = ({ cart, setCart }) => {

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const vat = subtotal * 0.05; // Dummy 5% VAT
  const total = subtotal + vat;

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Your cart total is $ {total.toFixed(2)}</h1>
        <p className="shipping-notice">Free shipping and return</p>
        {cart.length > 0 && <button className="checkout-btn-top">Check out</button>}
      </div>

      <div className="cart-divider"></div>

      <div className="cart-items-container">
        {cart.length === 0 ? (
           <div style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Your cart is empty</div>
        ) : (
          cart.map((p) => (
            <div key={p.id}>
              <div className="cart-item">
                <div className="item-image">
                  <img src={p.thumbnail || p.images?.[0] || WatchImg} alt={p.title} />
                </div>
                
                <div className="item-details">
                  <div className="item-title-section">
                    <h2 className="item-title">{p.title}</h2>
                    
                    <div className="item-options">
                      <select 
                        className="option-select" 
                        value={p.quantity} 
                        onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                      >
                        {/* Generate options up to the stock limit, max 10 for display purposes */}
                        {[...Array(Math.max(1, Math.min(10, p.stock || 10))).keys()].map(n => (
                           <option key={n+1} value={n+1}>{n+1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="item-price-section">
                    <span className="item-price">${(p.price * p.quantity).toFixed(2)}</span>
                    <button className="remove-btn" onClick={() => removeFromCart(p.id)}>Remove</button>
                  </div>

                  <div className="item-info-list">
                    <div className="info-row">
                      <FiPackage className="info-icon" />
                      <span>Order today</span>
                    </div>
                    <div className="info-row">
                      <FiTruck className="info-icon" />
                      <span>Delivery by Dec 23</span>
                    </div>
                    {p.stock < 10 && (
                      <div className="info-row warning">
                        <FiAlertTriangle className="info-icon" />
                        <span>Only {p.stock} Available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="cart-item-divider"></div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <>
          <div className="cart-divider"></div>

          <div className="cart-summary-container">
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="summary-value">$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="summary-value">Free</span>
            </div>
            <div className="summary-row">
              <span>VAT (5%)</span>
              <span className="summary-value">$ {vat.toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-total-row">
              <span className="total-label">Total</span>
              <span className="total-value">$ {total.toFixed(2)}</span>
            </div>
            
            <div className="summary-actions">
              <button className="checkout-btn-bottom">Check out</button>
            </div>
          </div>
        </>
      )}
      
    </div>
  );
};

export default Cart;
