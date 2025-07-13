import './App.css';
import CardFlip from './CardFlip.jsx';
import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000'; // or wherever your Flask API runs

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load categories on first render
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then(res => res.json())
      .then(data => setCategories(['All', ...data]))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  //console.log('Categories:', categories);

  // Fetch cards when selectedCategory changes
  useEffect(() => {
    fetch(`${API_BASE}/cards?category=${selectedCategory}&n=10`)
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Error fetching cards:', err));
  }, [selectedCategory]);

  useEffect(() => {
    setCurrentIndex(0); // ← Reset to first card
    fetch(`${API_BASE}/cards?category=${selectedCategory}&n=10`)
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Error fetching cards:', err));
  }, [selectedCategory]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar for categories */}
      <div
        style={{
          width: '22%',
          backgroundColor: '#f2f2f2',
          padding: '20px',
          borderRight: '1px solid #ccc',
        }}
      >
        <h3>Categories</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {categories.map(cat => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px',
                marginBottom: '5px',
                backgroundColor: selectedCategory === cat ? '#ddd' : '#fff',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h1>Flashcards - {selectedCategory}</h1>

        {/* Current index + total */}
        {cards.length > 0 && (
          <p style={{ marginTop: '-10px', color: '#555' }}>
            Card {currentIndex + 1} of {cards.length}
          </p>
        )}

        {cards.length === 0 ? (
          <p>No cards found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , gap: '140px'}}>
            <CardFlip 
                frontContent={cards[currentIndex].Answer}
                backContent={cards[currentIndex].Hint}
              />
            
            {/* Navigation arrows */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button
                onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0}
                style={{ padding: '8px 16px', cursor: 'pointer' }}
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentIndex(prev => Math.min(prev + 1, cards.length - 1))}
                disabled={currentIndex === cards.length - 1}
                style={{ padding: '8px 16px', cursor: 'pointer' }}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;