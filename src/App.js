import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddressForm from "./components/AddressForm";
import { Routes, Route } from "react-router-dom";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [add,setAdd]=useState("");
  const [cartAdd,setCartAdd]=useState([]);
  const [loggedIn,setLoggedIn]=useState(false);
  const [cartEmpty,setCart]=useState(false);

  const handleCartEmpty=(ele)=>{
    setCart(ele);
  }

  const handleLogin =()=>{
    setLoggedIn(!loggedIn);
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePlus = (e) => {
    setAdd(e);
  }

  const handleCartAdd =(e) => {
    setCartAdd(e);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} carts={cartAdd} logs={loggedIn} empty={cartEmpty} adds={add}/>
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} onCart={handleCartAdd}/>} />
        <Route path="/cart" element={<Cart logsss={handlePlus} />} />
        <Route path="/login" element={<Login logs={handleLogin}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<AddressForm logsss={handleCartEmpty}/>} />
      </Routes>
    </div>
  );
}

export default App;
