import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Inertia } from "@inertiajs/inertia";
import Navbar from "./NavBar";

const MyMessages = ({ messagesData, onReload, IdConvers, IdAdmin, users }) => {
    const messengerRef = useRef(null); // Reference to the messenger div
    const ulRef = useRef(null); // Reference to the ul element
    const [active, setActive] = useState(false);
    const [messageVal, setMessageVal] = useState("");

    const [receiver, setReceiver] = useState(IdConvers);
    const [receiverName, setReceiverName] = useState(IdConvers); // Initialize with IdConvers
    // Initialize with IdConvers
    const [data, setData] = useState({
        sender_id: IdAdmin,
        receiver_id: IdConvers, // Initialize with IdConvers
        message: "",
    });

    console.log("AdminId : " + IdAdmin);

    useEffect(() => {
        scrollToBottom();
    }, [messagesData]); // Scroll to bottom whenever messages change

    useEffect(() => {
        scrollToBottomOfUl();
    }, []); // Scroll to bottom of ul when the component mounts

    useEffect(() => {
        if (onReload === true) {
            alert("reload");
            window.location.reload();
        }
    }, [onReload]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            receiver_id: receiver,
        }));
    }, [receiver]);

    useEffect(() => {
        // Update receiver name when receiver changes
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === receiver) {
                const receiverName = `${users[i].first_name} ${users[i].last_name}`;
                setReceiverName(receiverName);
                console.log("user name : ", users[i].first_name);
                break; // Break the loop after finding the receiver
            }
        }
    }, [receiver, users]);

    useEffect(() => {
        // Update receiver_id when messagesData changes
        if (messagesData.length > 0) {
            const latestMessage = messagesData[messagesData.length - 1];

            // Check if the sender's ID is not equal to IdAdmin
            const newReceiverId =
                latestMessage.sender_id !== IdAdmin
                    ? latestMessage.sender_id
                    : latestMessage.receiver_id !== IdAdmin
                    ? latestMessage.receiver_id
                    : IdConvers; // If both sender and receiver are IdAdmin, revert to IdConvers

            setReceiver(newReceiverId);
        }
    }, [messagesData, IdAdmin, IdConvers]);

    console.log("receiver : " + receiver);

    const scrollToBottom = () => {
        if (messengerRef.current) {
            messengerRef.current.scrollTop = messengerRef.current.scrollHeight;
        }
    };

    const scrollToBottomOfUl = () => {
        if (ulRef.current) {
            ulRef.current.scrollTop = ulRef.current.scrollHeight;
        }
    };

    const inputHandler = (e) => {
        setActive(true);
    };

    const handleMessage = () => {
        if (messageVal.trim() !== "") {
            const newData = { ...data, message: messageVal };
            Inertia.post("/MessageToUser", newData)
                .then(() => {
                    setMessageVal("");
                    scrollToBottomOfUl(); // Scroll to bottom of ul after sending the message
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
            {/* <Navbar /> */}

            <div className="messenger" ref={messengerRef}>
                <h1>
                    <a href="./AppMessage">{receiverName} </a>
                </h1>
                <ul ref={ulRef}>
                    {messagesData &&
                        messagesData.map((message, index) => (
                            <li
                                key={message.id}
                                className={
                                    message.sender_id === IdAdmin
                                        ? "sender"
                                        : "resiver"
                                }
                            >
                                <h4>{message.message}</h4>
                                <p>
                                    {/* {message.created_at} || */}
                                    id_user : {message.sender_id}
                                </p>
                            </li>
                        ))}
                </ul>
                <div className={"message-place"}>
                    <input
                        value={messageVal}
                        onChange={(e) => setMessageVal(e.target.value)}
                        onClick={inputHandler}
                        type="text"
                        placeholder="Message..."
                    />
                    <button onClick={handleMessage}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                                    stroke="#ffffff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>{" "}
                            </g>
                        </svg>
                    </button>
                    {active && (
                        <span>
                            {/* <button
                            style={{ backgroundColor: "red" }}
                            // onClick={() => setActive(false)}
                        >
                            X
                        </button> */}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyMessages;
