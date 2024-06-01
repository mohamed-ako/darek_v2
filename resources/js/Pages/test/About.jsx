export default function About() {
    return<div>
        <h1>About Page</h1>
    </div>
}
// import { createContext, useState } from "react";

// export default function InfoPrperty({ User, Property, PropertyImage }) {
    // const [Sender_user, setSender_user] = useState(2);
    console.log(
        "User : ",
        User,
        "||| Property :",
        Property,
        "||| PropertyImage :",
        PropertyImage
    );
    return (
        <div>
            {/* <h1>info.......</h1>
            <SenderUserContext.Provider value={{ Sender_user, setSender_user }}>
                {children}
            </SenderUserContext.Provider> */}
        </div>
    );
// }
// export const SenderUserContext = createContext({
//     Sender_user: 10,
//     setSender_user: () => {
//         Sender_user;
//     },
// });
