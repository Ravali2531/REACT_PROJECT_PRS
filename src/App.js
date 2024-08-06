import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext'; 
import Login from './components/Login';
import Home from './components/Home';
import UploadBook from './components/UploadBook';
import ManageBooks from './components/ManageBooks';
import EditBooks from './components/EditBook';
import AllBooks from './components/AllBooks';
import Register from './components/Register';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';

function App() {
  return (
    <CartProvider>
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
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkoutform" element={<CheckoutForm />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
