import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu in mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu after clicking a link (for mobile)
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Brand / Logo */}
      <div className="navbar-brand">
        <Link to="/hero" onClick={handleLinkClick}>My Portfolio</Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/hero" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
        <li><Link to="/projects" onClick={handleLinkClick}>Projects</Link></li>
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
        <li><Link to="/portfolio" onClick={handleLinkClick}>Portfolio</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
