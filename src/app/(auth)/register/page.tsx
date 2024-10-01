"use client"

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import { signIn } from "next-auth/react";
const RegisterPage = () => {
  const router = useRouter()
    const [authState,setAuthState] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [loading,setLoading] = useState<boolean>(false)
    const [errors,setErrors] = useState<registrationType>({})
    const submitForm = async () => {
      setLoading(true)
       axios.post('/api/auth/register',authState)
      .then((res)=>{
        setLoading(false)
        const response = res.data
        if(response.status == 200){
          console.log("user signed up")
          router.push(`/login?message=${response.message}`)
        }else if(response?.status == 400){
          setErrors(response?.errors)
        }

      }).catch((err)=>{
        setLoading(false)
        console.log("something went wrong",err)
      })
        console.log("The auth state is",authState)
    }
    const gitsignIn = () => {
      signIn("github",{
        callbackUrl: "/",
        redirect: true
      })
    }
  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-5xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover "
          style={{
            backgroundImage: `url(https://plus.unsplash.com/premium_photo-1664302091622-32248181a4b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        ></div>
        <div className="w-full p-6 lg:w-1/2">
          <h1 className="text-2xl text-gray-600 font-bold text-center">CONNECT WITH US!!!✅ </h1>
          <div  className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="text"
              required
              onChange={(e)=> setAuthState({...authState,name:e.target.value})}
            />
            <span className="text-red-500 font-bold">{errors?.name}</span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
              onChange={(e)=> setAuthState({...authState,email:e.target.value})}
            />
            <span className="text-red-500 font-bold">{errors?.email}</span>
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              onChange={(e)=> setAuthState({...authState,password:e.target.value})}
            />
            <span className="text-red-500 font-bold">{errors?.password}</span>
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
               Confirm Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              onChange={(e)=> setAuthState({...authState,password_confirmation:e.target.value})}
            />
           
          </div>
          <div className="mt-8">
            <button onClick={submitForm} type="button" className= {` text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600  ${loading ? "bg-gray-600" : "bg-black"}`}>
              {loading ? "processing" : "Sign up"}
            </button>
          </div>
          <div className="mt-3 space-y-3">
          <button onClick={gitsignIn} className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-black px-3.5 py-2.5 font-semibold text-white transit duration-200">
            Sign in with Github
          </button>
          </div>
          <div className="mt-4 flex items-center w-full text-center">
            <Link
              href="/login"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Already have an account?
              <span className="text-blue-700">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
