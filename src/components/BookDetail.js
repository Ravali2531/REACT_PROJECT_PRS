import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/BookDetail.css';
import Header from './Header';
import MyFooter from './Footer';

const BookDetail = () => {
  const { id } = useParams(); // Extract the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the book details from Firebase based on the ID
    fetch(`https://react-project-prs-default-rtdb.firebaseio.com/books/${id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        return response.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No book found.</p>;
  console.log(book);

  return (
    <div>
        <Header />
        <div className="book-detail-container">
        {book.imageurl && (
        <div className="book-image-container">
          <img src={book.imageurl} alt={book.booktitle} className="book-image" />
        </div>
        )}
        <h1 className="book-title">{book.booktitle}</h1>
        <p className="book-author"><strong>Author:</strong> {book.authorname}</p>
        <p className="book-category"><strong>Genre:</strong> {book.category}</p>
        <p className="book-description"><strong>Description:</strong> {book.bookdescription}</p>
        </div>
        <MyFooter />
    </div>
  );
};

export default BookDetail;
