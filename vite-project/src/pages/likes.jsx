import React from 'react';
import './cart.css'; // We can safely reuse the cart styles since the layout is identical
import { FiAlertTriangle } from 'react-icons/fi';
import WatchImg from '../assets/watch.png';
import { FaCartShopping } from "react-icons/fa6";

const Likes = ({ likes = [], setLikes, cart, setCart }) => {

  const removeFromLikes = (id) => {
    setLikes(likes.filter(item => item.id !== id));
  };

  const moveToCart = (product) => {
    // Add to cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    // Remove from likes
    removeFromLikes(product.id);
  };

  

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Your Wishlist</h1>
        <p className="shipping-notice">Items you've liked will be saved here</p>
      </div>

      <div className="cart-divider"></div>

      <div className="cart-items-container">
        {likes.length === 0 ? (
           <div style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Your wishlist is empty</div>
        ) : (
          likes.map((p) => (
            <div key={p.id}>
              <div className="cart-item">
                <div className="item-image">
                  <img src={p.thumbnail || p.images?.[0] || WatchImg} alt={p.title} />
                </div>
                
                <div className="item-details" style={{ gridTemplateColumns: '1fr auto', alignContent: 'center' }}>
                  <div className="item-title-section" style={{ justifyContent: 'center' }}>
                    <h2 className="item-title">{p.title}</h2>
                  </div>

                  <div className="item-price-section">
                    <span className="item-price">${p.price}</span>
                    <button className="remove-btn" onClick={() => removeFromLikes(p.id)}>Remove</button>
                  </div>

                  <div className="item-info-list" style={{ marginTop: '15px' }}>
                    <button 
                        className="checkout-btn-top" 
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', width: 'fit-content' }}
                        onClick={() => moveToCart(p)}
                    >
                        <FaCartShopping /> Move to Cart
                    </button>
                    {p.stock < 10 && p.stock > 0 && (
                      <div className="info-row warning" style={{ marginTop: '10px' }}>
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
    </div>
  );
};

export default Likes;
