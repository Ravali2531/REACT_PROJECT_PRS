import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import MyFooter from './Footer';
import { Footer } from 'flowbite-react';
import BannerCard from './BannerCard';
import FavBook from './FavBook';
import SearchBar from './SearchBar';
const Home = () => {
  return (
    <div>
      <Header />
        {/* <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/upload-book">Upload Book</Link></li>            
            <li><Link to="/manage-books">Manage Books</Link></li>
        </ul> */}
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
              <SearchBar />
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

