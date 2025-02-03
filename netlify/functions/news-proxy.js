// netlify/functions/news-proxy.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiKey = process.env.NEWS_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing NEWS_API_KEY environment variable" }),
    };
  }

  const url = `https://newsapi.org/v2/everything?q=NATO&sortBy=publishedAt&language=en&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    // Check for non-200 responses
    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `News API error: ${errorText}` }),
      };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
