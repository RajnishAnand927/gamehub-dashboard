import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import glogo from "./../assets/glogo.png";
import searchlogo from "./../assets/searchlogo.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Read user from localStorage (fast UI)
  const readUserFromStorage = () => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("userEmail");
    if (username && email) return { username, email };
    return null;
  };

  useEffect(() => {
    // initialize from localStorage
    setUser(readUserFromStorage());

    // handle cross-tab logout/login (storage event)
    const onStorage = () => setUser(readUserFromStorage());

    // handle in-tab custom event (we will dispatch this after login/signup)
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
    // notify other listeners
    window.dispatchEvent(new Event("authChange"));
    setUser(null);
    navigate("/"); // Redirect to home
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
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

      {/* Right-side buttons */}
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
