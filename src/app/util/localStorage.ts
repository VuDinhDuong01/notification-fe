
export const getDataFromLS = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("user_id");
    }
    return null;
};