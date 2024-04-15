import React, { useEffect, useRef } from "react";
import "./style.css";

const GetMessage = ({ messages, myId, onReload }) => {
    const messengerRef = useRef(null); // Reference to the messenger div

    useEffect(() => {
        if (onReload === true) {
            window.location.reload();
        }
    }, [onReload]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Scroll to bottom whenever messages change

    const scrollToBottom = () => {
        if (messengerRef.current) {
            messengerRef.current.scrollTop = messengerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        console.log("MYID : ", myId);
    }, [myId]);

    return (
        <div className="messenger" ref={messengerRef}>
            <h1>Chat with user-id : </h1>
            <ul>
                {messages.map((message, index) => (
                    <li
                        key={message.id}
                        className={
                            message.sender_id === myId ? "sender" : "resiver"
                        }
                    >
                        <h4>{message.message}</h4>
                        <p>
                            {message.created_at} || id_user : {message.sender_id}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetMessage;
