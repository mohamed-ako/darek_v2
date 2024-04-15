import { createContext, useState } from "react";

export default function InfoPrperty({ children }) {
    const [Sender_user, setSender_user] = useState(2);

    return (
        <div>
            <h1>info.......</h1>
            <SenderUserContext.Provider value={{ Sender_user, setSender_user }}>
                {children}
            </SenderUserContext.Provider>
        </div>
    );
}
export const SenderUserContext = createContext({
    Sender_user: 10,
    setSender_user: () => {}, // Default setter function
});
