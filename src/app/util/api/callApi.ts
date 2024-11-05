/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {
  AxiosResponse,
} from "axios";
;



export class validateError extends Error {
  status: number
  error?: any
  constructor({ status, message, error }: { status: number; message: string, error?:any }) {
    super(message);
    this.status = status;
    if(error){
      this.error= error
    }
  }
}
const axiosInstance = axios.create({
  baseURL:"http://localhost:4000",
  timeout: 15000,
  // responseEncoding: "utf8",
  maxRedirects: 5,
  decompress: true,
  headers: {
    "Content-Type": "application/*",
  },
});

// axiosRetry(axiosInstance, {
//   retries: 3,
//   retryDelay: axiosRetry.exponentialDelay,
// });

type apiProps = {
  method: any;
  params?: any;
  data?: any;
  endPoint?: string;
  baseURL?: string;
  headers: any;
};

export const callAPI = async ({
  method,
  params,
  data,
  headers,
  endPoint,
  baseURL = "http://localhost:4000",
}: apiProps): Promise<any> => {
  try {
    const res = await axiosInstance<any>({
      method,
      url: `${endPoint}`,
      params,
      data,
      headers,
      baseURL,
    });
    return res;
  } catch (err: any) {
    if (err.response) {
      const errorResponse = err.response as AxiosResponse<any>;
      const message = errorResponse?.data?.message || "An error occurred";
      const status = errorResponse?.data?.status || "Unknown status";
      const error= errorResponse?.data?.error
      throw new validateError({ message, status,error });
    } else {
      // Trường hợp không có response (lỗi không phải từ API)
      throw new Error("An unexpected error occurred");
    }
  }
};
