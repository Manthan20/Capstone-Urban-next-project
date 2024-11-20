import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick"; // Importing react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCar, faKey } from '@fortawesome/free-solid-svg-icons';
import './PropertyDetailsPage.scss';
import PropertyCard from "../../components/PropertyCard/PropertyCard"; 

function PropertyDetailsPage() {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [properties, setProperties] = useState([]); // Add state for newly listed properties
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
        alert('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/properties'); // Fetch all properties
        
        // Filter out sold properties
        const availableProperties = response.data.filter((property) => !property.sold);
        
        // Shuffle the array randomly
        const shuffledProperties = availableProperties.sort(() => Math.random() - 0.5);
        
        // Limit to the first 4 shuffled properties
        const topProperties = shuffledProperties.slice(0, 4);
        
        setProperties(topProperties); // Set the properties state
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Failed to fetch properties.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []); // Fetch newly listed properties only once when component mounts

  
  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  const images = property.imageUrl.split(',');

  // Slider settings with arrows enabled
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // Enable arrows
    nextArrow: <div className="custom-arrow next">▶</div>, // Custom next arrow
    prevArrow: <div className="custom-arrow prev">◀</div>, // Custom prev arrow
  };

  const soldBadgeClass = property.sold ? 'sold-badge sold' : 'sold-badge available';

  return (
    <div className="property-details-page">
      <h1>{property.title}</h1>
      <div className="property-details-container">
        {/* Left Side: Slider */}
        <div className="property-slider">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="slider-image-container">
                <img
                  src={image}
                  alt={`${property.title} - ${index + 1}`}
                  className="slider-image"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Right Side: Property Details */}
        <div className="property-info">
          <p>{property.description}</p>
          <p>
            <strong>Price:</strong> ${property.price.toLocaleString()}
          </p>
          <p>
            <strong>Dimensions:</strong> {property.length} m x {property.breadth} m
          </p>
          <p>
            <strong>Location:</strong> {property.city}, {property.state}, {property.pincode}
          </p>
          <div className="property-features">
            <p><FontAwesomeIcon icon={faBed} /> {property.bedrooms} Bedrooms</p>
            <p><FontAwesomeIcon icon={faBath} /> {property.bathrooms} Bathrooms</p>
            <p><FontAwesomeIcon icon={faCar} /> {property.parking ? 'Parking Available' : 'No Parking'}</p>
            <p><FontAwesomeIcon icon={faKey} /> {property.furnished ? 'Furnished' : 'Unfurnished'}</p>
          </div>
          <p className={soldBadgeClass}>
            <strong>Sold:</strong> {property.sold ? 'Yes' : 'No'}
          </p>
          {property.sold && (
            <p>
              <strong>Sold At:</strong> {new Date(property.soldAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Newly Listed Properties Section */}
      <div className="newly-listed-properties">
        <h2>You may Also Like</h2>
        <div className="property-cards">
          {properties.length === 0 ? (
            <p>No new properties found.</p>
          ) : (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
