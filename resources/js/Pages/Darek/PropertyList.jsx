// PropertyList.js

import React from 'react';
import './style.css';
const PropertyList = ({ propertiesWithImages }) => {
  return (
    <div className="propertyList">
      {propertiesWithImages.map(property => (
        <div className="property" key={property.id}>
            <div className='details'>
          <h2>{property.city}</h2>
          <p>Location: {property.location}</p>
          <p>Status: {property.status}</p>
          <p>Price: {property.price}</p>
          <p>Property Type: {property.property_type}</p>
          <p>Payment Type: {property.payment_type}</p>
          <div>
            </div>
            <div>
              {property.images.map(image => (
                <img key={image.id} src={image.image_link} alt="Property" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
