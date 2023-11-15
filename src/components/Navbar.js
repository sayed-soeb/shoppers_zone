import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

function Navbar({ onSearch ,carts , logs , empty ,add}) {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [name,setName]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    const users=JSON.parse(localStorage.getItem('user'));
    if(users){
      setName(users.username);
    }
  },[logs]);

  useEffect(()=>{
    setQuantity('');
  },[empty]);

  useEffect(() => {
    const storedQuantity = JSON.parse(localStorage.getItem('cartquantity'));
    if(storedQuantity && storedQuantity > 0){
    
    setQuantity(storedQuantity);
    }
   
  }, [carts, add]);

  useEffect(() => {
    let num =0;
    const items = JSON.parse(localStorage.getItem("products"));
    if (items && items.length > 0) {
      items.forEach((item) => {
        num = num + item.quantity;
      });
    }
    localStorage.setItem('cartquantity', num);
  }, [carts]);

  

  const handleSearch = (query) => {
    onSearch(query);
  };

  const handleCategorySelect = (category) => {
    handleSearch(category);
    setShowCategories(false);
    setShowMenu(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://ecommerce-app-by-rayyan.onrender.com/logout");
      // Store user information in local storage
      localStorage.removeItem("user");
      setName('');
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.log("Login First");
    }
  };

  return (
    <div className="shopping-navbar">
      <div className="title">
        <h3>Shoppers Zone</h3>
      </div>
      <div className="search-items">
        <input
          type="text"
          value={search}
          placeholder="Search Products"
          onChange={(e) => setSearch(e.target.value)}
          className="shopping-input"
        />
        <button onClick={() => handleSearch(search)} className="shopping-button">
          Go
        </button>
      </div>
      <div className="shopping-lists">
        <ul>
          <li>Hello , {name ? <span>{name} !</span> : "Guest !"}</li>
          <Link to="/">
            <li>Home</li>
          </Link>
          <li>
            <div
              className="shopping-category"
              onClick={() => setShowCategories(!showCategories)}
            >
              Categories
              {showCategories && (
                <ul className="shopping-category-dropdown">
                  {["Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"].map(
                    (category) => (
                      <li
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </li>
          {name ? <div>
            <Link to="/logout">
            <li onClick={handleLogout}>Logout</li>
          </Link>
          </div> : <div>
          <Link to="/login">
            <li>Login</li>
          </Link>
            </div>}
          <li className="cart-icon">
            <Link to="/cart">
              <li>
              <FaCartArrowDown size={20} />
              <span>{quantity}</span>
              </li>
            </Link>
          </li>
        </ul>
      </div>
      <div className="shopping-bars" onClick={() => setShowMenu(!showMenu)}>
        <div className="shopping-bar1"></div>
        <div className="shopping-bar2"></div>
        <div className="shopping-bar3"></div>
      </div>
      {showMenu && (
        <div className="shopping-menu">
          <div className="box-menu">
            <div className="buttonss">
              <button onClick={() => setShowMenu(false)}>X</button>
            </div>
            <div className="shopping-menu-list">
              <ul>
                <Link to="/">
                  <li>Home</li>
                </Link>
                <li>
                  <div
                    className="shopping-category"
                    onClick={() => setShowCategories(!showCategories)}
                    style={{color:"black"}}
                  >
                    Categories
                    {showCategories && (
                      <ul className="shopping-category-dropdown">
                        {["Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"].map(
                          (category) => (
                            <li
                              key={category}
                              onClick={() => handleCategorySelect(category)}
                            >
                              {category}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </li>
                <Link to="/login">
                  <li>Login</li>
                </Link>
                <Link to="/Cart">
                  <li>Cart</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
