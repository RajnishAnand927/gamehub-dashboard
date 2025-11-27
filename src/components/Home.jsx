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
  const [recommended, setRecommended] = useState(null);
  
  

  useEffect(() => {
    const pickAndSet = (list) => {
      if (!list || list.length === 0) return;
      const idx = Math.floor(Math.random() * list.length);
      const g = list[idx];
      setRecommended(g);
    };

    fetch("/gamesapi/games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data.slice(0, 10));
        pickAndSet(data);
      })
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

      {recommended && (
        <section className="news-section" style={{ marginTop: "24px" }}>
          <h2 className="section-title">Recommended Play</h2>
          <div className="news-grid">
            <div className="news-card" style={{ gridColumn: "1 / -1", maxWidth: "33%", margin: "0 auto" }}>
              <img src={recommended.thumbnail} alt={recommended.title} className="news-image" />
              <div className="news-content">
                <h3>{recommended.title}</h3>
                <p>{recommended.short_description}</p>
                <p><strong>Genre:</strong> {recommended.genre} &nbsp; <strong>Platform:</strong> {recommended.platform}</p>
                <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                  <Link to={`/game/${recommended.id}`} className="play-btn">View Details</Link>
                  <button
                    className="shuffle-btn"
                    onClick={() => {
                      if (games && games.length > 0) {
                        const idx = Math.floor(Math.random() * games.length);
                        setRecommended(games[idx]);
                      }
                    }}
                  >
                    Shuffle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="NewsSection">
        <NewsSection />
      </section>

     

      
    </div>
  );
}

export default Home;
