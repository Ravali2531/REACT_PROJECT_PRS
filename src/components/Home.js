import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/upload-book">Upload Book</Link></li>            
            <li><Link to="/manage-books">Manage Books</Link></li>
        </ul>
    </div>
  )
}

export default Home