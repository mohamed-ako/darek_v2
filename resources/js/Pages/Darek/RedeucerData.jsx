export const DefaultValues = () => ({
    user_id: "",
});

export const RedeucerData = (state, action) => {
    switch (action.type) {
        case "USER_ADMIN":
            return {
                ...state,
                user_id: action.payload,
            };

        default:
            return state;
    }
};

console.log("my User ID : " + RedeucerData.user_id);

