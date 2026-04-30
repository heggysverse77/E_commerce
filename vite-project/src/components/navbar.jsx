import React from 'react';
import './nav.css';
import { useState,useEffect } from 'react';
import { BiCategory } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Navbar = () => {
    
    const [isClicked,setIsClicked] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data)).catch(error => console.log(error));
    }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo"><Link to="/">E-Shop</Link></div>
      </div>

      <div className="navbar-middle">
        <div className="search-bar">
          <svg className="icon search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search products..." />
          <BiCategory className="icon category-icon" size={20} onClick={() => setIsClicked(!isClicked)}></BiCategory>
          
          <div className={`categories-dropdown ${isClicked ? 'active' : ''}`}> 
            <ul>
              {categories.map((category) => (
                <li key={category.slug}><a href="#">{category.name}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <ul className="nav-links" style={{alignItems: 'center'}}>
          <li><a href="/">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link to="/likes" className="like-icon"><IoHeartOutline size={24} style={{display: 'flex'}} /></Link></li>
          <li><Link to="/cart" className="cart-icon"><FaCartShopping size={22} style={{display: 'flex'}} /></Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
