import { getAll } from "@/src/controllers/portfolio_handler";
import { NextResponse } from "next/server";





export async function GET(){

    try{


        console.log("first request came")


        const allStocks=await getAll()

        if(!allStocks){
            return NextResponse.json({success:false,message:"error occured"},{status:400})
        }

        return NextResponse.json({success:true, message: "sucesssfulyy blocked",data:allStocks, },{ status: 200 })


    }catch(error){
        console.log("error occured in the getAll request",error)

        return NextResponse.json({success:false,message:"error occured"},{status:400})

    }

}