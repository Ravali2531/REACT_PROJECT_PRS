import React, { useState, useEffect } from 'react';
import { Card } from "flowbite-react";
import { database } from '../firebase';
import { ref, get } from 'firebase/database';
import '../css/AllBooks.css';
import cartIcon from '../assets/cart-icon.png'; 

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

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

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books are here!</h2>
      <div className='books-grid'>
        {books.length > 0 && (
          books.map((book) => (
            <Card key={book.id} className="book-card">
              <div className="relative">
                <img src={book.imageurl} alt={book.booktitle} className='book-image' />
                <img
                  src={cartIcon}
                  alt="Add to cart"
                  className="cart-icon"
                  onClick={() => addToCart(book)}
                />
              </div>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{book.booktitle}</p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {book.bookdescription || "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
              </p>
              <p>$10.00</p>
              <button className='add-button' onClick={() => addToCart(book)}>Add Now</button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AllBooks;
