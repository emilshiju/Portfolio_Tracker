import axiosClient from "../axiosClient"



export const getAllStockApi=async()=>{

    try{

        const resAllStock=await axiosClient.get('/all')
        console.log("i got the resposne check it ",resAllStock)
        
    return {
      success: resAllStock.data.success,
      data: resAllStock.data.data,
      message:resAllStock.data.message,
      statusCode: resAllStock.status,
    };


    }catch(error){

        console.log("error occured in the getAllStockAPi",error)
    }
}