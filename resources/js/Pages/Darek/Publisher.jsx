import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import "./App.css";
import Navbar from "./NavBar";

const Publisher = () => {
    const [formData, setFormData] = useState({
        city: "",
        location: "",
        status: "",
        price: "",
        propertyType: "",
        paymentType: "",
        picture: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Inertia.post("/send-form-data", formData);
            console.log(response);
        } catch (error) {
            console.error("Failed to send form data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <Navbar />
            <div className="publisherForm">
                <h1>Publisher Form</h1>
                <form
                    onSubmit={handleSubmit}
                    action="/send-form-data"
                    encType="multipart/form-data"
                >
                    <div className="formGroup">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Property Type:</label>
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                        >
                            <option value="">Select Property Type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label>Payment Type:</label>
                        <select
                            name="paymentType"
                            value={formData.paymentType}
                            onChange={handleChange}
                        >
                            <option value="">Select Payment Type</option>
                            <option value="Rent per day">Rent per day</option>
                            <option value="Rent per month">
                                Rent per month
                            </option>
                            <option value="Rent per week">Rent per week</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label>Picture:</label>
                        <input
                            type="file"
                            name="picture"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    picture: e.target.files[0],
                                })
                            }
                        />
                    </div>
                    <button type="submit" className="submitButton">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default Publisher;
