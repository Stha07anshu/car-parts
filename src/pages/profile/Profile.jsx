import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setFormData({
        fullName: userData.name,
        email: userData.email,
        address: userData.address || "", // Initialize address from localStorage
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { fullName, email, currentPassword, newPassword, confirmNewPassword, address } = formData;

    // Validate that new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      setLoading(false);
      setError("Passwords do not match!");
      return;
    }

    // Check if old password is correct ('123456')
    if (currentPassword !== "123456") {
      setLoading(false);
      setError("Incorrect old password!");
      return;
    }

    // Simulate saving the updated information (localStorage in this case)
    setLoading(false);
    setSuccess("Profile updated successfully!");

    // Update the localStorage with the new profile information
    localStorage.setItem(
      "user",
      JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), name: fullName, email, address })
    );
  };

  return (
    <div className="profile-edit-container">
      <h2 className="profile-edit-header">Edit Your Profile</h2>
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        <h3 className="password-header">Password Changes</h3>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-buttons">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
