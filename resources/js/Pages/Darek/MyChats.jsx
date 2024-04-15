import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import GetMessage from "./GetMessage";

export default function MyChats({ conversation_id }) {
    const [idConvers, setIdConvers] = useState(null);

    useEffect(() => {
        console.log("the conversationId: => " + idConvers);
    }, [idConvers]);
    // This will trigger the effect whenever idConvers changes

    const getAllMessages = (conversationId) => {
        setIdConvers(conversationId);
        Inertia.post("/GetAllMessage", { IdConvers: conversationId }); // Use "IdConvers" instead of "idConvers"
        <GetMessage onReload={true} />

    };

    return (
        <div>
            <h1>My Chats</h1>

            {conversation_id.map((conversation, index) => (
                <ul key={index}>
                    <li onClick={() => getAllMessages(conversation)}>
                        {conversation}
                    </li>
                </ul>
            ))}
        </div>
    );
}
