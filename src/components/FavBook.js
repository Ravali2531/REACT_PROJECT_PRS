import React from 'react';
import FavBookImg from "../assets/favoritebook.jpg";
import { Link } from 'react-router-dom';
import './FavBook.css';

const FavBook = () => {
  return (
    <div className='favbook-container'>
      <div className='favbook-content'>
        {/* Favourite Book Image*/}
        <div className='favbook-image'>
          <img src={FavBookImg} alt='Favorite Book' className='favbook-img' />
        </div>
        {/* Text for the favorite book */}
        <div className='favbook-text'>
          <h2 className='favbook-title'>
            Find Your Favourite <span className='highlight'>Book here!</span>
          </h2>
          <p className='favbook-description'>
            Some classics like "To Kill a Mockingbird" by Harper Lee, "1984" by George Orwell, and "The Great Gatsby" by F. Scott Fitzgerald are widely regarded as favorites by many readers. Contemporary favorites might include "The Harry Potter Series" by J.K. Rowling or "The Hunger Games Trilogy" by Suzanne Collins.
          </p>
          {/* Link to all books page */}
          <Link to='/all-books' className='explore-link'>
            <button className='explore-button'>Explore More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FavBook;
