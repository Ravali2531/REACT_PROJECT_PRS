import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import MyFooter from './Footer';
import { Footer } from 'flowbite-react';
const Home = () => {
  return (
    <div>
      <Header />
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/upload-book">Upload Book</Link></li>            
            <li><Link to="/manage-books">Manage Books</Link></li>
        </ul>
      <MyFooter />
    </div>
  )
}

export default Home