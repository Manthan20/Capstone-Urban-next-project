// WishlistPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WishlistPage.scss';

function WishlistPage() {
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

  const wishlistProperties = properties.filter(property => wishlist.includes(property.id));

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      <div className="property-cards">
        {wishlistProperties.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistProperties.map(property => (
            <div className="property-card" key={property.id}>
              <img src={property.imageUrl} alt={property.title} className="property-image" />
              <h2 className="property-title">{property.title}</h2>
              <p className="property-description">{property.description}</p>
              <p className="property-details">
                Length: {property.length} m | Breadth: {property.breadth} m
              </p>
              <p className="property-location">
                {property.city}, {property.state}, {property.pincode}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
