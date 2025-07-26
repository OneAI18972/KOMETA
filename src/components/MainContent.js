import React from 'react';
import GameBanner from './GameBanner';
import AccountCard from './AccountCard';
import './MainContent.css';

const MainContent = () => {
  const accounts = [
    {
      id: 1,
      title: 'АККАУНТ 2474 ОБЛИГАЦИЙ 🔥 МЕГА ДЕШЕВО',
      price: 63,
      currency: '₽',
      game: 'Dead Rails',
      image: '/api/placeholder/300/200',
      seller: 'vpoda',
      region: 'Украина',
      rating: 4.8,
      features: ['Аккаунты', 'Почта']
    },
    {
      id: 2,
      title: '2500LVL God Human CHI Dough',
      price: 298,
      currency: '₽',
      game: 'Blox Fruits',
      image: '/api/placeholder/300/200',
      seller: 'AgroVyborg',
      region: 'Россия',
      rating: 4.9,
      features: ['Аккаунты', 'Почта', 'Войс чат']
    },
    {
      id: 3,
      title: 'Аккаунт кейбер',
      price: 140,
      currency: '₽',
      game: 'Blue Lock Rivals',
      image: '/api/placeholder/300/200',
      seller: 'Почта',
      region: 'Россия',
      rating: 4.7,
      features: ['Аккаунты', 'Войс чат']
    },
    {
      id: 4,
      title: 'для покупки всего',
      price: null,
      currency: '₽',
      game: 'Various Games',
      image: '/api/placeholder/300/200',
      seller: 'GameMaster',
      region: 'Россия',
      rating: 4.6,
      features: ['Аккаунты']
    }
  ];

  return (
    <main className="main-content">
      <GameBanner />
      
      <div className="content-wrapper">
        <div className="accounts-grid">
          {accounts.map(account => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
        
        <div className="activation-banner">
          <h3>Активация Windows</h3>
          <p>Перейдите в раздел "Параметры", чтобы активировать Windows.</p>
        </div>
      </div>
    </main>
  );
};

export default MainContent;