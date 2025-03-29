import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { dbConfig } from "@/dbConfig/dbConfig";

dbConfig();

export async function POST(request:NextRequest, response:NextResponse){
    try{
        const reqBody = await request.json();
        const {username,email,firstName,lastName} = reqBody;
        console.log(reqBody);
        return response.body(reqBody);
    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500});
    }
} 