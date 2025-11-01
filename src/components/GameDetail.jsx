import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./GameDetail.css";

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/game?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching game:", err));
  }, [id]);

  if (loading) return <p style={{ padding: "20px" }}>Loading game info...</p>;
  if (!game) return <p style={{ padding: "20px" }}>Game not found.</p>;

  return (
    <div className="game-detail">
      <Link to="/" className="back-btn">⬅ Back</Link>

      <div className="game-header">
        <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
        <div className="game-info">
          <h1>{game.title}</h1>
          <p>{game.short_description}</p>
          <p><strong>Genre:</strong> {game.genre}</p>
          <p><strong>Platform:</strong> {game.platform}</p>
          <p><strong>Publisher:</strong> {game.publisher}</p>
          <p><strong>Release Date:</strong> {game.release_date}</p>
          <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="play-btn">
            Play Now
          </a>
        </div>
      </div>

      {game.screenshots && game.screenshots.length > 0 && (
        <div className="screenshots">
          <h2>Screenshots</h2>
          <div className="screenshot-grid">
            {game.screenshots.map((shot) => (
              <img key={shot.id} src={shot.image} alt="screenshot" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GameDetail;
