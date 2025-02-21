import React, { useState } from 'react';
import { loginUserApi } from '../../api/Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LogIn.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await loginUserApi(formData);

        if (response.data.success) {
          setFormSubmitted(true);
          toast.success('Login successful!', { position: 'top-right' });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.userData));
          navigate('/');
        } else {
          toast.warning('Incorrect email or password!', { position: 'top-right' });
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Login failed! Please try again.';
        toast.error(errorMsg, { position: 'top-right' });
        setFormSubmitted(false);
      }
    } else {
      toast.info('Please fill in all required fields.', { position: 'top-right' });
    }
  };

  return (
    <div className="login-page">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row w-100">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://i.pinimg.com/736x/d3/42/dd/d342dd4f3ac0c2a88d4be645b0c5f1ca.jpg"
              alt="Login Illustration"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <div className="off-white-container">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <a href="/register">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
