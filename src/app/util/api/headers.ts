


const HEADERS = {
  defaultHeader: () => ({
    "Content-Type": "application/json; charset=UTF-8",
  }),
  header: () => ({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  }),
  formHeader: () => ({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  }),
  formHeaderNoToken: () => ({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  }),
  jsonHeader: () => ({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  }),
  fileHeader: () => ({
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  }),
};

export const API_URL = {
  
    login: () => ({
      method: "POST",
      headers: HEADERS.header(),
      endPoint: "/api/v1/user",
    }),
    getAllUser:()=>({
        method: "GET",
      headers: HEADERS.header(),
      endPoint: "/api/v1/user",
    }),
    postForm:()=>({
        method: "POST",
      headers: HEADERS.header(),
      endPoint: "/api/v1/form",
    }),
    postNoti:()=>({
        method: "POST",
      headers: HEADERS.header(),
      endPoint: "/api/v1/notification",
    }),

    getNoti:()=>({
        method: "POST",
      headers: HEADERS.header(),
      endPoint: "/api/v1/filter-notification",
    }),
    updateNoti:()=>({
        method: "PUT",
      headers: HEADERS.header(),
      endPoint: "/api/v1/notification",
    }),
    postNotification:()=>({
        method: "POST",
      headers: HEADERS.header(),
      endPoint: "/api/v1/notification",
    }),

};
