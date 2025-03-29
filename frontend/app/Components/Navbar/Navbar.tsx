/* eslint-disable react/no-unescaped-entities */
"use client";

import useBase from "@/app/hooks/useBase";
import { setToken } from "@/app/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Menu, Search, ShoppingCart, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartItemInterface {
  productId?: string;
  name: string;
  price: number;
  quantity?: number;
  image: string;
}

export default function Navbar() {
  const [open, setOpen] = useState<Boolean | null>(null);
  const navigate = useRouter();
  const url = useBase();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    try {
      const t = localStorage.getItem("token");
      if (t) dispatch(setToken(t));
    } catch (e) {
      toast.error("Server Error");
    }
  }, [dispatch, token]);

  return (
    <div className="relative w-full shadow-sm">
      {/*Navbar header*/}
      <div className="w-full flex justify-between items-center py-5 px-8 bg-white">
        <div className="flex flex-col">
          <Link href={"/"} className="text-2xl font-bold text-indigo-700 hover:text-indigo-800 transition-colors">
            BESTIES
          </Link>
          <p className="text-md text-gray-600">A Pet's Favorite Place</p>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="border-2 border-indigo-200 rounded-full px-5 py-2 flex gap-2 hover:border-indigo-400 transition-colors">
            <input
              type="text"
              className="outline-none bg-transparent w-64"
              placeholder="Search for products..."
            />
            <Search size={20} className="text-indigo-600 cursor-pointer" />
          </div>

          <div className="px-4 py-2 h-full flex flex-col text-center">
            <h1 className="text-xl font-semibold text-gray-800">Call Us</h1>
            <p className="text-indigo-600 font-medium">123-456-7890</p>
          </div>
        </div>

        <div className="lg:hidden border-2 rounded-lg p-2 w-fit hover:bg-gray-100 transition-colors">
          <Menu onClick={() => setOpen(true)} className="text-indigo-700" />
        </div>
      </div>

      <div className="hidden lg:block w-full bg-indigo-50">
        <div className="container mx-auto flex items-center py-4 justify-between px-8">
          <div className="flex gap-8 text-sm font-semibold">
            <Link href={"/shop"} className="text-gray-700 hover:text-indigo-700 transition-colors">SHOP ALL</Link>
            <Link href={"/shop/dogs"} className="text-gray-700 hover:text-indigo-700 transition-colors">DOGS</Link>
            <Link href={"/shop/cats"} className="text-gray-700 hover:text-indigo-700 transition-colors">CATS</Link>
            <Link href={"/shop/birds"} className="text-gray-700 hover:text-indigo-700 transition-colors">BIRDS</Link>
            <Link href={"/shop/fish"} className="text-gray-700 hover:text-indigo-700 transition-colors">FISH</Link>
            <Link href={"/shop/small-animal"} className="text-gray-700 hover:text-indigo-700 transition-colors">SMALL ANIMALS</Link>
            <Link href={"/shop/reptiles"} className="text-gray-700 hover:text-indigo-700 transition-colors">REPTILES</Link>
            <Link href={"/contact"} className="text-gray-700 hover:text-indigo-700 transition-colors">CONTACT</Link>
          </div>

          {token ? (
            <div className="flex gap-5 text-md font-semibold items-center">
              <div
                onClick={() => navigate.replace("/user")}
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-700 transition-colors"
              >
                <UserCircle size={36} className="text-indigo-600" />
              </div>
              <Link href={"/cart"} className="relative">
                <ShoppingCart className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition-colors" size={32} />
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
              </Link>
            </div>
          ) : (
            <Link 
              className="text-lg font-semibold px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors" 
              href={"/auth/login"}>
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed lg:hidden left-0 top-0 w-full h-screen z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300
        ${open === true ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        ${open === null && "hidden"}`}
      >
        <div className={`w-3/4 md:w-1/2 h-full bg-white p-6 flex flex-col gap-6 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center">
            <Link href={"/"} className="text-xl font-bold text-indigo-700">
              BESTIES
            </Link>
            <X
              size={32}
              className="text-gray-700 hover:text-indigo-700 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="w-full px-4 py-3 rounded-xl border border-indigo-200 flex bg-white">
            <input
              type="text"
              className="w-full bg-white outline-none"
              placeholder="Search products..."
            />
            <Search className="text-indigo-600" />
          </div>

          <div className="flex flex-col gap-4 text-md w-full font-medium">
            <Link href={"/shop"} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-700">SHOP ALL</Link>
            <Link href={"/shop/dogs"} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-700">DOGS</Link>
            <Link href={"/shop/cats"} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-700">CATS</Link>
            <Link href={"/shop/birds"} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-700">BIRDS</Link>
            <Link href={"/shop/fish"} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-700">FISH</Link>
            <Link href={"/shop/small-animal"} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-700">SMALL ANIMALS</Link>
            <Link href={"/shop/reptiles"} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-700">REPTILES</Link>
            <Link href={"/contact"} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-700">CONTACT</Link>
          </div>

          <div className="mt-auto">
            {token ? (
              <div className="flex gap-4 items-center">
                <Link href={"/user"} className="flex items-center gap-2 text-gray-700">
                  <UserCircle size={24} />
                  <span>My Account</span>
                </Link>
                <Link href={"/cart"} className="flex items-center gap-2 text-gray-700">
                  <ShoppingCart size={24} />
                  <span>Cart</span>
                </Link>
              </div>
            ) : (
              <Link
                href={"/auth/login"}
                className="w-full py-3 bg-indigo-600 text-white text-center rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
