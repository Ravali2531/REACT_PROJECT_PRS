import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import '../css/Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const { cart, updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, book) => acc + book.quantity * 10, 0); 

  const handleQuantityChange = (bookId, newQuantity) => {
    if (newQuantity <= 0) return;
    updateCart(
      cart.map(item =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (bookId) => {
    updateCart(cart.filter(item => item.id !== bookId));
  };

  const handleCheckout = async () => {
    navigate('/checkoutform');
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center mb-4'>Your Cart</h2>
      <Link to="/all-books" className='d-block text-center mb-4 text-primary'>
        Back to Books
      </Link>
      {cart.length === 0 ? (
        <p className='text-center'>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((book) => (
            <div key={book.id} className="cart-item d-flex align-items-center mb-3">
              <img src={book.imageurl} alt={book.booktitle} className="cart-item-image img-fluid me-3" />
              <div className="cart-item-details flex-grow-1">
                <h3>{book.booktitle}</h3>
                <p>{book.bookdescription}</p>
                <p>${(book.quantity * 10).toFixed(2)}</p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-outline-secondary me-2" onClick={() => handleQuantityChange(book.id, book.quantity - 1)} disabled={book.quantity <= 1}>-</button>
                  <span>{book.quantity}</span>
                  <button className="btn btn-outline-secondary ms-2" onClick={() => handleQuantityChange(book.id, book.quantity + 1)}>+</button>
                </div>
                <button className="btn btn-danger mt-2" onClick={() => removeFromCart(book.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total mt-4 text-center">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;