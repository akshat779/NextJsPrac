"use client"
import { NextRequest,NextResponse  } from "next/server";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmail(){
    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);

    const verifyUserEmail = async()=> {
        try{
           await axios.post("/api/users/verifyemail",{token})
           setVerified(true)
        }
        catch(error){
            console.log(error);
        }
    } 

    useEffect(()=> {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        setToken(token || "")
    },[])
    
    useEffect(()=> {
        if (token.length > 0)
        verifyUserEmail()
    },[token])

    return(
        <div>
            {verified ? (
                <div>
                    <h1>Email Verified Successfully</h1>
                    <Link href="/login">Login</Link>
                </div>
            ):(
                <h1>Verifying Email...</h1>
            )}
        </div>
    )
}