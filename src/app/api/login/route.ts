
import { decodeJWT } from "@/app/util/decodeJWT";
import axios from "axios";
import { cookies } from 'next/headers'
export async function POST(request: Request) {
  const res = await request.json();
  const result = await axios.post("http://localhost:8000/api/v1/user", res);
  if (result.data) {

    const decodeToken= decodeJWT(result.data.access_token) as {iat: number,exp: number, user_id: string }
    const expirationDate = new Date(decodeToken.exp * 1000);
    cookies().set({
      name: "token",
      value: result.data.access_token ,
      httpOnly: true,
      path: "/",
      expires: expirationDate,
      sameSite: "lax",
    });

  }
  return Response.json(
    result.data
      ? result.data
      : {
        message: "đã xảy ra lỗi",
        status: 403,
      }
  );
}
