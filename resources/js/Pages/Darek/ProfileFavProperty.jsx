import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function ProfileFavProperty({ FavProperty, images }) {
    const [myProperty, setmyProperty] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [deletePropertyId, setDeletePropertyId] = useState(null);
    const [confirmDeleteFVP, setConfirmDeleteFVP] = useState(false);
    const [confirm, setConfirm] = useState(false);

    console.log("FavProperty : ", FavProperty);

    const handleDeleteProperty = async () => {
        try {
            await Inertia.post("/delete_favoret_property", {
                type: "property",
                id: deletePropertyId,
            });
            setConfirmDeleteFVP(false);
            setConfirm(false);
            setSuccess(true); // Set success state
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };
    if (success) {
        setTimeout(() => {
            setSuccess(false);
        }, 5000); // Delay changed to 5000 milliseconds (5 seconds)
    }
    const FavoretClick = () => {
        alert("Page Info for Favoret propery\n is Comming soon.");
    };

    return (
        <div>
            <div>
                <h1>My favorite property</h1>
                <div className="favpropertys">
                    {Object.keys(FavProperty).map((propertyId, index) => (
                        <div className="myfavorite" key={index}>
                            <main className="text-container">
                                {images[FavProperty[propertyId].property_id] &&
                                    images[FavProperty[propertyId].property_id]
                                        .length > 0 && (
                                        <img
                                            className="prIMG"
                                            src={
                                                images[
                                                    FavProperty[propertyId]
                                                        .property_id
                                                ][0].image_link
                                            }
                                            alt={`First Image`}
                                        />
                                    )}
                                <section onClick={FavoretClick}>
                                    <h4>
                                        {FavProperty[propertyId].payment_type}
                                    </h4>

                                    <p>City: {FavProperty[propertyId].city}</p>
                                    <p>
                                        Price: {FavProperty[propertyId].price}{" "}
                                        DH
                                    </p>
                                    <p>
                                        {FavProperty[propertyId].property_type}
                                    </p>
                                    <p>{FavProperty[propertyId].location}</p>
                                    <p>{FavProperty[propertyId].status}</p>
                                </section>
                                <div
                                    onClick={() => {
                                        setDeletePropertyId(
                                            FavProperty[propertyId].property_id
                                        );
                                        setConfirmDeleteFVP(true);
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            stroke-width="0"
                                        ></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <path
                                                d="M10 12V17"
                                                stroke="#b80000"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></path>{" "}
                                            <path
                                                d="M14 12V17"
                                                stroke="#b80000"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></path>{" "}
                                            <path
                                                d="M4 7H20"
                                                stroke="#b80000"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></path>{" "}
                                            <path
                                                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                                stroke="#b80000"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></path>{" "}
                                            <path
                                                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                                stroke="#b80000"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></path>{" "}
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
                    <p>{{ success }}</p>
                </div>
            )}
            {error && (
                <div className="error">
                    <h1>Error</h1>
                    <p>{{ error }}</p>
                </div>
            )}
            {confirmDeleteFVP && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this property?</p>
                        <div>
                            <button onClick={() => setConfirmDeleteFVP(false)}>
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleDeleteProperty(deletePropertyId);
                                    setConfirm(true);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {confirm && myProperty && handleDeleteProperty(deletePropertyId)}
        </div>
    );
}
