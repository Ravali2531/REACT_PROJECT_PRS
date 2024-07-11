import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import UploadBook from './components/UploadBook';
import ManageBooks from './components/ManageBooks';
import EditBooks from './components/EditBook';
import AllBooks from './components/AllBooks';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload-book" element={<UploadBook />} />
          <Route path="/manage-books" element={<ManageBooks />} />          
          <Route path="/edit-book/:id" element={<EditBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />          
          <Route path="/all-books" element={<AllBooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
