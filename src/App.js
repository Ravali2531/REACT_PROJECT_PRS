import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
// import Home from './components/Home';
import UploadBook from './components/UploadBook';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UploadBook />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
