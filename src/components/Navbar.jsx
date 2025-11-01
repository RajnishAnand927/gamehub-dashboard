import React from "react";
import "./Navbar.css";
import glogo from "./../assets/glogo.png";
import searchlogo from "./../assets/searchlogo.png"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={glogo} alt="Gamerpedia Logo" className="logo" />
        <h1 className="title">Gamerpedia</h1>
      </div>

       <div className="Searchbar">
        <form>
          <div className="search-container">
            <img src={searchlogo} alt="Search" className="search-logo" />
            <input
              type="text"
              name="search"
              placeholder="What are you looking for..."
            />
          </div>
        </form>
      </div>
      <div className="LogSignBtn">
      <div><button name="loginbtn">Login</button></div>
      <div><button name="SignUpbtn">SignUp</button></div>
      </div>

    </nav>
  );
}

export default Navbar;
