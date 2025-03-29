"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { extractData } from "@/helpers/getDataFromToken";
import { useEffect, useState } from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [data,setData] = useState("");
    const getUserDetails = async() => {
        try{
            const request = await axios.get("/api/users/me");
            console.log(request.data.userDetail.username);
            setData(request.data.userDetail.username);
            
        }
        catch(error:unknown){
            console.log(error);
        }
        finally{
            console.log("User Details");
        }
    }
    const handleLogout = async(e:React.FormEvent) => {
        e.preventDefault();
        try{
            const request = await axios.get("/api/users/logout");
            console.log(request.data);
            toast.success("Logged Out");
            router.push("/login");
        }
        catch(error:unknown){
            console.log(error);
        }
        finally{
            console.log("Logged Out");
        }
    }

    useEffect(() => {
        getUserDetails();
        console.log("Inside USEEEFFFE",data);
    },[data])
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
            <h1>Profile Page</h1>
            <p>{data ? data :"Nothing"}</p>
            <button className="p-3 mt-4 bg-blue-400 rounded" onClick={handleLogout}>Log Out</button>
            {/* <button  className="p-3 mt-4 bg-blue-400 rounded" onClick={getUserDetails}>getDetails</button> */}
        </div>
    )

}