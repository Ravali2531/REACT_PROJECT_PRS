import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/Cart.css';

const Cart = () => {
  const location = useLocation();
  const [cart, setCart] = useState(location.state ? location.state.cart : []);

  useEffect(() => {
    console.log("CartPage cart:", cart);
  }, [cart]);

  const updateQuantity = (bookId, quantity) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => 
      prevCart.filter(item => item.id !== bookId)
    );
  };

  return (
    <div className="cart-page">
      <h2 className='text-5xl font-bold text-center'>Your Cart</h2>
      <Link to="/all-books" className='text-center block mt-4 text-blue-700'>
        Back to Books
      </Link>
      {cart.length === 0 ? (
        <p className='text-center'>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((book) => (
            <div key={book.id} className="cart-item">
              <img src={book.imageurl} alt={book.booktitle} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{book.booktitle}</h3>
                <p>{book.bookdescription}</p>
                <p>$10.00</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(book.id, book.quantity - 1)} disabled={book.quantity <= 1}>-</button>
                  <span>{book.quantity}</span>
                  <button onClick={() => updateQuantity(book.id, book.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(book.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
