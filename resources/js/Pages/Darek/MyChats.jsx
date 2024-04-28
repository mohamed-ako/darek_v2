import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import GetMessage from "./MyMessages";

export default function MyChats({
    conversationIds,
    users,
    conversations,
    adminUserId,
    messages,
    messagesData,
}) {
    const [idConvers, setIdConvers] = useState(null);
    const [SearchVal, setSearchVal] = useState();

    useEffect(() => {
        console.log("the conversationId: => " + idConvers);
    }, [idConvers]);

    const getAllMessages = async (conversationId) => {
        setIdConvers(conversationId);
        const response = await Inertia.post("/GetAllMessage", {
            IdConvers: conversationId,
        });
        const { data } = response;
        if (response.ok) {
            Inertia.visit("/MyMessages");
        } else {
            console.error("Failed to get messages:", response);
        }
        // Check if data is received

        // Uncomment the next line if you want to render the GetMessage component
        // return <GetMessage onReload={true} />;
    };
    const sendSearchVal = () => {
        alert("this function is comming soon");
    };

    console.log("users: ", users);
    console.log("messages: ", messages);
    console.log("adminUserId: ", adminUserId);
    console.log("conversations: ", conversations);
    console.log("messagesData: ", messagesData);
    console.log("conversationIds: ", conversationIds);

    return (
        <div className="MyChats">
            <h1>Your conversations list</h1>
            <input
                type="text"
                placeholder="Find a new user to connect"
                value={SearchVal}
                onKeyUp={sendSearchVal}
                onChange={(e) => {
                    setSearchVal(e.target.value);
                }}
            />

            {conversationIds.map((conversationId, index) => {
                const conversation = conversations.find(
                    (conversation) =>
                        conversation.conversation_id === conversationId
                );
                if (!conversation) return null;

                const sender = users.find(
                    (user) => user.id === conversation.sender_id
                );
                const receiver = users.find(
                    (user) => user.id === conversation.receiver_id
                );

                return (
                    <div
                        key={index}
                        onClick={() => getAllMessages(conversationId)}
                    >
                        {/* <h3>Conversation ID: {conversationId}</h3> */}
                        {adminUserId === sender.id ? (
                            <p>
                                <img src="/darek/profile.png" alt="" />
                                {receiver.first_name} {receiver.last_name}
                                {/* <h3>email :{receiver.email}</h3>
                                <h3>phone :{receiver.phone}</h3> */}
                            </p>
                        ) : (
                            <p>
                                <img src="/darek/profile.png" alt="" />
                                {sender.first_name} {sender.last_name}
                                {/* <h3>email :{receiver.email}</h3>
                                <h3>phone :{receiver.phone}</h3> */}
                            </p>
                        )}
                        {/* <p>
                            Sender:{" "}
                            {sender
                                ? `${sender.first_name} ${sender.last_name}`
                                : "Unknown"}
                        </p>
                        <p>
                            Receiver:{" "}
                            {receiver
                                ? `${receiver.first_name} ${receiver.last_name}`
                                : "Unknown"}
                        </p> */}
                    </div>
                );
            })}
        </div>
    );
}
