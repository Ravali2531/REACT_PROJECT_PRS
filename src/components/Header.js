import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css'; 
import Logo from '../elogo.jpg';

const Header = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to handle logout
  const logout = () => {
    navigate('/');
  };

  // Function to toggle navigation menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <Link to="/home" className='logo'>
        <img src={Logo} alt="Blog Logo" />
      </Link>
      <div className="hamburger" onClick={toggleNav}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav>
        <ul className={isNavOpen ? 'show' : ''}>
          <li><Link to="/home">Home</Link></li>      
          <li><Link to="/upload-book">Upload</Link></li>            
          <li><Link to="/manage-books">Manage</Link></li>            
          <li><Link to="/all-books">Explore</Link></li>
          <li><button className="logout-button" onClick={logout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
