import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import MyFooter from './Footer';
import BannerCard from './BannerCard';
import FavBook from './FavBook';
import Shop from './shop';
import { Footer } from 'flowbite-react';
const Home = () => {
  return (
    <div>
      <Header />
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/uploadbook">Upload Book</Link></li>            
            <li><Link to="/managebooks">Manage Books</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            
        </ul>
        <div className='banner-container'>
          <div className='banner-content'>
            {/* Left side */}
            <div className='banner-left'>
              <h2 className='banner-title'>
                Library Management System <span className='highlight'>Add or Borrow Books</span>
              </h2>
              <p className='banner-description'>
                Libraries are essential in a process of giving citizens access to knowledge. In digital times they are needed more than ever before. In times of the internet, everyone can visit a library without leaving home. It’s just a matter of opening a library website, and you can not only borrow an ebook but also ask the librarian an online question.
              </p>
              <div className='banner-search'>
                <input type="search" name='search' id='search' placeholder='Search a Book' className='search-input' />
                <button className='search-button'>Search</button>
              </div>
            </div>

            {/* Right side */}
            <div>
              <BannerCard />
            </div>
          </div>
        </div>
        <FavBook /> 
      <MyFooter />
    </div>
  )
}

export default Home;

