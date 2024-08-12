import React, { createContext, useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { auth, database } from '../firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
      fetchCart(currentUser.uid);
    } else {
      // Listen for auth state changes to fetch the cart when the user logs in
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setUserId(user.uid);
          fetchCart(user.uid);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const fetchCart = async (userId) => {
    try {
      const cartRef = ref(database, `carts/${userId}`);
      const snapshot = await get(cartRef);
      if (snapshot.exists()) {
        setCart(snapshot.val());
      } else {
        setCart([]); // If no cart data exists, initialize with an empty array
      }
    } catch (error) {
      console.error("Error fetching cart: ", error);
    }
  };

  const updateCart = async (newCart) => {
    if (userId) {
      try {
        await set(ref(database, `carts/${userId}`), newCart);
        setCart(newCart);
      } catch (error) {
        console.error("Error updating cart: ", error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};