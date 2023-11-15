import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css";

const Home = ({ searchTerm, onCart }) => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setSearchProduct(data));
    const filteredProducts = searchProduct.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  }, [searchTerm]);

  function addToCart(items) {
    const availableIndex = cartProducts.findIndex(item => item.id === items.id);
  
    if (availableIndex > -1) {
      const updatedCart = cartProducts.map((item, index) =>
        index === availableIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartProducts(updatedCart);
      onCart(updatedCart);
      toast.success('Item added to the cart!');
    } else {
      setCartProducts([...cartProducts, { ...items, quantity: 1 }]);
      onCart([availableIndex]);
      toast.success('Item added to the cart!');
    }
  }
  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    if (data.length > 0) {
      setCartProducts(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <div className="product-container">
      {products.map((item) => (
        <div key={item.id} className="product">
          <div className="product-image">
            <img src={item.image} alt="item" />
          </div>
          <div className="product-details">
            <div>
            <p className="product-name">{item.title}</p>
            </div>
            <div className="price-container">
              <span className="product-price">Price: ${item.price}</span>
              <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Home;
