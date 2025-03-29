import {extractData} from "@/helpers/getDataFromToken"
import { NextRequest,NextResponse } from "next/server" 
import { dbConfig } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"

dbConfig();

export async function GET(request:NextRequest){
    try{
        const user = await extractData(request);
        const userId = user?.id;
        const userDetail = await User.findById(userId).select("-password");
        return NextResponse.json({userDetail},{status:200});

    }
    catch(error:unknown){
        return NextResponse.json({errorMessage:error},{status:500});
    }
}