import React from "react";
import "./cards.css";
import { IoStarSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";

import WatchImg from '../assets/watch.png';
import HeadsetImg from '../assets/headset.png';
import iPhoneImg from '../assets/iphone.png';

const Cards = ({ name, category, price, img ,id }) => {
  
 

    return (
        <>
        <section className="product-section">
            <div className="container">
           
               <div className="cards-container">
                     <a href={`https://dummyjson.com/products/${id}`}>
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
                                        <button className="add-to-cart-btn" title="Add to Cart">
                                            <FaCartShopping />
                                            <span>Add</span>
                                        </button>
                                        <button className="like-btn" title="Like">
                                            <IoHeartOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </a>
                            
                        </div>
                  
                </div>
            
        </section>
     </>
     );
};

export default Cards;