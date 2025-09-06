import { allMarketData } from "@/src/controllers/marketData_handler";
import { stockDetails } from "@/src/types/controller_type/controller_type";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {


   try{


        const data :stockDetails = await request.json()

        console.log(data)

        allMarketData(data)





        return NextResponse.json({status:true})

   }catch(error){
    console.log("error occured in the POST request",error)
   }
    
}