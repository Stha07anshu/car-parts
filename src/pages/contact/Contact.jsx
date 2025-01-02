import React, { useState } from "react";
import { createContact } from "../../api/Api";  // Import the createContact API
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createContact(formData);  // Use the createContact API
      if (response.data.success) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <div className="info-section">
          <h3>Call To Us</h3>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +977-9807654321</p>
        </div>
        <div className="info-section">
          <h3>Write To Us</h3>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Email: gearsupport@gmail.com</p>
        </div>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone *"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;
