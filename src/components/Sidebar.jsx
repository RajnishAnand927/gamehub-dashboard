import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import homeIcon from "../assets/icons/home.png";
import newsIcon from "../assets/icons/news.png";
import gamesIcon from "../assets/icons/games.png";
import aboutIcon from "../assets/icons/settings.png";
import menuIcon from "../assets/icons/open.png";
import closeIcon from "../assets/icons/close.png";
import pcIcon from "../assets/icons/pc.png";
import psIcon from "../assets/icons/ps5.png";
import xboxIcon from "../assets/icons/xbox.png";
import nintendoIcon from "../assets/icons/nintendo.png";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${sidebarOpen ? "expanded" : "collapsed"}`}>
      <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <img
          src={sidebarOpen ? closeIcon : menuIcon}
          alt="Toggle Menu"
          className="toggle-icon"
        />
      </button>

      <ul className="menu">
        <li onClick={() => navigate("/")}>
          <img src={homeIcon} alt="Home" className="menu-icon" />
          {sidebarOpen && <span className="menu-text">Home</span>}
        </li>

        <li onClick={() => navigate("/news")}>
          <img src={newsIcon} alt="News" className="menu-icon" />
          {sidebarOpen && <span className="menu-text">News</span>}
        </li>

        <li className="menu-item">
          <div
            onClick={() => setIsGamesOpen(!isGamesOpen)}
            className="menu-link"
          >
            <img src={gamesIcon} alt="Games" className="menu-icon" />
            {sidebarOpen && <span className="menu-text">Games</span>}
          </div>

          {isGamesOpen && (
            <ul className="submenu">
              <li onClick={() => navigate("/games/pc")}>
                <img src={pcIcon} alt="PC" className="submenu-icon" />
                <span>PC</span>
              </li>
              <li onClick={() => navigate("/games/ps5")}>
                <img src={psIcon} alt="PS5" className="submenu-icon" />
                <span>PS5</span>
              </li>
              <li onClick={() => navigate("/games/xbox")}>
                <img src={xboxIcon} alt="Xbox" className="submenu-icon" />
                <span>Xbox</span>
              </li>
              <li onClick={() => navigate("/games/nintendo")}>
                <img src={nintendoIcon} alt="Nintendo" className="submenu-icon" />
                <span>Nintendo</span>
              </li>
            </ul>
          )}
        </li>

        <li onClick={() => navigate("/about")}>
          <img src={aboutIcon} alt="About" className="menu-icon" />
          {sidebarOpen && <span className="menu-text">About</span>}
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
