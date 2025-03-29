import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function extractData(request:NextRequest){
    try{
        const token = request.cookies.get("token")?.value || "";
        const data = jwt.verify(token,process.env.JWT_SECRET_KEY!);
        return data;
    }
    catch(error:unknown){
        return error    ;
    }
}