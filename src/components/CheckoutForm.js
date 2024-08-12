import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const stripePromise = loadStripe('pk_test_51PlVh8P9Bz7XrwZPnWMN2upZk3x00s3soZgJgM5QTMuwCNoZPBdGtmPRXB29vBnFvOXjEAv2vntLuQaWbPpEHOmP00D7pelv0B');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, updateCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    },
  });
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, book) => acc + book.quantity * 10, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch('http://localhost:4242/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPrice * 100 }) // amount in cents
    });

    const { clientSecret } = await response.json();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      },
    });

    setLoading(false);

    if (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
      updateCart([]); // Clear the cart after successful payment
      navigate('/home'); // Redirect to home or confirmation page
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in billingDetails.address) {
      setBillingDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          [name]: value,
        },
      }));
    } else {
      setBillingDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-6 mb-4 order-summary">
          <h4>Order Summary</h4>
          <ul className="list-group mb-3">
            {cart.map((book) => (
              <li key={book.id} className="list-group-item d-flex justify-content-between">
                <div>
                  <h6 className="my-0">{book.booktitle}</h6>
                  <small className="text-muted">Quantity: {book.quantity}</small>
                </div>
                <span className="text-muted">${(book.quantity * 10).toFixed(2)}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (CAD)</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-6 billing-details">
          <h4>Billing Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={billingDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="line1" className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                id="line1"
                name="line1"
                value={billingDetails.address.line1}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={billingDetails.address.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State/Province</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={billingDetails.address.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postal_code" className="form-label">Postal/ZIP Code</label>
              <input
                type="text"
                className="form-control"
                id="postal_code"
                name="postal_code"
                value={billingDetails.address.postal_code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={billingDetails.address.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <h4>Payment Details</h4>
            <div className="mb-3">
              <label htmlFor="cardElement" className="form-label">Credit or Debit Card</label>
              <CardElement id="cardElement" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading || !stripe || !elements}>
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const YourComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default YourComponent;
