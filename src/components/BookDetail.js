import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/BookDetail.css';
import Header from './Header';
import MyFooter from './Footer';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/cart-icon.png';
import { CartContext } from './CartContext';

const BookDetail = () => {
  const { id } = useParams(); // Extract the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, updateCart } = useContext(CartContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch the book details from Firebase based on the ID
    fetch(`https://react-project-prs-default-rtdb.firebaseio.com/books/${id}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        return response.json();
      })
      .then(data => {
        setBook({ ...data, id });
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const price = cart.reduce((acc, item) => acc + item.quantity * 10, 0); // Assuming each book costs $10
    setTotalQuantity(quantity);
    setTotalPrice(price);
  }, [cart]);


  const addToCart = (book) => {
    const bookInCart = cart.find(item => item.id === book.id);

    if (bookInCart) {
      updateCart(
        cart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      updateCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div>
      <Header />
      <main className="main-content">
      <div className="book-detail-container">
        {book.imageurl && (
          <div className="book-img-container">
            <img src={book.imageurl} alt={book.booktitle} className="book-img" />
          </div>
        )}
        <div className="book-details">
          <h1 className="book-title">{book.booktitle}</h1>
          <p className="book-author"><strong>Author:</strong> {book.authorname}</p>
          <p className="book-category"><strong>Genre:</strong> {book.category}</p>
          <p className="book-description"><strong>Description:</strong> {book.bookdescription}</p>
          <button className="add-now-button" onClick={() => addToCart(book)}>
            Add Now
          </button>
        </div>
      </div>
      {cart.length > 0 && (
        <Link to="/cart" className="bd-cart-nav-link">
          <div className="cart-summary">
            <span className="cart-quantity">{totalQuantity}</span>
            <img src={cartIcon} alt="Cart" className="cart-nav-icon" />
            <span className="cart-price"><b>${totalPrice}</b></span>
          </div>
        </Link>
      )}
      </main>
      <MyFooter />
    </div>
  );
};

export default BookDetail;
