import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import "./style.css";

function AdminProfile({ adminData, properties }) {
    console.log(properties);

    return (
        <div className="admin">
            <h1 className="adminh1">Admin Profile</h1>
            <div className="admin-info">
                <p>
                    <strong>Name:</strong>
                    <span> {adminData.first_name}</span>
                </p>
                <p>
                    <strong>Email:</strong> <span>{adminData.email}</span>
                </p>
                <p>
                    <strong>Username:</strong> <span>{adminData.username}</span>
                </p>
            </div>
            <div className="properties">
                <h1>Properties</h1>
                <ul>
                    {properties.map((property) => (
                        <li id="lip" key={property.id}>
                            <p>City: {property.city}</p>
                            <p>Location: {property.location}</p>
                            <p>Status: {property.status}</p>
                            <p>Price: {property.price}</p>
                            <p>Property Type: {property.property_type}</p>
                            <p>Payment Type: {property.payment_type}</p>
                            <p>
                                Published By:{" "}
                                {property.user
                                    ? `${property.user.first_name} ${property.user.last_name}`
                                    : "Unknown"}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminProfile;
