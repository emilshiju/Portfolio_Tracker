import { allMarketData } from "@/src/controllers/marketData_handler";
import { StockInfo } from "@/src/types/component_type/component_type";
import { stockDetails } from "@/src/types/controller_type/controller_type";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {


   try{


        const data :StockInfo[]= await request.json()
        
        console.log("market dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(data)

        const resAllData=await   allMarketData(data)

        if(!resAllData){
          return NextResponse.json({success:false, message: "error while fetching" },{ status: 500 })
        }


        return NextResponse.json({success:true, message: "sucesssfulyy fetched",data:resAllData, },{ status: 200 })



   }catch(error){
    console.log("error occured in the POST request",error)
     return NextResponse.json({success:false, message: "error while fetching" },{ status: 500 })
   }
    
}