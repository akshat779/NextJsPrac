"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
   
  });

  const handleSubmit = async () => {};

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
        
        <button className="border mt-4 p-2" type="submit">Login</button>
      </form>
      <Link href="/signup">Back to SignUp Page</Link>
    </div>
  );
}
