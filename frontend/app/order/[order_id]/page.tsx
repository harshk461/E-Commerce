"use client";

import useBase from "@/app/hooks/useBase";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/app/Utils/Loader/Loader";

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
  const { order_id } = useParams();
  const [loading, setLoading] = useState(false);
  const url = useBase();
  const [order, setOrder] = useState<Order>();
  
  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await axios
          .get(url + "/order/get-single/" + order_id, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            if (res.data.status === "error") {
              toast.error(res.data.message);
              return;
            }
            setOrder(res.data);
          });
      } catch (e) {
        toast.error("Server Error");
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, []);

  const orderDate = new Date(order?.createdAt ?? "");
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">ORDER ID</span>
            <h1 className="text-sm font-medium text-gray-700 break-all">{order?._id}</h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">ORDER DATE</span>
            <h1 className="text-sm font-medium text-gray-700">{formattedDate}</h1>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Status</h2>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Current Status:</p>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order?.orderStatus === 'Delivered' 
                ? 'bg-green-100 text-green-800' 
                : order?.orderStatus === 'Shipped' 
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {order?.orderStatus}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Products</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {order?.orderItems.map((item, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-lg flex items-center gap-4 transition-all duration-300 hover:bg-gray-100"
              >
                <img
                  className="w-20 h-20 object-cover rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                    <span>${item.price.toFixed(2)}</span>
                    <span>Qty: {item.quantity}</span>
                    <span className="font-medium text-gray-800">Total: ${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Name</span>
                <span className="font-medium">{order?.shippingInfo.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="font-medium">{order?.shippingInfo.phoneNumber}</span>
              </div>
              <div className="flex flex-col md:col-span-2">
                <span className="text-sm text-gray-500">Address</span>
                <span className="font-medium">{order?.shippingInfo.address}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">City, State</span>
                <span className="font-medium">{order?.shippingInfo.city}, {order?.shippingInfo.state}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Country, Postal Code</span>
                <span className="font-medium">{order?.shippingInfo.country}, {order?.shippingInfo.pinCode}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Payment ID</span>
                <span className="font-medium">{order?.paymentInfo.id}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">Status</span>
                <span className="font-medium text-green-600">{order?.paymentInfo.status}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Items Price:</span>
                <span>${order?.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span>${order?.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span>${order?.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2"></div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${order?.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}
