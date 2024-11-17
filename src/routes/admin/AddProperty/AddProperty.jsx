// AddProperty.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import './AddProperty.scss';

function AddProperty() {
  const { role, userId } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProperty, setNewProperty] = useState({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    length: '',
    breadth: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (role === 'admin') {
        try {
          const userResponse = await axios.get('http://localhost:4000/api/users');
          setUsers(userResponse.data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newProperty.id) {
        await axios.put(`http://localhost:4000/api/properties/${newProperty.id}`, {
          ...newProperty,
          userId,
        });
        alert('Property updated successfully!');
      } else {
        await axios.post('http://localhost:4000/api/properties', {
          ...newProperty,
          userId,
        });
        alert('Property added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to save property.');
    }
  };

  const resetForm = () => {
    setNewProperty({
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      length: '',
      breadth: '',
      city: '',
      state: '',
      pincode: '',
    });
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (role !== 'admin') {
    return <h2>Access denied: You do not have permission to view this page.</h2>;
  }

  return (
    <div className="add-property">
      <h1>{newProperty.id ? 'Update Property' : 'Add Property'}</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(newProperty)
          .filter((key) => key !== 'id') // Exclude the 'id' field
          .map((key) => (
            <input
              key={key}
              type={key === 'length' || key === 'breadth' ? 'number' : 'text'}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={newProperty[key]}
              onChange={handleInputChange}
              required
            />
          ))}

        <button type="submit">{newProperty.id ? 'Update Property' : 'Add Property'}</button>
      </form>
    </div>
  );
}

export default AddProperty;
