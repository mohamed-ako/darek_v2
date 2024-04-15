import "./style.css";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function ProfileUserInfo({ userInfo, countP }) {
    const user_id = userInfo.id;
    const [first_name, setFname] = useState(userInfo.first_name || "");
    const [last_name, setLname] = useState(userInfo.last_name || "");
    const [user_name, setUname] = useState(userInfo.username || "");
    const [email, setEmail] = useState(userInfo.email || "");
    const [phone, setPhone] = useState(userInfo.phone || "");
    const [editMode, setEditMode] = useState(false);
    const [myInfo, setmyInfo] = useState(true);
    console.log(userInfo);
    const handleUpdateUser = async () => {
        try {
            const updatedUserData = {
                user_id,
                first_name,
                last_name,
                email,
                user_name,
                phone,
            };
            const response = await Inertia.post(
                "/user_update",
                updatedUserData
            );
            console.log("Update user response:", response); // Log the response
            if (response.data.success) {
                // If the update is successful, update the user data in the state
                // setMyusers(response.data.user);
                setSuccess(response.data.success);
            } else {
                // If there's an error, display the error message
                setError(response.data.error);
            }
        } catch (error) {
            console.error("Error during user update:", error);
        }
        setEditMode(false);
    };

    useEffect(() => {
        if (editMode) {
            // Any logic you want to perform when editMode changes
        }
    }, [editMode]);

    const editval = () => {
        setEditMode(!editMode);
    };

    // if (updaet_message) {
    //     alert(updaet_message);
    // }
    return (
        <div>
            {myInfo && (
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
                                            backgroundColor: "rgb(195, 0, 0)",
                                        }}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button className="edit" onClick={editval}>
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    </table>
                </div>
            )}
        </div>
    );
}
