import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; 
import Logo from '../elogo.jpg';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  // Mock function for handling Google login response
  const responseGoogle = (response) => {
    const profileData = response.profileObj; 
    setIsLoggedIn(true);
    setUserProfile(profileData);
  };

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setShowLogout(false); // Hide the logout button after logout
  };

  // Function to toggle showing the logout button
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <header className="header">
      <Link to="/" className='logo'>
        <img src={Logo} alt="Blog Logo" />
      </Link>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/upload-book">Upload Book</Link></li>            
          <li><Link to="/manage-books">Manage Books</Link></li>            
            <li><Link to="/shop">Shop</Link></li>
          {isLoggedIn ? (
            <>
              <li className="profile">
                <button className="profile-button" onClick={toggleLogout}>
                  {userProfile && userProfile.imageUrl ? (
                    <img src={userProfile.imageUrl} alt={userProfile.name} className="profile-img" />
                  ) : (
                    <FaUserCircle className="profile-img" />
                  )}
                </button>
                {showLogout && (
                  <button className="logout-button" onClick={logout}>Logout</button>
                )}
              </li>
            </>
          ) : (
            <li className="profile">
                <button className="profile-button" onClick={toggleLogout}>
                  {userProfile && userProfile.imageUrl ? (
                    <img src={userProfile.imageUrl} alt={userProfile.name} className="profile-img" />
                  ) : (
                    <FaUserCircle className="profile-img" />
                  )}
                </button>
                {showLogout && (
                  <button className="logout-button" onClick={logout}>Logout</button>
                )}
              </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
