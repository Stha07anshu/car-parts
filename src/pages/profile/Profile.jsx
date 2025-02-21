import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
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
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setFormData({
        fullName: userData.name,
        email: userData.email,
        address: userData.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setChangePassword(!changePassword);
    if (!changePassword) {
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      fullName,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
      address,
    } = formData;

    // Validate that new password and confirm password match
    if (changePassword && newPassword !== confirmNewPassword) {
      setLoading(false);
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Prepare the data to send to the server
      const data = {
        email,
        oldPassword: changePassword ? currentPassword : undefined,
        newPassword: changePassword ? newPassword : undefined,
        newName: fullName,
        address,
      };

      // Make the API call to update the user
      const response = await fetch(
        "http://localhost:5000/api/user/update/" +
          JSON.parse(localStorage.getItem("user"))._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      console.log("THE RESPONSE IS ", result);

      if (result.success) {
        toast.success(result.message);
        // Update localStorage with the new profile information
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user")),
            name: fullName,
            email,
            address,
          }),
        );
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profile-edit-container'>
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
      <h2 className='profile-edit-header'>Edit Your Profile</h2>
      <form className='profile-edit-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Full Name</label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            style={{
              cursor: "not-allowed",
              backgroundColor: "#f5f5f9",
            }}
            type='email'
            name='email'
            value={formData.email}
            disabled
          />
        </div>

        <div className='form-group'>
          <label>Address</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            placeholder='Enter your address'
          />
        </div>

        <h3 className='password-header'>Password Changes</h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <label>Change Password</label>
          <input
            style={{
              width: "auto",
              padding: "0",
              margin: "0",
            }}
            type='checkbox'
            checked={changePassword}
            onChange={handleCheckboxChange}
          />
        </div>

        {changePassword && (
          <>
            <div className='form-group'>
              <label>Current Password</label>
              <input
                type='password'
                name='currentPassword'
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>New Password</label>
              <input
                type='password'
                name='newPassword'
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Confirm New Password</label>
              <input
                type='password'
                name='confirmNewPassword'
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className='form-buttons'>
          <button type='button' className='cancel-button'>
            Cancel
          </button>
          <button type='submit' className='save-button' disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;