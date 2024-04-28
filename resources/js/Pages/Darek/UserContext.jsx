import React, { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
    user_id: "",
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER_ID":
            return { ...state, user_id: action.payload };
        default:
            return state;
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const setUserId = (userId) => {
        dispatch({ type: "SET_USER_ID", payload: userId });
    };

    return (
        <UserContext.Provider value={{ state, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
