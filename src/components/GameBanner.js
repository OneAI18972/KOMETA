import React from 'react';
import './GameBanner.css';

const GameBanner = () => {
  const games = [
    { id: 1, name: 'Cyberpunk 2077', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop' },
    { id: 2, name: 'Fortnite', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=250&fit=crop' },
    { id: 3, name: 'Minecraft', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop' },
    { id: 4, name: 'GTA V', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=250&fit=crop' },
    { id: 5, name: 'Valorant', image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=250&fit=crop' },
    { id: 6, name: 'Apex Legends', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=250&fit=crop' },
    { id: 7, name: 'Call of Duty', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=250&fit=crop' },
    { id: 8, name: 'Overwatch', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop' },
    { id: 9, name: 'League of Legends', image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=250&fit=crop' },
    { id: 10, name: 'Dota 2', image: 'https://images.unsplash.com/photo-1606005432411-78d1dfeb9e95?w=400&h=250&fit=crop' }
  ];

  return (
    <div className="game-banner">
      <div className="game-banner-scroll">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.image} alt={game.name} className="game-image" />
            <div className="game-overlay">
              <span className="game-name">{game.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBanner;