import React, { useState } from 'react';
import { Inertia } from "@inertiajs/inertia";
import './style.css';

const SearchProperty = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [search, setSearch] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  console.log('Received props:', props)

  const moroccoCities = [
    'Al Hoceima', 
    'Nador',
    'Tetouan',
    'Tangier',
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fes',
    'Meknes',
    'Ouarzazate',
    'Tanger',
    'Kenitra',
    'Rabat-Salé',
    // Add more cities as needed
  ];
  const propertyTypes = ['Rent per month', 'Rent per day', 'Rent per week', 'Sale'];

  // Event handler for when the select value changes
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  // Function to handle changes in the progress value
  const handleProgressChange = (event) => {
    setPrice(parseFloat(event.target.value));
  };

  // Function to handle changes in the price value from the number input
  const handlePriceInputChange = (event) => {
    setPrice(parseFloat(event.target.value));
  };
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Send form data to the controller
//     Inertia.post('/properties/search', {
//       query: searchQuery,
//       city: selectedCity,
//       type: selectedType,
//       price: price,
//     });
//   };
// if(filteredProperties){
//   console.log('Filtered properties'+filteredProperties);
// }

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await Inertia.post('/properties/search', {
      query: searchQuery,
      city: selectedCity,
      type: selectedType,
      price: price,
    });
    console.log("Response:", response);

    if (response && response.props && response.props.filteredProperties) {
      setFilteredProperties(response.props.filteredProperties);
    }
  } catch (error) {
    console.error('Error searching:', error);
  }
};


  console.log('Selected type:', selectedType);

  return (
    <div>

<svg onClick={() => setSearch(true)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#f5f5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </g>
</svg>{(search&&(
    <form className='searchproperty' onSubmit={handleSubmit}>
      <h1 style={{color:'red', float:'right',textAlign:'end'}} onClick={()=>setSearch(false)}>X</h1>
      <input className='bigsearch'
        type="text"
        placeholder="Search properties..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
        <option value="">Select a city...</option>
        {/* Map over the array of cities to generate options */}
        {moroccoCities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div>
        <select id="typeSelect" value={selectedType} onChange={handleTypeChange}>
          <option value="">Select a type...</option>
          {propertyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className='price'>
        <label htmlFor="progressInput">Select the price:</label>
        {/* Input element of type "range" */}
        <input
          type="range"
          id="progressInput"
          value={price}
          onChange={handleProgressChange}
          min="0"
          max="100000"
          step="0.01"
        />
        {/* Input element of type "number" */}
        <input
          type="number"
          value={price.toFixed(2)}
          onChange={handlePriceInputChange}
        />
        {/* Display the progress bar */}
        {/* <progress value={price} max="100000"></progress> */}
      </div>
      <button type="submit">Search</button>
    </form>
  ))}
    </div>
  );
};

export default SearchProperty;
