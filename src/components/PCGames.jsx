// components/PCGames.jsx
import React, { useEffect, useState } from "react";
import "./GameCategory.css";

function PCGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/games?platform=pc`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching PC games:", err));
  }, []);

  if (loading) return <p className="loading-text">Loading PC games...</p>;

  return (
    <div className="game-category-page">
      <h1 className="category-title">🎮 PC Games</h1>
      <div className="games-grid">
        {games.slice(0, 20).map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.thumbnail} alt={game.title} />
            <p>{game.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PCGames;
