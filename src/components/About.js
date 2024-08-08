import React from 'react';
import '../css/About.css'; 
import MyFooter from './Footer';
import Header from './Header';

const About = () => {
  return (
    <div>
        <Header />
    <div className="about-container">
      <h1>About Our Library Management System</h1>
      <p>
        Welcome to our Library Management System! This system is designed to simplify the management of your library's resources and streamline the borrowing process for users.
      </p>
      
      <h2>Features</h2>
      <ul>
        <li>Catalog Management: Easily manage your collection of books, journals, and other resources.</li>
        <li>User Management: Create and manage user accounts.</li>
        <li>Borrowing System: Allow users to borrow and return books with ease.</li>
        <li>Inventory Tracking: Keep track of the status and location of each item in your library.</li>
        <li>Search Functionality: Quickly search for books by title.</li>
        <li>Reports and Analytics: Generate reports to analyze library usage and inventory status.</li>
      </ul>
      
      <h2>Contact Us</h2>
      <p>
        If you have any questions or need further assistance, please feel free to contact us:
      </p>
      <ul>
        <li>Email: support@librarysystem.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 123 Library St, Booktown, BK 12345</li>
      </ul>
    </div>
    <MyFooter />
    
    </div>
  );
};

export default About;
