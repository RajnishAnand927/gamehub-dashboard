import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewsSection from "./components/NewsSection";
import GameDetail from "./components/GameDetail";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PCGames from "./components/PCGames";
import PS5Games from "./components/PS5Games";
import XboxGames from "./components/XboxGames";
import NintendoGames from "./components/NintendoGames";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import SearchResults from "./components/SearchResults";

import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        
        <Navbar />

        <div
          className={`layout ${
            sidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/:id" element={<GameDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/news" element={<NewsSection />} />
              <Route path="/games/pc" element={<PCGames />} />
              <Route path="/games/ps5" element={<PS5Games />} />
              <Route path="/games/xbox" element={<XboxGames />} />
              <Route path="/games/nintendo" element={<NintendoGames />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
