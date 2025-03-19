import React, { useState, useEffect } from 'react';
import './App.css';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#FF8C00', '#8A2BE2'];

function App() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#f4f4f9');
  const [buttonColor, setButtonColor] = useState('#007bff');

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      const data = await response.json();
      const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
      setQuote({ text: randomQuote.quote, author: randomQuote.author });
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBackgroundColor(randomColor);
      setButtonColor(randomColor);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({ text: 'Error loading quote. Please try again.', author: '' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App" style={{ backgroundColor }}>
    <div id="quote-box" className="quote-box">
      <div id="text" className="quote-text">
        {loading ? 'Loading...' : `"${quote.text}"`}
      </div>
      <div id="author" className="quote-author">
        - {quote.author}
      </div>
      <div id="quote-controls" className="quote-controls">
        <button
          id="new-quote"
          onClick={fetchQuote}
          style={{ backgroundColor: buttonColor }}
        >
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: buttonColor }}
        >
          Tweet Quote
        </a>
      </div>
    </div>
    <footer className="footer">
      &copy; {new Date().getFullYear()} - by Regil Batista Todos los derechos reservados
    </footer> 
  </div>
  );
}

export default App;
