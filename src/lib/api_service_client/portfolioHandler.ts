import { newTableRow, StockInfo } from "@/src/types/component_type/component_type";
import axiosClient from "../axiosClient"
import { getApiErrorMessage, resCustomType } from "@/src/types/api/resType";



export const getAllStockApi=async()=>{

    try{

       

        const resAllStock:resCustomType=await axiosClient.get('/all')
        console.log("i got the resposne check it ",resAllStock)
        
    return {
      success: resAllStock.data.success,
      data: resAllStock.data.data,
      message:resAllStock.data.message,
      statusCode: resAllStock.statusCode
    };


    }catch(error){

        console.log("error occured in the getAllStockAPi",error)

        
        const data=getApiErrorMessage(error)

         return {
      success: false,
      message: data,
    };
    }
}




export const getLiveMarketDataApi = async (stocks:newTableRow) => {

     

    try {
        // throw new Error("faild")

        const response:resCustomType = await axiosClient.post(
            '/market-data', 
             stocks
        );
        
        return {
            success: response.data.success,
            data: response.data.data,
            message: response.data.message,
            statusCode: response.statusCode
        };
    } catch (error) {
        console.log("error occurred in the getLiveMarketDataApi", error);

        
        const data=getApiErrorMessage(error)

         return {
      success: false,
      message: data,
    };
        
    }
}