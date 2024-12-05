// PropertiesPage.js
import React, { useEffect, useState } from 'react';
import './PropertiesPage.scss';
import FilterComponent from '../../components/FilterComponent/FilterComponent';

function PropertiesPage() {

  return (
    <div className="properties-page">
      <h1>Properties</h1>
      <FilterComponent allProperties={true}/>
    </div>
  );
}

export default PropertiesPage;