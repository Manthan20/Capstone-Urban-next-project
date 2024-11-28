import React, { useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './FilterComponent.scss';

const FilterComponent = () => {
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handleSearch = async () => {
    // Input validation for numeric fields
    const validMinPrice = minPrice && !isNaN(minPrice) ? minPrice : '';
    const validMaxPrice = maxPrice && !isNaN(maxPrice) ? maxPrice : '';

    try {
      const response = await axios.get('http://localhost:4000/api/properties/filter', {
        params: {
          bedrooms,
          bathrooms,
          state,
          city,
          minPrice: validMinPrice,
          maxPrice: validMaxPrice,
        },
      });

      console.log(response);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error('Error fetching filtered properties:', error);
      alert('Failed to fetch properties.');
    }
  };

  return (
    <div className="filter-component">
      <div className="filters">
        <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
          <option value="">Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4 Bedrooms</option>
        </select>

        <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
          <option value="">Bathrooms</option>
          <option value="1">1 Bathroom</option>
          <option value="2">2 Bathrooms</option>
          <option value="3">3 Bathrooms</option>
        </select>

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="property-results">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
