// DarekHome.js
import './style.css';
import React from 'react';
import {useEffect}  
    from'react';
import { usePage } from '@inertiajs/inertia-react';
import PropertyList from './PropertyList'; // Assuming you have placed PropertyList.js in the same directory
import SearchProperty from './SearchProperty';
import SearchInfo from './SearchInfo';

const Home = ({propertiesWithImages}) => {
  useEffect(() => {
    console.log('Filtered Properties:', filteredProperties);
    console.log('Properties with Images:', propertiesWithImages);
}, [filteredProperties, propertiesWithImages]);

return (
    <div className='HomrProperty'>
      <SearchProperty/>
        {/* {filteredProperties?( */}
      <SearchInfo filteredProperties={filteredProperties} />
         {/* ):(    */}
      <div className='list-group'>
        <PropertyList propertiesWithImages={propertiesWithImages} />
      </div>
        {/* )}  */}

    </div>
  );
};

export default Home;
