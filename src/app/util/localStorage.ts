

const checkEnvironment= window !== undefined


export const getDataFromLS=()=>{
    return checkEnvironment &&  localStorage.getItem("user_id")
}