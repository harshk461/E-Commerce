"use client";

import React, { useEffect, useState } from "react";
import PathHeader from "../Utils/PathHeader/PathHeader";
import { usePathname, useRouter } from "next/navigation";
import CartItem from "../Utils/CartItem/CartItem";
import axios from "axios";
import useBase from "../hooks/useBase";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

interface CartItemInterface {
  productId?: string;
  name: string;
  price: number;
  quantity?: number;
  image: string;
}

export default function Cart() {
  const [orders, setOrders] = useState<CartItemInterface[]>([]);
  const url = useBase();
  const navigate = useRouter();

  const getOrdersFromCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(url + "/auth/get-cart", {
        headers: { Authorization: "Bearer " + token },
      });
      setOrders(res.data);
    } catch (e) {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getOrdersFromCart();
    }
  }, []);

  const removeFromCart = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.put(
        url + "/auth/remove-from-cart/" + id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      getOrdersFromCart();
      toast.success(res.data.message);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const item of orders) {
      total += item.price * (item.quantity || 1);
    }
    return total.toFixed(2);
  };

  return (
    <div className="w-full flex flex-col">
      <PathHeader path={usePathname()} />
      {orders.length > 0 ? (
        <div className="container mx-auto py-12 px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Cart</h1>
            <div className="space-y-6">
              {orders.map((item, i) => (
                <CartItem cart={item} key={i} remove={removeFromCart} />
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {orders.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-gray-700"
                >
                  <span>{item.name}</span>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-gray-700">
                <span>Delivery</span>
                <span>FREE</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-4"></div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>${getTotalAmount()}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                if (orders.length === 0) {
                  toast.error("Cart is empty");
                  return;
                }
                navigate.push("/cart/checkout");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-6 transition duration-300"
            >
              Checkout
            </button>

            {/* Secure Checkout */}
            <p className="text-center text-sm text-gray-600 mt-4 flex items-center justify-center gap-1">
              <Lock size={16} />
              Secure Checkout
            </p>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <div className="w-full flex flex-col items-center justify-center py-16 space-y-6">
          <img
            src="/empty-cart.png"
            alt="Empty Cart"
            className="w-[250px] h-[250px] object-contain"
          />
          <h1 className="text-xl font-semibold text-gray-800">Your Cart is Empty</h1>
          <p className="text-gray-500">Looks like you haven't added anything yet.</p>
          <button
            onClick={() => navigate.push("/shop")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
          >
            Shop Now
          </button>
        </div>
      )}
    </div>
  );
}
