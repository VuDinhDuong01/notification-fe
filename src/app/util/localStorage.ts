
export const getDataFromLS = () => {
    if (typeof window !== "undefined") {
        return  localStorage.getItem("token");
    }
};