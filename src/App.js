// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// If you store the image in src, you can import it:
// import natoLogo from './nato_insignia.png'; // Ensure the file exists here

function App() {
  const [articles, setArticles] = useState([]);

  // Create a function to fetch articles
  const fetchArticles = useCallback(() => {
    // Replace 'YOUR_API_KEY' with your actual News API key.
    const url = `https://newsapi.org/v2/everything?q=NATO&sortBy=publishedAt&language=en&apiKey=eb413fb215f84352a88cd4b3687a4f44`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
        }
      })
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  useEffect(() => {
    // Fetch immediately when the component mounts
    fetchArticles();

    // Set up an interval to update every week (604,800,000 milliseconds)
    const intervalId = setInterval(() => {
      fetchArticles();
    }, 604800000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchArticles]);

  return (
    <div className="App">
      <header className="header">
        {/* NATO Insignia centered above the title */}
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/nato_insignia.png`} alt="NATO Insignia" className="nato-logo" />
        </div>
        <h1>NATO Current Events</h1>
      </header>
      <div className="container">
        {articles.length ? (
          articles.map((article, index) => (
            <div className="article" key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </div>
          ))
        ) : (
          <p>Loading headlines...</p>
        )}
      </div>
    </div>
  );
}

export default App;

