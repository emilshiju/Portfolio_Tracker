
import axios from "axios";



export type ApiErrorResponse = {
  status: boolean ;
  statusCode:number;
  message: string;
  timestamp:number
};


export const getApiErrorMessage = (error: unknown): string => {
  
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    console.log(error.response?.data?.message)
    return  "Something went wrong."
  }

  if (error instanceof Error) {
    console.log(error.message)
  }

  return "Something went wrong.";
};



// export interface resCustomType{

//   success: boolean;
//   data:any;
//   message: string;
//   statusCode: number;
// }


export interface InnerData<T> {
  success: boolean;
  data: T;     
  message: string;
}


export interface resCustomType<T = unknown> {
  success: boolean;
  data: InnerData<T>;
  message: string;
  statusCode: number;
}
