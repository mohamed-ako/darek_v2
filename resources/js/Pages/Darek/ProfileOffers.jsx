import React, { useEffect, useState, useContext } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function ProfileOffers({ Offers, images }) {
    const [myProperty, setmyProperty] = useState(false);
    const [myOffers, setmyOffers] = useState(false);
    const [deletePropertyId, setDeletePropertyId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmDeleteFVP, setConfirmDeleteFVP] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleDeleteOffer = async (offerId) => {
        try {
            await Inertia.post("/delete_offer", { type: "offer", id: offerId });
            setConfirmDelete(false); // Close the confirmation modal
            setConfirm(false); // Reset the confirm state
            setSuccess(true); // Set success state
        } catch (error) {
            console.error("Error deleting offer:", error);
            setError(true); // Set error state
        }
    };
    if (success) {
        setTimeout(() => {
            setSuccess(false);
        }, 5000); // Delay changed to 5000 milliseconds (5 seconds)
    }
    const OffersClick = () => {
        alert("Page Info for Offers propery\n is Comming soon.");
    };

    return (
        <div>
            <div>
                <h1>Offers</h1>
                <div className="myofferse">
                    {Offers.map((offer, index) => (
                        <div className="myfavorite" key={index}>
                            <main className="text-container">
                                {images[offer.property_id] &&
                                    images[offer.property_id].length > 0 && (
                                        <img
                                            className="prIMG"
                                            src={
                                                images[offer.property_id][0]
                                                    .image_link
                                            }
                                            alt={`Property Image`}
                                        />
                                    )}
                                <section onClick={OffersClick}>
                                    <h4>{offer.payment_type}</h4>

                                    <p>City: {offer.city}</p>
                                    <p>Price: {offer.price} DH</p>
                                    <p>Property Type: {offer.property_type}</p>
                                    <p>Location: {offer.location}</p>
                                    <p>Status: {offer.status}</p>
                                </section>

                                <div
                                    onClick={() => {
                                        setDeletePropertyId(offer.property_id);
                                        setConfirmDelete(true);
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M10 12V17"
                                                stroke="#b80000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M14 12V17"
                                                stroke="#b80000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M4 7H20"
                                                stroke="#b80000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                                stroke="#b80000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                                stroke="#b80000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </g>
                                    </svg>
                                </div>
                            </main>
                        </div>
                    ))}
                </div>
            </div>
            {success && (
                <div className="success">
                    <h1>Success</h1>
                    <p>The offer has been successfully deleted.</p>
                </div>
            )}
            {error && (
                <div className="error">
                    <h1>Error</h1>
                    <p>Failed to delete the offer. Please try again later.</p>
                </div>
            )}
            {confirmDelete && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this offer?</p>
                        <div>
                            <button onClick={() => setConfirmDelete(false)}>
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleDeleteOffer(deletePropertyId);
                                    setConfirm(true); // Set confirm state to trigger deletion
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {confirm && myOffers && handleDeleteOffer(deletePropertyId)}
        </div>
    );
}
