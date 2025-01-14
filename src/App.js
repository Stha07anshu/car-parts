import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";
import Register from "./pages/account/Register";
import Login from "./pages/account/LogIn";
import Homepage from "./pages/homepage/Homepage";
import './App.css'
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUpdate from "./pages/admin/AdminUpdate";
import AdminRoutes from "./protected_routes/AdminRoutes";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/cart/Cart";
import About from "./pages/about/About";
import ProductDescription from "./pages/ui/ProductDescription";
import Contact from "./pages/contact/Contact";
import OrderSuccess from "./pages/ui/Order";
import ViewOrder from "./pages/ui/ViewOrder";
import MyOrders from "./pages/ui/ViewOrder";
import OrderDetails from "./pages/ui/OrderDetails";
import AllProductsPage from "./pages/ui/AllProducts";
import Success from "./pages/payments/Sucess";
import Failure from "./pages/payments/Failure";
import AdminOrders from "./pages/admin/AdminOrder";
import AdminViewContacts from "./pages/admin/AdminViewContact";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/order/confirmation" element={<OrderSuccess/>} />
          <Route path="/my-order" element={<MyOrders/>} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/all-products" element={<AllProductsPage />} />
          <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
          


          <Route element={<AdminRoutes />}>
            
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/update/:id' element={<AdminUpdate />} />
            <Route path='/admin/order' element={<AdminOrders />} />
            <Route path='/admin/contact' element={<AdminViewContacts />} />
          </Route>
        </Routes>


      </div>

      <Footer />
    </Router>
  );
}

export default App;
