import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import {Routes,Route} from "react-router-dom";
import ProductPage from "./pages/product_page";
import Cart from "./pages/cart";
import Likes from "./pages/likes";

export default function App() {
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [products, setProducts] = useState([]);

  const categories = ["laptops","smartphones","mobile-accessories","tablets"];

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const results = await Promise.all(
          categories.map(async (cat) => {
            const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
            const data = await res.json();
            return {cat, products: data.products} 
          })
        );
        setProducts(results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar products={products} />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} likes={likes} setLikes={setLikes} products={products} />} />
        <Route path="/product/:id" element={<ProductPage cart={cart} setCart={setCart} likes={likes} setLikes={setLikes} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/likes" element={<Likes likes={likes} setLikes={setLikes} cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  );
}