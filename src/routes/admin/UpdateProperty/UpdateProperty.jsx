import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdateProperty.scss';

function UpdateProperty() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState({
    id: '', // ID field for display purposes
    title: '',
    description: '',
    imageUrl: '',
    length: 0,
    breadth: 0,
    city: '',
    state: '',
    pincode: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/properties/${id}`);
        setProperty({ ...response.data, id: response.data.id }); // Include ID for display
      } catch (error) {
        console.error('Error fetching property:', error);
        alert('Failed to fetch property details.');
      }
    };
    fetchProperty();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const numericFields = ['length', 'breadth', 'price', 'bedrooms', 'bathrooms'];
    setProperty({
      ...property,
      [name]: type === 'checkbox' ? checked : numericFields.includes(name) ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/properties/${id}`, {
        ...property,
        userId, // Pass userId explicitly
      });
      alert('Property updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property.');
    }
  };

  return (
    <div className="update-property">
      <h1>Update Property</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(property)
          .filter((key) => !['createdAt', 'updatedAt', 'soldAt', 'userId'].includes(key)) // Exclude unwanted fields
          .map((key) => (
            <React.Fragment key={key}>
              {key === 'id' ? (
                <input
                  type="text"
                  name={key}
                  placeholder="ID"
                  value={property[key]}
                  disabled // Disable the ID field
                />
              ) : typeof property[key] === 'boolean' ? (
                <label>
                  <input
                    type="checkbox"
                    name={key}
                    checked={property[key]}
                    onChange={handleInputChange}
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ) : (
                <input
                  type={typeof property[key] === 'number' ? 'number' : 'text'}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={property[key]}
                  onChange={handleInputChange}
                  required={key !== 'imageUrl'} // Make optional if needed
                />
              )}
            </React.Fragment>
          ))}
        <button type="submit" className="update-btn">Update Property</button>
      </form>
    </div>
  );
}

export default UpdateProperty;
