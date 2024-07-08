"use client";

import Loader from "@/app/Utils/Loader/Loader";
import PathHeader from "@/app/Utils/PathHeader/PathHeader";
import { loginUser } from "@/app/actions/authActions";
import useBase from "@/app/hooks/useBase";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import axios from "axios";
import { Eye, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

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
      axios.post(url + "/auth/login", data).then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate.replace("/");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <PathHeader path={usePathname()} />
      <div className='w-full h-[150px] bg-[url("/cover.jpeg")] bg-cover bg-no-repeat'>
        <div className="w-full h-full bg-black bg-opacity-40 text-center flex justify-center items-center text-white text-xl font-semibold">
          Customer Login
        </div>
      </div>

      <div className="w-full lg:px-[200px] px-[30px] py-[30px] flex lg:justify-between items-center lg:items-start flex-col gap-[40px] lg:flex-row">
        <form
          action=""
          method="POST"
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 flex flex-col items-start gap-[20px]"
        >
          <div>
            <h1 className="text-lg font-semibold">REGISTERED CUSTOMER</h1>
            <h1 className="text-md text-gray-500">
              If you have an account, sign in with your email address.
            </h1>
          </div>
          <div className="flex flex-col w-full gap-2">
            <h1>
              Email<span className="text-red-400">*</span>
            </h1>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md outline-none border-2"
              placeholder="Enter Email..."
              required
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <h1>
              Password<span className="text-red-400">*</span>
            </h1>
            <div className="px-4 py-2 rounded-md border-2 flex gap-4">
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="Enter Password..."
                required
              />
              <Eye />
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-[15px]">
            <button type="submit" className="px-4 py-2 rounded-lg bg-slate-300">
              Sign In
            </button>

            <Link className="text-gray-600" href={"/auth/forgot-password"}>
              Forgot Password?
            </Link>
          </div>
        </form>

        <div className="w-full lg:w-1/3 flex flex-col gap-4 text-start">
          <h1 className="text-xl font-semibold">New Customers</h1>
          <h1>
            By creating an account with our store, you will be able to move
            through the checkout process faster, store multiple shipping
            addresses, view and track your orders in your account and more.
          </h1>

          <Link
            href={"/auth/sign-up"}
            className="px-8 py-2 rounded-xl bg-green-300 w-fit mt-[30px]"
          >
            Create New Account
          </Link>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}
