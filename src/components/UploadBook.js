import React, { useState } from 'react';
import { Label, Select, TextInput, Textarea } from "flowbite-react";
import { database } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import {ref, onValue, update, push, remove} from 'firebase/database';
import './UploadBook.css';

const UploadBook = () => {
  const bookCategories = [
    "Fiction", "Non-Fiction", "Mystery", "Programming", "Science Fiction",
    "Fantasy", "Horror", "Bibiliography", "Autobiography", "History",
    "Self-help", "Memoir", "Business", "Children Books", "Travel",
    "Religion", "Art and Design"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (e) => {
    setSelectedBookCategory(e.target.value);
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const booktitle = form.booktitle.value;
    const authorname = form.authorname.value;
    const imageurl = form.imageurl.value;
    const category = form.category.value;
    const bookdescription = form.bookdescription.value;
    const bookpdfurl = form.bookpdfurl.value;

    const bookObj = {
      booktitle, authorname, imageurl, category, bookdescription, bookpdfurl
    };

    try {
      // const bookId = `${booktitle.replace(/\s+/g, '_')}_${Date.now()}`;
      // const docRef = doc(db, "books", bookId);

      // // Set the document data at the specified reference
      // await setDoc(docRef, bookObj);
      
      // alert("Book uploaded successfully with ID: " + bookId);

      const docref = push(ref(database, 'books'));
      update(docref, bookObj)
      .then(() => {
        console.log('Data added');
      })
      .catch((error) => {
        console.log(error);
      })
      form.reset();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className='upload-book-container'>
      <h2 className='title'>Upload a book</h2>
      <form onSubmit={handleBookSubmit} className="upload-book-form">
        <div className='form-row'>
          <div className='form-group'>
            <Label htmlFor="booktitle" value="Book title" />
            <TextInput id="booktitle" name='booktitle' type="text" placeholder="Enter Book name" required />
          </div>
          <div className='form-group'>
            <Label htmlFor="authorname" value="Author name" />
            <TextInput id="authorname" name='authorname' type="text" placeholder="Enter Author name" required />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <Label htmlFor="imageurl" value="Book Image Url" />
            <TextInput id="imageurl" name='imageurl' type="text" placeholder="Enter Book Image url" required />
          </div>
          <div className='form-group'>
            <Label htmlFor="inputState" value='Category' />
            <Select id='inputState' name='category' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {bookCategories.map((option) => <option key={option} value={option}>{option}</option>)}
            </Select>
          </div>
        </div>
        <div className='form-group'>
          <Label htmlFor="bookdescription" value="Book Description" />
          <Textarea id="bookdescription" name='bookdescription' placeholder="Enter book description..." required rows={4} />
        </div>
        <div className='form-group'>
          <Label htmlFor="bookpdfurl" value="PDF Url" />
          <TextInput id="bookpdfurl" name='bookpdfurl' type="text" placeholder="Enter book PDF Url" required />
        </div>
        <button type="submit" className='submit-button'>Upload Book</button>
      </form>
    </div>
  );
};

export default UploadBook;
