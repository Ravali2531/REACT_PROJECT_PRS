import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import MyFooter from './Footer.js';
import { Footer } from 'flowbite-react';
const Home = () => {
  return (
    <div>
      <Header />
        <MyFooter />
    </div>
  )
}

export default Home