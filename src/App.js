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
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import Licensing from './components/Licensing';
import TermsAndConditions from './components/TermsAndConditions';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/upload-book" element={<UploadBook />} />
            <Route path="/manage-books" element={<ManageBooks />} />          
            <Route path="/edit-book/:id" element={<EditBooks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />          
            <Route path="/all-books" element={<AllBooks />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/home" element={<Home />} />
            <Route path="/checkoutform" element={<CheckoutForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />            
            <Route path="/licensing" element={<Licensing />} />                      
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
