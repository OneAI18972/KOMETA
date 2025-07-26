import React from 'react';
import { Search, User, Bell, Settings } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-text">Redti</span>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link">Игры</a>
          <a href="#" className="nav-link">Приложения</a>
          <a href="#" className="nav-link">О сервисе</a>
          <a href="#" className="nav-link">Помощь</a>
        </nav>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Поиск игр и приложений"
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="header-btn">Продать</button>
        <Bell className="header-icon" size={20} />
        <User className="header-icon" size={20} />
        <Settings className="header-icon" size={20} />
      </div>
    </header>
  );
};

export default Header;