
import React, { useEffect, useState } from "react";
import "./NewsSection.css"
import NewsCard from "./NewsCard";

function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=05432db9e34947609ed33cede940f845";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // change no of articles that are shown
        setNews(data.articles.slice(0, 8));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading news...</p>;

  return (
    <section className="news-section">
      <h2 className="section-title">Latest Tech News</h2>
      <div className="news-grid">
        {news.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            description={item.description || "No description available."}
            link={item.url}
            image={item.urlToImage}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
