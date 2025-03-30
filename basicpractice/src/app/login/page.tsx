/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user.email || !user.password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful:", response.data);
      
      toast.success("Login successful!");
      
      // Use replace instead of push to avoid history issues
      router.replace(`/profile/${response.data.id}`);
    }
    catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.error || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <form className="border-2 border-white flex flex-col gap-2 p-4" onSubmit={handleLogin}>
        <div className="flex border justify-center border-white gap-1">
          <label htmlFor="email">Enter Email</label>
          <input
            value={user.email}
            type="email"
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex border justify-center border-white gap-1">
          <label htmlFor="password">Enter Password</label>
          <input
            value={user.password}
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        
        <button 
          className="border mt-4 p-2" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {loading && <p>Authenticating...</p>}
      <Link href="/signup">Back to SignUp Page</Link>
    </div>
  );
}
