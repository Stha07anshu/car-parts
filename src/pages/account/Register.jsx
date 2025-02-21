import React, { useState } from 'react';
import { registerUserApi } from '../../api/Api'; // Import your API utility
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for toastify
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password visibility

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false); // Track if password input is focused

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Check password strength if the password field is being updated
    if (id === 'password') {
      checkPasswordStrength(value);
    }

    // Validate email format
    if (id === 'email') {
      validateEmail(value);
    }

    // Check if passwords match
    if (id === 'confirmPassword') {
      setPasswordMatch(value === formData.password);
    }
  };

  const checkPasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (strongPasswordRegex.test(password)) {
      setPasswordStrength('Strong');
    } else if (mediumPasswordRegex.test(password)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if all fields are filled
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm() && emailValid && passwordMatch) {
      try {
        // Call the register API
        const response = await registerUserApi(formData);

        if (response.data.success) {
          toast.success('User registered successfully!'); // Use React Toastify for success message
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          setPasswordStrength(''); // Reset password strength
          setEmailValid(false); // Reset email validation
          setPasswordMatch(false); // Reset password match validation
          // Navigate to the home page after successful registration
          navigate('/login'); // Redirect to the home page
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Something went wrong!';
        toast.error(errorMsg); // Use React Toastify for error message
      }
    } else {
      toast.error('Please fix the errors before submitting.'); // Show error toast
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getPasswordStrengthPercentage = () => {
    switch (passwordStrength) {
      case 'Strong':
        return 100;
      case 'Medium':
        return 60;
      case 'Weak':
        return 30;
      default:
        return 0;
    }
  };

  return (
    <div className="signup-page">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row w-100">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://i.pinimg.com/736x/d3/42/dd/d342dd4f3ac0c2a88d4be645b0c5f1ca.jpg"
              alt="Sign Up Illustration"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <div className="off-white-container">
              <h3 className="text-center mb-4">Create an account</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email or Phone Number</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                  {!emailValid && formData.email && (
                    <div className="text-danger">Email is not valid</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setPasswordFocused(true)} // Set focused state on focus
                      onBlur={() => setPasswordFocused(false)} // Reset focused state on blur
                    />
                    <span className="input-group-text" onClick={togglePasswordVisibility}>
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                  {passwordFocused && ( // Show suggestions only when focused
                    <>
                      <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                        {passwordStrength && `Password Strength: ${passwordStrength}`}
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${getPasswordStrengthPercentage()}%` }}
                          aria-valuenow={getPasswordStrengthPercentage()}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="requirements">
                        <ul>
                          <li className={formData.password.match(/[a-z]/) ? 'fulfilled' : ''}>
                            At least one lowercase letter
                          </li>
                          <li className={formData.password.match(/[A-Z]/) ? 'fulfilled' : ''}>
                            At least one uppercase letter
                          </li>
                          <li className={formData.password.match(/\d/) ? 'fulfilled' : ''}>
                            At least one number
                          </li>
                          <li className={formData.password.match(/[@$!%*?&]/) ? 'fulfilled' : ''}>
                            At least one special character
                          </li>
                          <li className={formData.password.length >= 8 ? 'fulfilled' : ''}>
                            At least 8 characters long
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">Re-type Password</label>
                  <div className="input-group">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Re-type password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="input-group-text" onClick={togglePasswordVisibility}>
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                  {!passwordMatch && formData.confirmPassword && (
                    <div className="text-danger">Passwords do not match</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Account</button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
