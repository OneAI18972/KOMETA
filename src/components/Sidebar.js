import React from 'react';
import { ChevronDown, Package, Users, Zap, Gamepad2, DollarSign, Shield, HelpCircle, Cpu } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Roblox <Zap className="pulse-icon" size={16} /> Аккаунты</h3>
      </div>
      
      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Категории</h4>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link">
            <Package className="sidebar-icon" size={16} />
            Предметы
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <Gamepad2 className="sidebar-icon" size={16} />
            Робуксы
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link active">
            <Users className="sidebar-icon" size={16} />
            Аккаунты
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <Zap className="sidebar-icon" size={16} />
            Буст
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <DollarSign className="sidebar-icon" size={16} />
            Игровая валюта
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <Cpu className="sidebar-icon" size={16} />
            Roblox Studio
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <Package className="sidebar-icon" size={16} />
            Скины
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <Package className="sidebar-icon" size={16} />
            Другое
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <Shield className="sidebar-icon" size={16} />
            Услуги
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <Package className="sidebar-icon" size={16} />
            Аренда
            <ChevronDown className="chevron" size={14} />
          </a>
          <a href="#" className="sidebar-link">
            <HelpCircle className="sidebar-icon" size={16} />
            Обучение
            <ChevronDown className="chevron" size={14} />
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;