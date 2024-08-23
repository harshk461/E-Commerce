"use client";

import React, { useEffect, useState } from "react";
import PathHeader from "../Utils/PathHeader/PathHeader";
import { usePathname, useRouter } from "next/navigation";
import CartProductBox from "../Utils/CartProductBox/CartProductBox";
import { Divide, Lock, Notebook, Tag } from "lucide-react";
import axios from "axios";
import useBase from "../hooks/useBase";
import toast from "react-hot-toast";
import CartItem from "../Utils/CartItem/CartItem";

interface CartItemInterface {
  productId?: string;
  name: string;
  price: number;
  quantity?: number;
  image: string;
}

interface DiscountInterface {
  type: string;
  discount: number;
}

export default function Cart() {
  const [orders, setOrders] = useState<CartItemInterface[]>([]);
  const [isClient, setIsClient] = useState(false);
  const url = useBase();

  const navigate = useRouter();

  useEffect(() => {}, []);

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
      setIsClient(true);
      // token = localStorage.getItem("token");
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
      navigate.replace("/");
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const item of orders) {
      total += item.price;
    }

    return total.toFixed(2);
  };

  return (
    <div className="w-full h-fit flex flex-col">
      <PathHeader path={usePathname()} />
      {orders.length != 0 ? (
        <div className="max-w-full w-[1000px] mx-auto py-[100px] px-4 lg:px-0 flex lg:items-start items-center gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 flex flex-col">
            <h1 className="text-lg ">My Cart</h1>
            <div className="w-full h-[2px] bg-gray-300 my-[15px]"></div>
            {orders.length > 0 &&
              orders.map((item, i) => (
                <CartItem cart={item} key={i} remove={removeFromCart} />
              ))}
            <div className="w-full h-[2px] bg-gray-300 my-[15px]"></div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <h1 className="text-lg ">Order Summary</h1>
            <div className="w-full h-[2px] bg-gray-300 my-[15px]"></div>

            {orders.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center mt-4 text-lg"
              >
                <h1>{item.name}</h1>
                <h1>$ {item.price}</h1>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4 text-lg">
              <h1>Delivery</h1>
              <h1>FREE</h1>
            </div>

            <div className="w-full h-[2px] bg-gray-300 my-[15px]"></div>

            <div className="flex w-full justify-between items-center">
              <h1 className="text-xl">Total</h1>
              <h1 className="text-xl">$ {getTotalAmount()}</h1>
            </div>
            <button
              onClick={() => {
                if (orders.length === 0) {
                  // navigate.push("/");
                  toast.error("Cart is empty");
                  return;
                }
                navigate.push("/cart/checkout");
              }}
              className="w-full bg-blue-400 rounded-md outline-none py-2 mt-6 mb-4 text-white font-semibold"
            >
              Checkout
            </button>
            <h1 className="text-center flex justify-center gap-1 text-sm items-center font-bold">
              <Lock size={15} /> Secure Checkout
            </h1>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center py-4 flex-col items-center">
          <img src="/empty-cart.png" alt="" className="w-[300px] h-[300px]" />
          <h1 className="text-lg font-semibold">Cart is Empty</h1>
        </div>
      )}
    </div>
  );
}
