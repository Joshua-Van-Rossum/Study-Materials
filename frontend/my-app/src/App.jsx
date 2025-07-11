import './App.css'
import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000'; // or wherever your Flask API runs

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cards, setCards] = useState([]);

  // Load categories on first render
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then(res => res.json())
      .then(data => setCategories(['All', ...data]))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Fetch cards based on selected category
  useEffect(() => {
    fetch(`${API_BASE}/cards?category=${selectedCategory}&n=10`)
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Error fetching cards:', err));
  }, [selectedCategory]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Flashcards</h1>

      <label>
        Category:{' '}
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: '20px' }}>
        {cards.map((card, index) => (
          <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc' }}>
            <strong>Q:</strong> {card.Question} <br />
            <strong>A:</strong> {card.Answer}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;