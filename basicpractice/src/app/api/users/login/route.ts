import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConfig } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


dbConfig();

export  async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        console.log(reqBody);
        const {email,password} = reqBody;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400});   
        }

        const userPassword = user.password;
        const isMatch = await bcrypt.compare(password,userPassword);
        if(!isMatch){
            return NextResponse.json({message:"Invalid Credentials"},{status:400});
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,

        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"});
        const response = NextResponse.json({
            message:"User Logged in Successfully",
            status:200,
            success:true,
            id:user._id,
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
      
            
    }
    catch(error:unknown){
        return NextResponse.json({errorMessage:error},{status:500});
    }
}