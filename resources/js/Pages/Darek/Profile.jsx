import React, {
    useEffect,
    useState,
    useContext,
    createContext,
    useReducer,
} from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Inertia } from "@inertiajs/inertia";
import { useParams } from "react-router-dom";
// import { SenderUserContext } from './SenderUserContext';
import InfoPrperty, { SenderUserContext } from "./InfoPrperty"; // Import the context
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileFavProperty from "./ProfileFavProperty";
import ProfileOffers from "./ProfileOffers";
import AppMessage from "./AppMessage";
import Navbar from "./NavBar";

export const SenderUserAdminContext = createContext({
    admin_user: null,
    setAdmin_user: () => {},
});
console.log("SenderUserAdminContext : => ", SenderUserAdminContext);
export default function Profile({
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
    // const { setUserId } = useUser();
    // useEffect(() => {
    //     setUserId(myusers.id);
    // }, [myusers.id, setUserId]);
    // const { state, dispatch } = useUser();

    // useEffect(() => {
    //     dispatch({ type: "SET_USER_ID", payload: myusers.id });
    // }, [myusers.id, dispatch]);
    // console.log("my User ID : =>  " + state);

    // const [state, dispatch] = useReducer(RedeucerData, DefaultValues());

    // const { Sender_user } = useContext(SenderUserContext);

    // const { setAdmin_user } = useContext(SenderUserAdminContext);
    // const [adminUser, setAdminUser] = useState(null);

    // const senderUserAdminContextValue = {
    //     admin_user: adminUser,
    //     setAdmin_user: setAdminUser,
    // };

    // const { Sender_user } = useContext(SenderUserContext);

    const countP = myoffers.length;
    const user_id = myusers.id;

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

    // useEffect(() => {
    //     if (Sender_user) {
    //         console.log("Sender_user : ", Sender_user);
    //     } else {
    //         console.log("Sender_user is null or undefined");
    //     }
    // }, [Sender_user]);
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

    // const handleLogout = () => {
    //     Inertia.post("/logout");
    // };

    if (updaet_message) {
        alert(updaet_message);
    }
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
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="profile">
                {/* <AppMessage /> */}
                <div className="left">
                    <div
                        className="uploadImage"
                        onClick={() =>
                            document
                                .getElementById("profile_picture_input")
                                .click()
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
                            {/* <button onClick={handleLogout}>Logout</button> */}
                        </main>
                    </div>
                </div>

                <div className="right">
                    {myInfo && (
                        <ProfileUserInfo userInfo={myusers} countP={countP} />
                    )}

                    {myProperty && (
                        <ProfileFavProperty
                            FavProperty={myfvpr}
                            images={images}
                        />
                    )}

                    {myOffers && (
                        <ProfileOffers Offers={myoffers} images={images} />
                    )}
                </div>
            </div>
        </>
    );
}
