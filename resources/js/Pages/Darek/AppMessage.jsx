import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import GetMessage from "./GetMessage";
import MyChats from "./MyChats";
import "./style.css";

export default function AppMessage({ messages, conversation_id }) {
    const [ActiveGetMsg, setActiveGetMsg] = useState(false);
    const [exist, setExist] = useState(false);
    const [active, setActive] = useState(false);
    const [messageVal, setMessageVal] = useState("");
    const [User_id, setUser_id] = useState(3);
    const [data, setData] = useState({
        sender_id: User_id,
        receiver_id: 2,
        message: "",
    });
    const [reloadComponent, setReloadComponent] = useState(false); // State variable to trigger component reload
    console.log("conversation_id", conversation_id);
    useEffect(() => {
        console.log("message : ==> ", messages);
    }, [messages]);

    const handleMessage = () => {
        if (messageVal.trim() !== "") {
            const newData = { ...data, message: messageVal };

            Inertia.post("/MessageToUser", newData);

            setReloadComponent(true);
            setExist(false);
            setMessageVal("");
        } else {
            alert("Message cannot be empty!");
        }
    };
    const inputHandler = (e) => {
        // setMessageVal(e.target.value)
        setActive(true);
    };
    // const activeGetMsg = () =>{

    // }

    return (
        <div className="chat-app">
            <MyChats
                conversation_id={conversation_id}
                onClick={() => {
                    setActiveGetMsg(true);
                }}
            />
            {/* {ActiveGetMsg&&( */}
            <div>
                <GetMessage
                    myId={User_id}
                    messages={messages}
                    onReload={reloadComponent}
                />

                <div className={active ? "sender-active" : "sender-place"}>
                    <input
                        value={messageVal}
                        onChange={(e) => {
                            setMessageVal(e.target.value);
                        }}
                        onClick={inputHandler}
                        type="text"
                    />
                    <button onClick={handleMessage}>SEND MESSAGE</button>
                    {active && (
                        <span>
                            <button
                                style={{ backgroundColor: "red" }}
                                onClick={() => {
                                    setActive(false);
                                }}
                            >
                                X
                            </button>
                        </span>
                    )}
                </div>
            </div>

            {/* )} */}
        </div>
    );
}
