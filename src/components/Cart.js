import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./Cart.css";

const Cart = ({logsss}) => {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products")) || [];
    setData(items);
  }, []);

  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;

    if (data.length > 0) {
      data.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.quantity * item.price;
      });
    }

    setQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  }, [data]);

  function removeItem(item) {
    const updatedProducts = data.filter((ele) => ele !== item);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setData(updatedProducts);
  }

  const increaseQuantity = (item) => {
    const updatedData = data.map((el) => {
      if (el.id === item.id) {
        el.quantity += 1;
      }
      return el;
    });
    localStorage.setItem("products", JSON.stringify(updatedData));
    setData(updatedData);
    logsss(updatedData);
  };

  const decreaseQuantity = (item) => {
    const updatedData = data.map((el) => {
      if (el.id === item.id && el.quantity > 1) {
        el.quantity -= 1;
      }
      return el;
    });
    localStorage.setItem("products", JSON.stringify(updatedData));
    setData(updatedData);
    logsss(updatedData);
  };

  return (
    <div>
      <h1>My Cart</h1>
      <div className="container">
        {data.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-details">
              <div className="img-name">
                <div className="imgs-div">
                  <img src={item.image} alt="item" />
                </div>
                <p className="name">{item.title}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item)}>+</button>
              </div>
            </div>
            <div className="price-remove">
              <p className="price">Price: {item.price * item.quantity} $</p>
              <button className="remove" onClick={() => removeItem(item)}>
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
        <div className="totals">
          <p>Total Quantity: {quantity}</p>
          <p>Total Price: {totalPrice} $</p>
        </div>
        <Link to="/checkout">
          <button className="checkout-button">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;