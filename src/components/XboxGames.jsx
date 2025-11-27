
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GameCategory.css";

function XboxGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/gamesapi/games?platform=xbox`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching Xbox games:", err));
  }, []);

  if (loading) return <p className="loading-text">Loading Xbox games...</p>;

  return (
    <div className="game-category-page">
      <h1 className="category-title">🎮 Xbox Games</h1>
      <div className="games-grid">
        {games.slice(0, 20).map((game) => (
          <Link key={game.id} to={`/game/${game.id}`} className="game-card">
            <img src={game.thumbnail} alt={game.title} />
            <p>{game.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default XboxGames;
