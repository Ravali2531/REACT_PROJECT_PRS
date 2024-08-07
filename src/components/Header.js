import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css'; 
import Logo from '../elogo.jpg';

const Header = () => {

  const navigate = useNavigate();

  // Function to handle logout
  const logout = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/home" className='logo'>
        <img src={Logo} alt="Blog Logo" />
      </Link>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>      
          <li><Link to="/upload-book">Upload</Link></li>            
          <li><Link to="/manage-books">Manage</Link></li>            
          <li><Link to="/all-books">Explore</Link></li>
          {/* <li><button className="logout-button" onClick={logout}>Logout</button></li> */}
        </ul>
        <button className="logout-button" onClick={logout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
