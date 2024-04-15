import { useEffect } from "react";
import './style.css'
export default function SearchInfo({ filteredProperties }) {

    console.log('================================>', filteredProperties);
    useEffect(() => {
        console.log('filteredProperties: ', filteredProperties);
      }, [filteredProperties]);
      
    return (
        <div className="search-info-cont">
            <h1>Search List:</h1>

        <div className="search-info">
                {filteredProperties.map(property => (
                    <main className="list-offers" key={property.property_id}>
            <main className="cont-offers">

                        {/* <img src="/images/1" alt="image" /> */}
                        <section>
                        <h4>{property.payment_type}</h4>
                        <p>City : {property.city}</p>
                        <p>location : {property.location}</p>
                        <p>price : {property.price} DH</p>
                        <p>type :{property.property_type}</p>
                        <p>{property.status}</p>
                        </section>
            </main>

                    </main>
                ))}
        </div>
        </div>
    );
}
