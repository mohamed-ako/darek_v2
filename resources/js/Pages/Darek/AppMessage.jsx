import React, { useEffect, useState, useContext, useReducer } from "react";
import { Inertia } from "@inertiajs/inertia";
import MyMessages from "./MyMessages";
import MyChats from "./MyChats";
// import Profile, { SenderUserAdminContext } from "./Profile";
import "./style.css";
import Navbar from "./NavBar";

// import { useUser } from "./UserContext";

// import { DefaultValues, RedeucerData } from "./RedeucerData";
export default function AppMessage({
    conversations,
    adminEmail,
    adminUserId,
    users,
    messagesData,
    conversationIds,
    IdConvers,
    IdAdmin,
}) {
    // const [state, dispatch] = useReducer(RedeucerData, DefaultValues());
    // console.log("User state : => ", state);

    // const { MyUser_id } = state;
    // console.log("User ID : => ", MyUser_id);

    // const { admin_user } = useContext(SenderUserAdminContext);

    // console.log("Admin_user : => : ", admin_user);

    // const { state } = useUser();
    // console.log("User state : => ", state);

    const [ActiveGetMsg, setActiveGetMsg] = useState(false);
    const [exist, setExist] = useState(false);
    const [active, setActive] = useState(false);
    const [messageVal, setMessageVal] = useState("");
    const [User_id, setUser_id] = useState(3);

    const [reloadComponent, setReloadComponent] = useState(false); // State variable to trigger component reload
    console.log("conversations H=> ", conversations);
    console.log("conversationIds H=> ", conversationIds);
    console.log("users H=> ", users);

    useEffect(() => {
        console.log("messagesData : ==> ", messagesData);
    }, [messagesData]);

    // const activeGetMsg = () =>{

    // }
    useEffect(() => {
        console.log("IdConvers : ==> ", IdConvers);
        // alert(IdConvers);
    }, [IdConvers]);
    useEffect(() => {
        console.log("admin email : ", adminEmail);
        console.log("admin user id : ", adminUserId);
    });
    return (
        <>
            <Navbar />
            <div className="chat-app">
                <MyChats
                    conversationIds={conversationIds}
                    users={users}
                    // messages={messagesData}
                    conversations={conversations}
                    adminUserId={adminUserId}
                    onClick={() => {
                        // setActiveGetMsg(true);
                        // setReloadComponent(true);
                    }}
                />
                {/* {ActiveGetMsg && ( */}
                <div>
                    {/* <MyMessages
                        // IdAdmin={IdAdmin}
                        // messagesData={messagesData}
                        onReload={reloadComponent}
                    /> */}
                </div>
                {/* )}  */}
            </div>
        </>
    );
}
