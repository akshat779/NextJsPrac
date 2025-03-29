"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async () => {
    try{
      const res = await axios.post("/api/users/signup", user)
      console.log(res.data);
    }
    catch(error:any){
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <form className=" border-2 border-white flex flex-col gap-2 p-4" onSubmit={handleSubmit}>
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
        <button className="border mt-4 p-2" type="submit">Signup</button>
      </form>
      <Link href="/login">Back to Login Page</Link>
    </div>
  );
}
