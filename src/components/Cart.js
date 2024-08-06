import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../css/Cart.css';
import { CartContext } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Stripe public key (replace with your actual public key)
const stripePromise = loadStripe('pk_live_51Phhd2IBJqmyhxcc0KjIN525TPAMr0B8lQwLe2GXnZnC0QDru3ldNb8LtAOlDpCBa2N46ZQSMf05zhLPuk95T4S900FaLuymQ0');

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Customer Name', // Replace with actual customer's name if available
        },
      },
    });

    if (error) {
      setPaymentError(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="btn btn-primary mt-3" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
      {paymentSuccess && <p style={{ color: 'green' }}>Payment Successful!</p>}
    </form>
  );
};

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState('');

  const updateQuantity = (bookId, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === bookId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) =>
      prevCart.filter(item => item.id !== bookId)
    );
  };

  // Calculate total price based on the base price of 10 per book and quantity
  const totalPrice = cart.reduce((acc, book) => acc + book.quantity * 10, 0);

  // Handle checkout button click
  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4242/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice * 100 }), // Amount in cents
      });
      const { clientSecret } = await response.json();
      console.log("Client Secret:", clientSecret); // Debug log
      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
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
                  <button className="btn btn-outline-secondary me-2" onClick={() => updateQuantity(book.id, book.quantity - 1)} disabled={book.quantity <= 1}>-</button>
                  <span>{book.quantity}</span>
                  <button className="btn btn-outline-secondary ms-2" onClick={() => updateQuantity(book.id, book.quantity + 1)}>+</button>
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
          {clientSecret && (
            <Elements stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
