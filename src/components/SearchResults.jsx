import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "./GameCategory.css";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setGames([]);
      setLoading(false);
      return;
    }
    fetch(`/gamesapi/games`)
      .then((res) => res.json())
      .then((data) => {
        const matches = data.filter((g) =>
          String(g.title || "").toLowerCase().includes(query)
        );
        if (matches.length === 1) {
          navigate(`/game/${matches[0].id}`);
          return;
        }
        setGames(matches);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query, navigate]);

  if (!query) return <p className="loading-text">Enter a game name to search.</p>;
  if (loading) return <p className="loading-text">Searching games...</p>;

  return (
    <div className="game-category-page">
      <h1 className="category-title">🔎 Search Results</h1>
      {games.length === 0 ? (
        <p className="loading-text">No matches for "{query}"</p>
      ) : (
        <div className="games-grid">
          {games.slice(0, 40).map((game) => (
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
