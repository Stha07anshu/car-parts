import React, { useEffect, useState } from 'react';
import { getAllContacts } from '../../api/Api'; // Assuming this API function is available
import './css/AdminViewContact.css'; // Your custom styles

const AdminViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAllContacts();  // API call to fetch contacts
        setContacts(response.data.data);  // Assuming your API returns data in this format
      } catch (err) {
        setError("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="contacts-container">
      <h1>All Contact Requests</h1>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <div key={contact._id} className="contact-card">
            <div className="contact-card-header">
              <h3>{contact.name}</h3>
            </div>
            <div className="contact-card-body">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Message:</strong> {contact.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminViewContacts;
