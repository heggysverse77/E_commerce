import React from 'react';
import { IoStarSharp, IoHeartOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import './product_page.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = ({ cart, setCart, likes, setLikes }) => {
  const { id } = useParams();

  // 1. Data state
  const [isloading,setisloading] = useState(true)
  const [product, setProduct] = useState(null);
  const [quantity,setQuantity] = useState(1)

  


  const addtocart = () => {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increase quantity of existing item
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      // Add new item with selected quantity
      setCart([...cart, { ...product, quantity }]);
    }
    alert("Added to Cart!");
  } 

  const handleLike = () => {
    if (!likes || !setLikes) return;
    const existingItem = likes.find(item => item.id === product.id);
    if (!existingItem) {
      setLikes([...likes, product]);
      alert("Added to Wishlist!");
    } else {
      alert("Already in Wishlist!");
    }
  };
  
  // 2. Main image state (for the gallery)
  const [mainImage, setMainImage] = useState('');


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setisloading(false);
        setProduct(data);
        
        // When data is loaded, set the first image as the main image
        if (data && data.images) {
          setMainImage(data.images[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  // 3. Loading condition (VERY IMPORTANT so the app doesn't crash reading null properties)
  if (isloading) {
    return <div className="loading-state" style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;
  }
  if (!product) {
    return <div className="error-state" style={{padding: '100px', textAlign: 'center'}}>Product not found</div>;
  }

  // 4. Render using dynamic data
  return (
    <div className="product-page-container">
      <div className="product-layout">
        
        {/* Left Side: Images */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={mainImage} alt={product.title} className="main-image" />
          </div>
          <div className="thumbnail-list">
            {/* Map over the product images instead of hardcoding */}
            {product.images?.slice(0, 3).map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Information */}
        <div className="product-details">
          <div className="breadcrumbs">
            <span>Home</span> &gt; <span>{product.category}</span> &gt; <span>{product.title}</span>
          </div>
          
          <span className="product-category-label">{product.category}</span>
          <h1 className="product-title">{product.title}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (  
                <IoStarSharp 
                  key={star} 
                  className={star <= Math.round(product.rating) ? "star active" : "star"} 
                />
              ))}
            </div>
            <span className="rating-value">{product.rating}</span>
            <span className="reviews-count">({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="product-price-section">
            <span className="current-price">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="discount-badge">-{product.discountPercentage}% OFF</span>
            )}
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <div className="stock-info">
            <span className={`status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="stock-count">({product.stock} available)</span>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={()=>setQuantity(quantity>1 ? quantity-1 : 1)}>-</button>
              <span>{quantity}</span>
              <button onClick={()=>setQuantity(quantity<product.stock ? quantity+1 : product.stock)}>+</button>
            </div>
            
            <button className="add-to-cart-btn large" onClick={addtocart}> 
              <FaCartShopping />
              <span>Add to Cart</span>
            </button>
            
            <button className="like-btn large" title="Add to Wishlist" onClick={handleLike}>
              <IoHeartOutline />
            </button>
          </div>

          <div className="additional-info">
            <div className="info-item">
              <span className="info-label">Brand:</span>
              <span className="info-value">{product.brand || 'Generic'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">SKU:</span>
              <span className="info-value">{product.sku}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Shipping:</span>
              <span className="info-value">{product.shippingInformation}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Warranty:</span>
              <span className="info-value">{product.warrantyInformation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage
