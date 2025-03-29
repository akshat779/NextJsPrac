/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault();
    try{
      const request = await axios.post("/api/users/login", user);
      console.log(request.data);
      router.push(`/profile/${request.data.id}`);

    }
    catch(error:unknown){
      console.log(error);
    }
    finally{

    }

  };

 
  const [user, setUser] = useState({
    email: "",
    password: "",
   
  });

  

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <form className=" border-2 border-white flex flex-col gap-2 p-4">
        <div className="flex border justify-center  border-white gap-1">
          <label htmlFor="email">Enter Email</label>
          <input
            value={user.email}
            type="text"
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div  className="flex border justify-center  border-white gap-1">
          <label htmlFor="password">Enter Password</label>
          <input
            value={user.password}
            type="text"
            id="password"
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        
        <button className="border mt-4 p-2" type="submit" onClick={handleLogin}>Login</button>
      </form>
      <Link href="/signup">Back to SignUp Page</Link>
    </div>
  );
}
