import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NewsSection from "./NewsSection";
import ghost from "./../assets/gameicon/ghost.mp4"


function Home() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data.slice(0, 10))) // limit to 10 trending
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 0.5;
    const scrollInterval = setInterval(() => {
      if (!isPaused && scrollContainer) {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;
        if (
          scrollAmount >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        )
          scrollAmount = 0;
      }
    }, 20);
    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const scroll = (direction) => {
    const scrollContainer = scrollRef.current;
    const scrollAmount = 300;
    scrollContainer.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="base">
      <div className="home-container">
        <section className="featured-section">
          <video className="bg-video" autoPlay loop muted playsInline>
            <source src={ghost} type="video/mp4" />
          </video>
          <div className="overlay"></div>
          <h2 className="trending-title">🔥 Trending Games</h2>

          <button className="scroll-btn left" onClick={() => scroll("left")}>
            <FaChevronLeft />
          </button>
          <button className="scroll-btn right" onClick={() => scroll("right")}>
            <FaChevronRight />
          </button>

          <div
            className="card-scroll"
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {games.map((game) => (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="game-card-scrollingcard"
              >
                <img src={game.thumbnail} alt={game.title} />
                <p>{game.title}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="NewsSection">
        <NewsSection />
      </section>
    </div>
  );
}

export default Home;
