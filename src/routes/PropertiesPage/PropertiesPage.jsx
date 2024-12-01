// PropertiesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertiesPage.scss';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import FilterComponent from '../../components/FilterComponent/FilterComponent';

function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/properties');
        setProperties(response.data);
        setFilteredProperties(response.data); // Initialize filtered properties
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Failed to fetch properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);



  if (loading) {
    return <p>Loading properties...</p>;
  }

  return (
    <div className="properties-page">
      <h1>Properties</h1>
      <FilterComponent allProperties={true}/>
    </div>
  );
}

export default PropertiesPage;
