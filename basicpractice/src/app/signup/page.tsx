/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email:"",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);  
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
   if(user.username.length !== 0 || user.email.length !== 0 || user.password.length !== 0 || user.firstName.length !== 0 || user.lastName.length !== 0){
     setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user])

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await axios.post("/api/users/signup", user)
      console.log(res.data);
      setUser({
        username:"",
        email:"",
        password:"",
        firstName:"",
        lastName:"",
      });
      toast.success(res.data.message);
      router.push("/login");
    }
    catch(error:unknown){
      console.log(error);
      // toast.error(error.response.data.error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <form className=" border-2 border-white flex flex-col gap-2 p-4"  >
        <div className="flex border justify-center  border-white gap-1">
          <label htmlFor="username">Enter Username</label>
          <input
            value={user.username}
            type="text"
            id="username"
            placeholder="Enter Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div  className="flex border justify-start border-white gap-1">
          <label htmlFor="email">Email</label>
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
        <div  className="flex border justify-center  border-white gap-1">
          <label htmlFor="firstName">Enter firstName</label>
          <input
            value={user.firstName}
            type="text"
            id="firstName"
            placeholder="Enter firstName"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>
        <div  className="flex border justify-center  border-white gap-1">
          <label htmlFor="lastName">Enter lastName</label>
          <input
            value={user.lastName}
            type="text"
            id="lastName"
            placeholder="Enter lastName"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
        <button className="border mt-4 p-2" type="submit" disabled={buttonDisabled} onClick={handleSubmit}>Signup</button> 
      </form>
      {loading ? <p>Loading...</p> : null}
      <Link href="/login">Back to Login Page</Link>
    </div>
  );
}
