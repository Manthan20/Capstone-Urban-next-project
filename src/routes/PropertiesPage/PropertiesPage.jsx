// PropertiesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertiesPage.scss';

function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Failed to fetch properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleWishlistToggle = (property) => {
    setWishlist((prevWishlist) => {
      const newWishlist = prevWishlist.includes(property.id) 
        ? prevWishlist.filter(id => id !== property.id) 
        : [...prevWishlist, property.id];

      // Save to local storage
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  if (loading) {
    return <p>Loading properties...</p>;
  }

  return (
    <div className="properties-page">
      <h1>Properties</h1>
      <div className="property-cards">
        {properties.length === 0 ? (
          <p>No properties available.</p>
        ) : (
          properties.map(property => (
            <div className="property-card" key={property.id}>
              <img src={property.imageUrl} alt={property.title} className="property-image" style={{height:"250px", width:"300px"}} />
              <h2 className="property-title">{property.title}</h2>
              <p className="property-description">{property.description}</p>
              <p className="property-details">
                Length: {property.length} m | Breadth: {property.breadth} m
              </p>
              <p className="property-location">
                {property.city}, {property.state}, {property.pincode}
              </p>
              <button 
                className={`wishlist-button ${wishlist.includes(property.id) ? 'active' : ''}`} 
                onClick={() => handleWishlistToggle(property)}
              >
                ♥
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
