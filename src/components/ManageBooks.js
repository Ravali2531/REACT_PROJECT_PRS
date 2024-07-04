import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import './ManageBooks.css';

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const booksRef = ref(database, 'books');
    onValue(booksRef, (snapshot) => {
      const booksData = snapshot.val();
      if (booksData) {
        const booksList = [];
        for (const key in booksData) {
          if (Object.prototype.hasOwnProperty.call(booksData, key)) {
            const book = {
              id: key,
              ...booksData[key]
            };
            booksList.push(book);
          }
        }
        setAllBooks(booksList);
      } else {
        setAllBooks([]);
      }
    });

    // Cleanup function
    return () => {
      // Detach the listener when component unmounts
      onValue(booksRef, () => {});
    };
  }, []);

  //delete a book
  const handleDelete = (id) => {
    const bookRef = ref(database, `books/${id}`);
    remove(bookRef)
      .then(() => {
        alert("Book deleted successfully!");
      })
      .catch((error) => {
        console.error("Error removing book: ", error);
      });
  };

  // Render books manually without using map
  let booksTable = null;
  if (allBooks.length > 0) {
    booksTable = (
      <tbody>
        {(() => {
          const rows = [];
          for (let i = 0; i < allBooks.length; i++) {
            const book = allBooks[i];
            rows.push(
              <tr key={book.id}>
                <td>{i + 1}</td>
                <td>{book.booktitle}</td>
                <td>{book.authorname}</td>
                <td>{book.category}</td>
                <td>
                  <Link
                    to={`/edit-book/${book.id}`}
                    className='edit-link'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className='delete-button'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          }
          return rows;
        })()}
      </tbody>
    );
  } else {
    booksTable = (
      <tbody>
        <tr>
          <td colSpan='5'>No books available</td>
        </tr>
      </tbody>
    );
  }

  return (
    <div className='manage-books-container'>
      <h2 className='title'>Manage your books</h2>
      <table className='books-table'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Category</th>
            <th>Edit or Manage</th>
          </tr>
        </thead>
        {booksTable}
      </table>
    </div>
  );
};

export default ManageBooks;
