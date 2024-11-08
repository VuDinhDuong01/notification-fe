import { jwtDecode } from 'jwt-decode'

export const decodeJWT = (token: string) => {
    if(Boolean(token)){
 return jwtDecode(token)
    }
 
}
