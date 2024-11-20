// PropertiesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertiesPage.scss';
import PropertyCard from '../../components/PropertyCard/PropertyCard';

function PropertiesPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [listening, setListening] = useState(false);

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


  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query)
    );
    setFilteredProperties(filtered);
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setSearchQuery(transcript);

      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(transcript) ||
          property.description.toLowerCase().includes(transcript) ||
          property.city.toLowerCase().includes(transcript)
      );
      setFilteredProperties(filtered);
    };

    recognition.start();
  };

  if (loading) {
    return <p>Loading properties...</p>;
  }

  return (
    <div className="properties-page">
      <h1>Properties</h1>
      {/* Search Bar with Microphone */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button
          className="voice-button"
          onClick={startVoiceRecognition}
          aria-label="Start voice search"
        >
          🎙️
        </button>
      </div>
      <div className="property-cards">
        {filteredProperties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          filteredProperties.map((property) => (
            <PropertyCard property={property}/>
          ))
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
