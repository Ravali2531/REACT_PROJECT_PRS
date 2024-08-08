import React, { useState, useEffect, useContext } from 'react';
import { Card } from "flowbite-react";
import { database } from '../firebase';
import { ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/cart-icon.png';
import { CartContext } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AllBooks.css';
import Header from './Header';
import MyFooter from './Footer';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, updateCart } = useContext(CartContext);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = ref(database, 'books');
      try {
        const snapshot = await get(booksRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const booksArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setBooks(booksArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchBooks();
  }, []);

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

  return (
    <div className="page-wrapper">
      <Header />
      <main className="container mt-5 main-content">
        <h2 className="text-center mb-4">All Books are here!</h2>
        <div className="row">
          {books.length > 0 && books.map((book) => (
            <div key={book.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <Card className="book-card">
                <div className="book-image-container position-relative">
                  <img src={book.imageurl} alt={book.booktitle} className="book-image img-fluid" />
                  <img
                    src={cartIcon}
                    alt="Add to cart"
                    className="cart-icon"
                    onClick={() => addToCart(book)}
                  />
                </div>
                <h5 className="text-center mt-2">{book.booktitle}</h5>
                <p className="text-center">
                  {book.bookdescription || "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
                </p>
                <p className="text-center">$10.00</p>
                <button className="btn btn-primary w-100" onClick={() => addToCart(book)}>Add Now</button>
              </Card>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <Link to="/cart" className="cart-nav-link">
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

export default AllBooks;
