
import axios from "axios";
import { cookies } from 'next/headers'
export async function POST(request: Request) {
  const res = await request.json();
  const result = await axios.post("http://localhost:8000/api/v1/user", res);

  if (result.data) {
    cookies().set({
      name: "user_id",
      value: result.data.id ,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 1000,
      expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
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
