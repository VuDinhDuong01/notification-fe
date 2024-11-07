/* eslint-disable @typescript-eslint/no-explicit-any */
import { callAPI } from "./callApi"
import { API_URL } from "./headers"

export const  updateNotification=(data: any)=>{
    return callAPI({
        ...API_URL.updateNoti(), data, params:""
    })
}

export const filterNotification=(data: any)=>{
    return callAPI({
        ...API_URL.getNoti(), data, params:""
    })
}

export const postForm=(data: any)=>{
    return callAPI({
        ...API_URL.postForm(), data, params:""
    })
}
export const postNotification=(data: any)=>{
    return callAPI({
        ...API_URL.postNotification(), data, params:""
    })
}