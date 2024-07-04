import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Label, Select, TextInput, Textarea } from "flowbite-react";
import { database } from '../firebase';
import { ref, update, get } from 'firebase/database';
import './EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({});
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibiliography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design"
  ];

  useEffect(() => {
    const fetchBookData = async () => {
      const bookRef = ref(database, `books/${id}`);
      const bookSnap = await get(bookRef);
      if (bookSnap.exists()) {
        setBookData(bookSnap.val());
      } else {
        console.error('No book data found!');
      }
    };

    fetchBookData();
  }, [id]);

  const handleChangeSelectedValue = (e) => {
    setBookData({ ...bookData, category: e.target.value });
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedBookData = {
      booktitle: form.booktitle.value,
      authorname: form.authorname.value,
      imageurl: form.imageurl.value,
      category: form.category.value,
      bookdescription: form.bookdescription.value,
      bookpdfurl: form.bookpdfurl.value,
    }

    const bookRef = ref(database, `books/${id}`);
    update(bookRef, updatedBookData)
      .then(() => {
        alert("Book updated successfully");
        navigate('/manage-books');
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  return (
    <div className='edit-book-container'>
      <h2 className='title'>Update the book details</h2>
      <form onSubmit={handleUpdate} className="edit-book-form">
        <div className='form-row'>
          <div className='form-group'>
            <Label htmlFor="booktitle" value="Book title" />
            <TextInput id="booktitle" name='booktitle' type="text" placeholder="Enter Book name" required 
              defaultValue={bookData.booktitle} />
          </div>
          <div className='form-group'>
            <Label htmlFor="authorname" value="Author name" />
            <TextInput id="authorname" name='authorname' type="text" placeholder="Enter Author name" required 
              defaultValue={bookData.authorname} />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <Label htmlFor="imageurl" value="Book Image Url" />
            <TextInput id="imageurl" name='imageurl' type="text" placeholder="Enter Book Image url" required 
              defaultValue={bookData.imageurl} />
          </div>
          <div className='form-group'>
            <Label htmlFor="inputState" value='Category' />
            <Select id='inputState' name='category' value={bookData.category || bookCategories[0]}
              onChange={handleChangeSelectedValue}>
              {bookCategories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className='form-group'>
          <Label htmlFor="bookdescription" value="Book Descripiton" />
          <Textarea id="bookdescription" className='w-full' name='bookdescription' placeholder="Enter book description..." required rows={4}
            defaultValue={bookData.bookdescription} />
        </div>
        <div className='form-group'>
          <Label htmlFor="bookpdfurl" value="PDF Url" />
          <TextInput id="bookpdfurl" name='bookpdfurl' type="text" placeholder="Enter book PDF Url" required shadow
            defaultValue={bookData.bookpdfurl} />
        </div>
        <button type="submit" className='submit-button'>
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
