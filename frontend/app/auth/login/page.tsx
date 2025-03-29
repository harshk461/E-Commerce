"use client";

import Loader from "@/app/Utils/Loader/Loader";
import PathHeader from "@/app/Utils/PathHeader/PathHeader";
import useBase from "@/app/hooks/useBase";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const url = useBase();
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + "/auth/login", data);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate.replace("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col">
      <PathHeader path={usePathname()} />
      <div className='w-full h-[200px] bg-[url("/cover.jpeg")] bg-cover bg-no-repeat bg-center'>
        <div className="w-full h-full bg-black bg-opacity-50 text-center flex justify-center items-center text-white text-2xl font-bold">
          Customer Login
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto lg:px-[100px] px-[30px] py-[50px] flex lg:justify-between items-center lg:items-start flex-col gap-[50px] lg:flex-row">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 flex flex-col items-start gap-[30px] bg-white p-8 rounded-lg shadow-sm"
        >
          <div>
            <h1 className="text-xl font-bold text-gray-800">REGISTERED CUSTOMER</h1>
            <h1 className="text-md text-gray-600 mt-2">
              If you have an account, sign in with your email address.
            </h1>
          </div>
          
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="email" className="font-medium">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md outline-none border-2 border-gray-200 focus:border-indigo-400 transition-colors"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="password" className="font-medium">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="px-4 py-3 rounded-md border-2 border-gray-200 focus-within:border-indigo-400 transition-colors flex items-center gap-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-[15px]">
            <button 
              type="submit" 
              className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>

            <Link 
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors" 
              href={"/auth/forgot-password"}
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        <div className="w-full lg:w-1/3 flex flex-col gap-6 text-start bg-gray-50 p-8 rounded-lg">
          <h1 className="text-xl font-bold text-gray-800">New Customers</h1>
          <p className="text-gray-600">
            By creating an account with our store, you will be able to move
            through the checkout process faster, store multiple shipping
            addresses, view and track your orders in your account and more.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            <h2 className="font-medium">Benefits of creating an account:</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Faster checkout process</li>
              <li>Save multiple shipping addresses</li>
              <li>View and track your orders</li>
              <li>Access to exclusive deals</li>
            </ul>
          </div>

          <Link
            href={"/auth/sign-up"}
            className="px-6 py-3 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors text-center w-full mt-[20px]"
          >
            Create New Account
          </Link>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}
