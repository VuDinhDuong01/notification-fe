
'use client'
const checkEnvironment=typeof window !== undefined


export const getDataFromLS=()=>{
    return checkEnvironment &&  localStorage.getItem("user_id")
}