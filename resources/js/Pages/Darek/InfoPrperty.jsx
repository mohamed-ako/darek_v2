import "./style.css";
import Navbar from "./NavBar";
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function InfoPrperty({
    User,
    Property,
    PropertyImage,
    IdAdmin,
}) {
    const [messageVal, setMessageVal] = useState("");
    console.log(Property);
    const handleSendMessage = (event) => {
        event.preventDefault();

        if (messageVal.trim() !== "") {
            const data = {
                sender_id: IdAdmin,
                receiver_id: User.id,
                message: messageVal,
            };

            Inertia.post("/sendMessage", data)
                .then(() => {
                    setMessageVal("");
                    alert("Message sent successfully!");
                })
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
        } else {
            alert("Message cannot be empty!");
        }
    };

    return (
        <>
            <Navbar />

            <div className="info-property-container">
                <h1>Property Information</h1>

                <div className="info-table user">
                    <h2>PUBLISHER : </h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{User.first_name}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{User.last_name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{User.email}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{User.username}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>
                                    {User.phone} {User.id}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="send-message">
                        <h2>Send a Message</h2>
                        <form onSubmit={handleSendMessage}>
                            <textarea
                                value={messageVal}
                                onChange={(e) => setMessageVal(e.target.value)}
                                placeholder="Write your message here"
                                required
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>

                <div className="info-table property">
                    <h2>Property Details</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>City</th>
                                <td>{Property.city}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{Property.location}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{Property.status}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{Property.price}</td>
                            </tr>
                            <tr>
                                <th>Property Type</th>
                                <td>{Property.property_type}</td>
                            </tr>
                            <tr>
                                <th>Payment Type</th>
                                <td>{Property.payment_type}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="info-table imgs">
                    <h2>Property Images</h2>
                    <div className="property-images">
                        {PropertyImage.map((image) => (
                            <img
                                key={image.image_id}
                                src={image.image_link}
                                alt={`Property ${Property.property_id}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="description">
                    <h2>Description : </h2>
                    <p>{Property.description}</p>
                </div>
            </div>
        </>
    );
}
