/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { dbConfig } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

dbConfig();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {username,email,password,firstName,lastName} = reqBody;
        console.log(reqBody);
        
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error:"User already exists"}, {status:400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        const userCreated = await User.create({
            username,
            password:hashedpassword,
            email,
            firstName,
            lastName,
        })
        const emailResponse = await sendEmail({email,emailType:"VERIFY",userId:userCreated._id});
        return NextResponse.json({message:"User created successfully",userCreated},{status:201});
    }
    catch(error: unknown){
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({error: errorMessage},{status:500});
    }
} 