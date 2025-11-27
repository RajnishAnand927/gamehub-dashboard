
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./GameCategory.css";

function PCGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    fetch(`/gamesapi/games?platform=pc`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching PC games:", err));
  }, []);

  const genres = useMemo(() => {
    const list = Array.from(
      new Set(
        (games || [])
          .map((g) => g.genre)
          .filter((g) => typeof g === "string" && g.trim().length > 0)
      )
    ).sort();
    return ["All", ...list];
  }, [games]);

  const filteredGames = useMemo(() => {
    if (selectedGenre === "All") return games;
    return games.filter((g) => g.genre === selectedGenre);
  }, [games, selectedGenre]);

  return (
    <div className="game-category-page">
      <h1 className="category-title">🎮 PC Games</h1>

      <div className="genre-tabs">
        {genres.map((g) => (
          <button
            key={g}
            className={`genre-tab ${selectedGenre === g ? "active" : ""}`}
            onClick={() => setSelectedGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading-text">Loading PC games...</p>
      ) : (
        <div className="games-grid">
          {filteredGames.slice(0, 20).map((game) => (
            <Link key={game.id} to={`/game/${game.id}`} className="game-card">
              <img src={game.thumbnail} alt={game.title} />
              <p>{game.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PCGames;
