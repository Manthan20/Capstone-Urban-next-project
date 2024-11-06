import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Dashboard() {
  const { role, userId } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      if (role === 'admin') {
        try {
          const userResponse = await axios.get('http://localhost:4000/api/users');
          setUsers(userResponse.data);

          const propertyResponse = await axios.get('http://localhost:4000/api/properties');
          setProperties(propertyResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          alert('Failed to fetch data.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/properties/${id}`);
      setProperties(properties.filter(property => property.id !== id));
      alert('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/update-property/${id}`); // Navigate to the update page with property ID
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (role !== 'admin') {
    return <h2>Access denied: You do not have permission to view this page.</h2>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Properties List</h1>

      <table className="property-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Length (m)</th>
            <th>Breadth (m)</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.length === 0 ? (
            <tr>
              <td colSpan="10">No properties found.</td>
            </tr>
          ) : (
            properties.map((property) => (
              <tr key={property.id}>
                <td>
                  <img src={property.imageUrl} alt={property.title} className="thumbnail" />
                </td>
                <td>{property.title}</td>
                <td>{property.description}</td>
                <td>{property.length}</td>
                <td>{property.breadth}</td>
                <td>{property.city}</td>
                <td>{property.state}</td>
                <td>{property.pincode}</td>
                <td>
                  <div className="button-container">
                    <button className="edit-btn" onClick={() => handleEdit(property.id)}>
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(property.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
