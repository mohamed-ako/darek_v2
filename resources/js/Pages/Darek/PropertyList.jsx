import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import "./style.css";

const PropertyList = ({ propertiesWithImages }) => {
    const [UserId, setUserId] = useState();

    const infoFunction = async (e) => {
        // alert(e);

        console.log("myid : => ", e);
        // id, city, type
        // const id = 1;
        try {
            await Inertia.post("/info-page", { id: e }); // Sending id, city, and type as part of the request body
        } catch (error) {
            console.error("Error while redirecting to info page:", error);
        }
    };

    return (
        <div className="propertyList">
            {propertiesWithImages.map((property) => (
                <div
                    className="property"
                    key={property.id}
                    onClick={() => {
                        infoFunction(property.property_id);
                        
                    }}
                >
                    <div className="details">
                        <h2>{property.city}</h2>
                        <p>Location: {property.location}</p>
                        <p>Status: {property.status}</p>
                        <p>Price: {property.price}</p>
                        <p>Property Type: {property.property_type}</p>
                        <p>Payment Type: {property.payment_type}</p>
                        <p>Property Id: {property.property_id}</p>

                       
                        <div>
                            {property.images.map((image) => {
                                console.log(
                                    `Property ID: ${property.id}, Image ID: ${image.id}`
                                );
                                return (
                                    <img
                                        key={`${property.id}-${image.id}`}
                                        src={image.image_link}
                                        alt={`Property ${property.id} Image ${image.id}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyList;
