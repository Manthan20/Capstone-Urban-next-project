// AddProperty.js
import React, { useEffect, useState } from 'react';
import './AddProperty.scss';

function AddProperty() {

  return (
    <div className="add-property">
      <h1>{newProperty.id ? 'Update Property' : 'Add Property'}</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(newProperty).map((key) => (
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
