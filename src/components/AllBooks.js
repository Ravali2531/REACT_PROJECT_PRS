import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'flowbite-react';
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
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
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
          setFilteredBooks(booksArray);

          // Extract unique categories
          const uniqueCategories = [...new Set(booksArray.map(book => book.category))];
          setCategories(['All', ...uniqueCategories]);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchBooks();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.category === category));
    }
  };

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

        {/* Category Filter */}
        <div className="mb-4 text-center">
          <label htmlFor="category" className="form-label me-2">Filter by Category:</label>
          <select id="category" className="form-select w-auto d-inline-block" value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="row">
          {filteredBooks.length > 0 && filteredBooks.map((book) => (
            <div key={book.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <Card className="book-card">
                <div className="book-image-container position-relative">
                  <Link to={`/book/${book.id}`}>
                    <img src={book.imageurl} alt={book.booktitle} className="book-image img-fluid" />
                  </Link>
                  <img
                    src={cartIcon}
                    alt="Add to cart"
                    className="cart-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(book);
                    }}
                  />
                </div>
                <Link to={`/book/${book.id}`}>
                  <h5 className="text-center mt-2">{book.booktitle}</h5>
                  <p className="text-center">$10.00</p>
                </Link>
                <button
                  className="btn btn-primary w-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(book);
                  }}
                >
                  Add Now
                </button>
              </Card>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <Link to="/cart" className="cart-nav-link">
            <div className="cart-summary">
              <span className="cart-quantity">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
              <img src={cartIcon} alt="Cart" className="cart-nav-icon" />
              <span className="cart-price"><b>${cart.reduce((acc, item) => acc + item.quantity * 10, 0).toFixed(2)}</b></span>
            </div>
          </Link>
        )}
      </main>
      <MyFooter />
    </div>
  );
};

export default AllBooks;
