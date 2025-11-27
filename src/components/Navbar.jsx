import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import glogo from "./../assets/glogo.png";
import searchlogo from "./../assets/searchlogo.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  
  const readUserFromStorage = () => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("userEmail");
    if (username && email) return { username, email };
    return null;
  };

  useEffect(() => {
    setUser(readUserFromStorage());

    const onStorage = () => setUser(readUserFromStorage());
    const onAuthChange = () => setUser(readUserFromStorage());

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChange", onAuthChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChange", onAuthChange);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("authChange"));
    setUser(null);
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={glogo} alt="Gamerpedia Logo" className="logo" />
        <h1 className="title">Gamerpedia</h1>
      </div>

      <div className="Searchbar">
        <form onSubmit={(e) => { e.preventDefault(); const q = term.trim(); if (q) navigate(`/search?q=${encodeURIComponent(q)}`); }}>
          <div className="search-container">
            <img src={searchlogo} alt="Search" className="search-logo" />
            <input
              type="text"
              name="search"
              placeholder="What are you looking for..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
        </form>
      </div>

      
      <div className="LogSignBtn">
        {!user ? (
          <>
            <Link to="/login">
              <button name="loginbtn">Login</button>
            </Link>
            <Link to="/signup">
              <button name="SignUpbtn">Sign Up</button>
            </Link>
          </>
        ) : (
          <div className="user-section">
            <span className="username">Hi, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
