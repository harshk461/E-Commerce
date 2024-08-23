"use client";

import OrderBox from "@/app/Utils/OrderBox/OrderBox";
import useBase from "@/app/hooks/useBase";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Order {
  _id?: string;
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  user: User;
  paymentInfo: PaymentInfo;
  paidAt: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  deliveredAt?: string | null;
  createdAt: string;
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  phoneNumber: number;
}

interface OrderItem {
  product: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface User {
  user_id: string;
  name: string;
  email: string;
}

interface PaymentInfo {
  id: string;
  status: string;
}

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([]);
  const url = useBase();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await axios
          .get(url + "/order/get/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.status === "error") {
              toast.error(res.data.message);
              return;
            }
            console.log(res.data);
            setOrders(res.data);
          });
      } catch (e) {
        toast.error("Server Error");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);
  return (
    <div className="w-full p-4 md:p-6 flex flex-col border-2 border-gray-300 rounded-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Orders</h1>
      <div className="w-full flex flex-col gap-2">
        {orders &&
          orders.length > 0 &&
          orders.map((item, i) => <OrderBox key={i} order={item} />)}
      </div>
    </div>
  );
}
