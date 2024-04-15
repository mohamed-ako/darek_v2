import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Inertia } from "@inertiajs/inertia";
import AppMessage from "./AppMessage";
import { useParams } from "react-router-dom";
// import { SenderUserContext } from './SenderUserContext';
import InfoPrperty, { SenderUserContext } from "./InfoPrperty"; // Import the context
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileFavProperty from "./ProfileFavProperty";
import ProfileOffers from "./ProfileOffers";
export default function oldProfile({
    myusers,
    message,
    mydata,
    myproperty,
    myfvpr,
    images,
    myoffers,
    updaet_message,
    // success,
    // error,
}) {
    const { Sender_user } = useContext(SenderUserContext);

    const user_id = myusers.id;
    const countP = myoffers.length;

    const [first_name, setFname] = useState(myusers.first_name || "");
    const [last_name, setLname] = useState(myusers.last_name || "");
    const [user_name, setUname] = useState(myusers.username || "");
    const [email, setEmail] = useState(myusers.email || "");
    const [phone, setPhone] = useState(myusers.phone || "");
    const [editMode, setEditMode] = useState(false);
    const [myInfo, setmyInfo] = useState(true);
    const [myProperty, setmyProperty] = useState(false);
    const [myOffers, setmyOffers] = useState(false);

    const [deletePropertyId, setDeletePropertyId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmDeleteFVP, setConfirmDeleteFVP] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [profilePicture, setProfilePicture] = useState(null); // State to store the selected profile picture
    const [saveButtonVisible, setSaveButtonVisible] = useState(false); // State to control the visibility of the Save button

    // Function to handle profile picture change
    useEffect(() => {
        // Check if Sender_user has a value and alert accordingly
        if (Sender_user) {
            console.log("Sender_user : ", Sender_user);
        } else {
            console.log("Sender_user is null or undefined");
        }
    }, [Sender_user]);
    const setmyInfoFn = () => {
        setmyInfo(true);
        setmyProperty(false);
        setmyOffers(false);
    };

    const setmyPropertyFn = () => {
        setmyInfo(false);
        setmyProperty(true);
        setmyOffers(false);
    };

    const setmyOffersFn = () => {
        setmyInfo(false);
        setmyProperty(false);
        setmyOffers(true);
    };

    const handleLogout = () => {
        Inertia.post("/logout");
    };

    // const handleUpdateUser = async () => {
    //     try {
    //         const updatedUserData = {
    //             user_id,
    //             first_name,
    //             last_name,
    //             email,
    //             user_name,
    //             phone,
    //         };
    //         const response = await Inertia.post(
    //             "/user_update",
    //             updatedUserData
    //         );
    //         console.log("Update user response:", response); // Log the response
    //         if (response.data.success) {
    //             // If the update is successful, update the user data in the state
    //             // setMyusers(response.data.user);
    //             setSuccess(response.data.success);
    //         } else {
    //             // If there's an error, display the error message
    //             setError(response.data.error);
    //         }
    //     } catch (error) {
    //         console.error("Error during user update:", error);
    //     }
    //     setEditMode(false);
    // };

    // useEffect(() => {
    //     if (editMode) {
    //         // Any logic you want to perform when editMode changes
    //     }
    // }, [editMode]);

    // const editval = () => {
    //     setEditMode(!editMode);
    // };

    if (updaet_message) {
        alert(updaet_message);
    }

    // const handleDeleteProperty = async () => {
    //     try {
    //         await Inertia.post("/delete_favoret_property", {
    //             type: "property",
    //             id: deletePropertyId,
    //         });
    //         setConfirmDeleteFVP(false);
    //         setConfirm(false);
    //     } catch (error) {
    //         console.error("Error deleting property:", error);
    //     }
    // };

    // const handleDeleteOffer = async (offerId) => {
    //     try {
    //         await Inertia.post("/delete_offer", { type: "offer", id: offerId });
    //         setConfirmDelete(false); // Close the confirmation modal
    //         setConfirm(false);
    //     } catch (error) {
    //         console.error("Error deleting offer:", error);
    //     }
    // };

    const handleProfilePictureChange = (e) => {
        console.log(e.target.files[0]); // Check if the file is selected properly
        setProfilePicture(e.target.files[0]);
        setSaveButtonVisible(true);
    };

    const saveProfilePicture = async () => {
        try {
            const formData = new FormData();
            formData.append("profile_picture", profilePicture);

            console.log(profilePicture); // Check if profilePicture is set correctly
            console.log(formData); // Check if form data is constructed correctly

            await Inertia.post("/update_profile_picture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSaveButtonVisible(false);

            // Reload the page or update state to reflect the change
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    // const FavoretClick = () => {
    //     alert("Page Info for Favoret propery\n is Comming soon.");
    // };
    // const OffersClick = () => {
    //     alert("Page Info for Offers propery\n is Comming soon.");
    // };

    // console.log("update_user : ", update_user);

    // console.log(mydata);
    // console.log('my myfvpr data : '+myfvpr);
    // console.log("images:" + images);
    // console.log("user_id :" + user_id);

    // console.log("users:" + myusers.first_name);
    // console.log("offers:" + myoffers);

    // console.log(Array.isArray(myusers));

    return (
        <div className="profile">
            <div className="left">
                <div
                    className="uploadImage"
                    onClick={() =>
                        document.getElementById("profile_picture_input").click()
                    }
                >
                    {/* <img
  src={myusers.profile_picture ? `/storage/${myusers.profile_picture}` : "/darek/profile.png"}
  alt="Profile"
/>  */}

                    <img
                        src={
                            myusers.profile_picture
                                ? `data:image/jpeg;base64,${myusers.profile_picture}`
                                : "/darek/profile.png"
                        }
                        alt="Profile"
                    />

                    <input
                        id="profile_picture_input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleProfilePictureChange}
                    />
                </div>

                {saveButtonVisible && (
                    <button onClick={saveProfilePicture}>
                        Save Profile Picture
                    </button>
                )}

                <div>
                    <main className="texts">
                        <h3>
                            {myusers.first_name} {myusers.last_name}
                        </h3>
                        {myusers.publisher ? (
                            <p>You have published {countP} offer(s)</p>
                        ) : (
                            <p>You haven't published any offers yet</p>
                        )}
                    </main>
                    <main>
                        <button onClick={setmyInfoFn}>Information</button>
                        <button onClick={setmyPropertyFn}>Favorite</button>
                        <button onClick={setmyOffersFn}>My Offers</button>
                        <button onClick={handleLogout}>Logout</button>
                    </main>
                </div>
            </div>

            <div className="right">
                {myInfo && (
                    <ProfileUserInfo userInfo={myusers} countP={countP} />
                )}
                {/* {myInfo && (
                    <div className="myinfo">
                        <h1>Information </h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th className="first-th">
                                        <p>First Name</p>
                                    </th>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setFname(e.target.value)
                                            }
                                            value={first_name}
                                            disabled={!editMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setLname(e.target.value)
                                            }
                                            value={last_name}
                                            disabled={!editMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Username</th>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setUname(e.target.value)
                                            }
                                            value={user_name}
                                            disabled={!editMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            value={email}
                                            disabled={!editMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            value={phone}
                                            disabled={!editMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="last-th">Published</th>
                                    <td>
                                        <input
                                            type="text"
                                            value={countP + " offer(s)"}
                                            disabled
                                        />
                                    </td>
                                </tr>
                            </tbody>

                            <tr className="editC">
                                <td colSpan="2">
                                    {editMode ? (
                                        <button
                                            onClick={handleUpdateUser}
                                            style={{
                                                backgroundColor:
                                                    "rgb(195, 0, 0)",
                                            }}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="edit"
                                            onClick={editval}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </table>
                    </div>
                )} */}
                {myProperty && (
                    <ProfileFavProperty FavProperty={myfvpr} images={images} />
                )}
                {/* {myProperty && (
                    <div>
                        <h1>My favorite property</h1>
                        <div className="favpropertys">
                            {Object.keys(myfvpr).map((propertyId, index) => (
                                <div className="myfavorite" key={index}>
                                    <main className="text-container">
                                        {images[
                                            myfvpr[propertyId].property_id
                                        ] &&
                                            images[
                                                myfvpr[propertyId].property_id
                                            ].length > 0 && (
                                                <img
                                                    className="prIMG"
                                                    src={
                                                        images[
                                                            myfvpr[propertyId]
                                                                .property_id
                                                        ][0].image_link
                                                    }
                                                    alt={`First Image`}
                                                />
                                            )}
                                        <section onClick={FavoretClick}>
                                            <h4>
                                                {
                                                    myfvpr[propertyId]
                                                        .payment_type
                                                }
                                            </h4>

                                            <p>
                                                City: {myfvpr[propertyId].city}
                                            </p>
                                            <p>
                                                Price:{" "}
                                                {myfvpr[propertyId].price} DH
                                            </p>
                                            <p>
                                                {
                                                    myfvpr[propertyId]
                                                        .property_type
                                                }
                                            </p>
                                            <p>{myfvpr[propertyId].location}</p>
                                            <p>{myfvpr[propertyId].status}</p>
                                        </section>
                                        <div
                                            onClick={() => {
                                                setDeletePropertyId(
                                                    myfvpr[propertyId]
                                                        .property_id
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
                )}
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
                )} */}

                {myOffers && (
                    <ProfileOffers Offers={myoffers} images={images} />
                    // <div>
                    //     <h1>Offers</h1>
                    //     <div className="myofferse">
                    //         {myoffers.map((offer, index) => (
                    //             <div className="myfavorite" key={index}>
                    //                 <main className="text-container">
                    //                     {images[offer.property_id] &&
                    //                         images[offer.property_id].length >
                    //                             0 && (
                    //                             <img
                    //                                 className="prIMG"
                    //                                 src={
                    //                                     images[
                    //                                         offer.property_id
                    //                                     ][0].image_link
                    //                                 }
                    //                                 alt={`Property Image`}
                    //                             />
                    //                         )}
                    //                     <section onClick={OffersClick}>
                    //                         <h4>{offer.payment_type}</h4>

                    //                         <p>City: {offer.city}</p>
                    //                         <p>Price: {offer.price} DH</p>
                    //                         <p>
                    //                             Property Type:{" "}
                    //                             {offer.property_type}
                    //                         </p>
                    //                         <p>Location: {offer.location}</p>
                    //                         <p>Status: {offer.status}</p>
                    //                     </section>

                    //                     <div
                    //                         onClick={() => {
                    //                             setDeletePropertyId(
                    //                                 offer.property_id
                    //                             );
                    //                             setConfirmDelete(true);
                    //                         }}
                    //                     >
                    //                         <svg
                    //                             viewBox="0 0 24 24"
                    //                             fill="none"
                    //                             xmlns="http://www.w3.org/2000/svg"
                    //                         >
                    //                             <g id="SVGRepo_iconCarrier">
                    //                                 <path
                    //                                     d="M10 12V17"
                    //                                     stroke="#b80000"
                    //                                     stroke-width="2"
                    //                                     stroke-linecap="round"
                    //                                     stroke-linejoin="round"
                    //                                 ></path>
                    //                                 <path
                    //                                     d="M14 12V17"
                    //                                     stroke="#b80000"
                    //                                     stroke-width="2"
                    //                                     stroke-linecap="round"
                    //                                     stroke-linejoin="round"
                    //                                 ></path>
                    //                                 <path
                    //                                     d="M4 7H20"
                    //                                     stroke="#b80000"
                    //                                     stroke-width="2"
                    //                                     stroke-linecap="round"
                    //                                     stroke-linejoin="round"
                    //                                 ></path>
                    //                                 <path
                    //                                     d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                    //                                     stroke="#b80000"
                    //                                     stroke-width="2"
                    //                                     stroke-linecap="round"
                    //                                     stroke-linejoin="round"
                    //                                 ></path>
                    //                                 <path
                    //                                     d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    //                                     stroke="#b80000"
                    //                                     stroke-width="2"
                    //                                     stroke-linecap="round"
                    //                                     stroke-linejoin="round"
                    //                                 ></path>
                    //                             </g>
                    //                         </svg>
                    //                     </div>
                    //                 </main>
                    //             </div>
                    //         ))}
                    //     </div>
                    // </div>
                )}

                {/* {confirmDeleteFVP && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Confirm Delete</h2>
                            <p>
                                Are you sure you want to delete this property?
                            </p>
                            <div>
                                <button
                                    onClick={() => setConfirmDeleteFVP(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setConfirm(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* {confirmDelete && (
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
                                        setConfirm(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* {confirm && myProperty && handleDeleteProperty()} */}

                {/* {confirm && myOffers && handleDeleteOffer(deletePropertyId)} */}
            </div>
        </div>
    );
}
