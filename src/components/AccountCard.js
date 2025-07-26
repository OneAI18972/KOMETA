import React from 'react';
import { Star, MapPin, MessageCircle, Shield } from 'lucide-react';
import './AccountCard.css';

const AccountCard = ({ account }) => {
  const {
    title,
    price,
    currency,
    game,
    image,
    seller,
    region,
    rating,
    features
  } = account;

  // Generate a placeholder image with game-specific colors
  const getPlaceholderImage = (gameTitle) => {
    const colors = {
      'Dead Rails': '#4a90e2',
      'Blox Fruits': '#7b68ee',
      'Blue Lock Rivals': '#00bcd4',
      'Various Games': '#ff6b35'
    };
    const color = colors[game] || '#6c757d';
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="${color}"/>
        <text x="150" y="100" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy="0.3em">${gameTitle}</text>
      </svg>
    `)}`;
  };

  return (
    <div className="account-card">
      <div className="account-image-container">
        <img 
          src={getPlaceholderImage(game)} 
          alt={title} 
          className="account-image"
        />
        <div className="account-badge">
          {features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
      </div>
      
      <div className="account-content">
        <div className="account-header">
          <h3 className="account-title">{title}</h3>
          <div className="account-game">
            <span>Игра:</span>
            <span className="game-name">{game}</span>
          </div>
        </div>
        
        <div className="account-info">
          <div className="seller-info">
            <div className="seller-details">
              <span className="seller-name">{seller}</span>
              <div className="seller-meta">
                <MapPin size={12} className="icon" />
                <span className="region">{region}</span>
                <Star size={12} className="icon star" />
                <span className="rating">{rating}</span>
              </div>
            </div>
          </div>
          
          <div className="account-footer">
            <div className="price-section">
              {price ? (
                <div className="price">
                  <span className="price-amount">{currency}{price}</span>
                </div>
              ) : (
                <div className="price-contact">
                  <MessageCircle size={16} />
                  <span>Связаться</span>
                </div>
              )}
            </div>
            
            <div className="account-actions">
              <button className="action-btn primary">Купить</button>
              <button className="action-btn secondary">
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;