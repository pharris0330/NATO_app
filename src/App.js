import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(() => {
    // Use the Netlify Functions endpoint for the proxy
    // The path is typically "/.netlify/functions/[function-name]"
    const url = '/.netlify/functions/news-proxy';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
          setError(null);
        } else {
          setError("No articles found.");
        }
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
        setError(error.toString());
      });
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className="App">
      <header className="header">
        <h1>NATO Current Events</h1>
      </header>
      <div className="container">
        {error && <p>Error: {error}</p>}
        {articles.length ? (
          articles.map((article, index) => (
            <div className="article" key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </div>
          ))
        ) : (
          !error && <p>Loading headlines...</p>
        )}
      </div>
    </div>
  );
}

export default App;
