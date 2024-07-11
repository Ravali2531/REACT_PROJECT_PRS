import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import Logo from'../elogo.jpeg';
const Header = () => {
  return (
    <header className="header">
     <Link to="/">
          <img src={Logo} alt="Blog Logo" />
        </Link>
      <nav>
        <ul>
        <li><Link to="/login">Login</Link></li>
            <li><Link to="/upload-book">Upload Book</Link></li>            
            <li><Link to="/manage-books">Manage Books</Link></li>
            <li><Link to="/shop">Shop</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
