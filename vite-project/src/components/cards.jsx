import React from "react";
import "./cards.css";
import { IoStarSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";

import WatchImg from '../assets/watch.png';
import HeadsetImg from '../assets/headset.png';
import iPhoneImg from '../assets/iphone.png';
import { Link } from "react-router-dom";

const Cards = ({ name, category, price, img, id, product, cart, setCart, likes, setLikes }) => {
  
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if(!cart || !setCart) return;

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            const newProduct = product || { id, title: name, price, thumbnail: img, stock: 10 };
            setCart([...cart, { ...newProduct, quantity: 1 }]);
        }
        alert("Added to Cart!");
    };

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if(!likes || !setLikes) return;

        const existingItem = likes.find(item => item.id === id);
        if (!existingItem) {
            const newProduct = product || { id, title: name, price, thumbnail: img, stock: 10 };
            setLikes([...likes, newProduct]);
            alert("Added to Likes!");
        } else {
            alert("Already in Likes!");
        }
    };

    return (
        <>
        <section className="product-section">
             <Link to={`/product/${id}`}>
            <div className="container">
          
               <div className="cards-container">
                    
                            <div className="card-image">
                                <img src={img} alt={name}/>
                            </div>
                            <div className="card-info">
                                <div className="card-header">
                                    <span className="category">{category}</span>
                                    <h2 className="product-name">{name}</h2>
                                    <div className="rating">
                                        <IoStarSharp className="star active" />
                                        <IoStarSharp className="star active" />
                                        <IoStarSharp className="star active" />
                                        <IoStarSharp className="star active" />
                                        <IoStarSharp className="star" />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <span className="price">${price}</span>
                                    <div className="actions">
                                        <button className="add-to-cart-btn" title="Add to Cart" onClick={handleAddToCart}>
                                            <FaCartShopping />
                                            <span>Add</span>
                                        </button>
                                        <button className="like-btn" title="Like" onClick={handleLike}>
                                            <IoHeartOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                  
                </div>
            </Link>
        </section>
     </>
     );
};

export default Cards;