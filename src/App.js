import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Register from "./pages/account/Register";
import Login from "./pages/account/LogIn";
import Homepage from "./pages/homepage/Homepage";
import './App.css'

function App() {
  return (
    
    <Router>
      <Navbar />
      <ToastContainer />

      {/* Main Content Wrapper with margin on the left and right */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
