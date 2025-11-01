import React from "react";

function NewsCard({ title, description, link, image }) {
  return (
    <a href={link} className="news-card" target="_blank" rel="noopener noreferrer">
      {image && <img src={image} alt={title} className="news-image" />}
      <div className="news-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
}

export default NewsCard;