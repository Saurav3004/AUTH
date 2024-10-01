"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import {signIn} from 'next-auth/react'
const LoginPage = () => {
  const router = useRouter()
  const params = useSearchParams()
    const [authState,setAuthState] = useState({
        email: "",
        password: ""
    })
const [loading,setLoading] = useState<boolean>(false)
const [errors,setErrors] = useState<loginType>({})
    const submitForm = async () => {

        console.log("Login state is",authState)
        setLoading(true)
        axios.post("/api/auth/login",authState)
        .then((res)=>{
          setLoading(false)
          const response = res.data
          if(response.status == 200){
            signIn("credentials",{
              email:authState.email,
              password: authState.password,
              callbackUrl:"/",
              redirect: true
            })
            

          }else if(response?.status == 400){
            setErrors(response?.errors)
            console.log(response)
          }
        }).catch((err)=>{
          setLoading(false)
        console.log("something went wrong",err)
        })
    }

    const gitsignIn = () => {
      signIn("github",{
        callbackUrl: "/",
        redirect: true
      })
    }
  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
         {params.get("message")? <p className="text-xl text-gray-600 text-center bg-green-500 rounded p-2">{params.get("message")}</p> : <p className="text-xl text-gray-600 text-center">Welcome Back!!</p>}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
              onChange={(e)=> setAuthState({...authState,email: e.target.value})}
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
              onChange={(e)=>setAuthState({...authState,password:e.target.value})}
            />
            <span className="text-red-500 font-bold">{errors?.password}</span>
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
            <button onClick={submitForm} className={` text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 ${loading ? "bg-gray-600" : "bg-black"}`}>
              {loading ? "Logging in" : "Login"}
            </button>
          </div>
          <div className="mt-3 space-y-3">
          <button onClick={gitsignIn} className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-black px-3.5 py-2.5 font-semibold text-white transit duration-200">
            Sign in with Github
          </button>
          </div>
          <div className="mt-4 flex items-center w-full text-center">
            <Link
              href="/register"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
