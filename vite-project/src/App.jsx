import React, { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import {Routes,Route} from "react-router-dom";
import ProductPage from "./pages/product_page";
import Cart from "./pages/cart";
import Likes from "./pages/likes";

export default function App() {
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} likes={likes} setLikes={setLikes} />} />
        <Route path="/product/:id" element={<ProductPage cart={cart} setCart={setCart} likes={likes} setLikes={setLikes} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/likes" element={<Likes likes={likes} setLikes={setLikes} cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  );
}