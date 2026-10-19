import React from 'react';
import { NavLink, Link } from '../router';

export interface NavbarProps {
  totalBreeds: number;
}

export default function Navbar({ totalBreeds }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🐕</span>
          <div className="brand-text">
            <span className="brand-title">DogCEO</span>
            <span className="brand-subtitle">Breed Explorer TS</span>
          </div>
        </Link>

        <nav className="navbar-links" aria-label="ניווט ראשי">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            🏠 דף נחיתה
          </NavLink>
          <NavLink
            to="/explorer"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            🐾 קטלוג גזעים (העבודה)
            {totalBreeds > 0 && <span className="nav-badge">{totalBreeds}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}