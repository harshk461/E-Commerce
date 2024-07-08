"use client";

import CartItem from "@/app/Utils/CartItem/CartItem";
import Loader from "@/app/Utils/Loader/Loader";
import MiniAddressBox from "@/app/Utils/MiniAddressBox/MiniAddressBox";
import PathHeader from "@/app/Utils/PathHeader/PathHeader";
import useBase from "@/app/hooks/useBase";
import axios from "axios";
import { Tag, Notebook } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddressInterface {
  name: string;
  address: string;
  phone: number;
  pincode: number;
  country: string;
  state: string;
  city: string;
  _id: string;
}

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

export default function CheckOut() {
  const [promoWindow, setPromoWindow] = useState<Boolean | null>(false);
  const [noteWindow, setNoteWindow] = useState<Boolean | null>(null);
  const [orders, setOrders] = useState<CartItemInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [currAddress, setCurrAddress] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [note, setNote] = useState("");
  const [discount, setDiscount] = useState<DiscountInterface>({
    type: "",
    discount: 0,
  });

  const url = useBase();
  const [isClient, setIsClient] = useState(false);
  let token: string | null = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      token = localStorage.getItem("token");
      getAllAddress();
      getOrdersFromCart();
    }
  }, []);

  const getAllAddress = async () => {
    if (!token) return;
    setLoading(true);
    await axios
      .get(url + "/auth/get-address", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setAddresses(res.data);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  const getOrdersFromCart = async () => {
    if (!token) return;
    try {
      await axios
        .get(url + "/auth/get-cart", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setOrders(res.data);
        });
    } catch (e) {
      toast.error("Server Error");
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const item of orders) {
      total += item.price;
    }

    total = total - (discount.discount / 100) * total;

    return total.toFixed(2);
  };

  const applyPromo = async () => {
    await axios
      .get(url + "/order/check-promo/" + promoCode)
      .then((res) => {
        setDiscount({
          type: promoCode.toLocaleUpperCase(),
          discount: res.data.discount,
        });
        setPromoCode("");
        setPromoWindow(false);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  const removeFromCart = async (id: string) => {
    if (!token) return;
    await axios
      .put(
        url + "/auth/remove-from-cart/" + id,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((res) => {
        getOrdersFromCart();
        toast.success(res.data.message);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <PathHeader path="Check-out" />

      <div className="max-w-full w-[1000px] m-auto p-4 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-3 p-3 border-2 border-black rounded-md">
          <h1 className="text-lg font-semibold text-gray-600">
            Select Address
          </h1>
          <div className="w-full flex gap-2 overflow-y-scroll">
            {addresses.map((item, i) => (
              <div
                onClick={() => setCurrAddress(i)}
                className={`w-[200px] p-2 flex flex-col border-2 border-black rounded-lg gap-2 ${
                  i === currAddress && "border-yellow-400"
                }`}
                key={i}
              >
                <h1 className="text-lg font-semibold">{item.name}</h1>
                <h1 className="text-md text-gray-600">
                  {item.address},{item.city},{item.state},{item.country},
                  {item.pincode}
                </h1>
                <h1 className="text-md font-semibold">Phone: {item.phone}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col p-3 border-2 border-black rounded-md">
          <h1 className="text-lg font-semibold text-gray-600">Products</h1>
          {orders.length > 0 &&
            orders.map((item, i) => (
              <CartItem cart={item} key={i} remove={removeFromCart} />
            ))}
        </div>

        <div className="w-full flex flex-col p-3 border-2 border-black rounded-md">
          <h1 className="text-lg font-semibold text-gray-600">Pricing</h1>

          {orders.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center mt-4 text-lg"
            >
              <h1>{item.name}</h1>
              <h1>$ {item.price}</h1>
            </div>
          ))}
          {discount.type !== "" && (
            <div className="flex w-full justify-between items-center mt-4 text-lg">
              <h1>Coupoun ({discount.type})</h1>
              <h1>{discount.discount}%</h1>
            </div>
          )}
          <div className="flex justify-between items-center mt-4 text-lg">
            <h1>Delivery</h1>
            <h1>FREE</h1>
          </div>

          <div className="w-full h-[2px] bg-gray-300 my-[15px]"></div>

          <div className="flex w-full justify-between items-center">
            <h1 className="text-xl">Total</h1>
            <h1 className="text-xl">$ {getTotalAmount()}</h1>
          </div>
        </div>

        <div className="flex flex-col">
          <div
            onClick={() => setPromoWindow(!promoWindow)}
            className="w-fit flex items-center gap-1 cursor-pointer text-blue-400"
          >
            <Tag size={20} />
            Enter a Promo code
          </div>
          {promoWindow && (
            <div className="flex my-4">
              <input
                className="w-full lg:w-[300px] border-2 border-gray-300 px-4 py-2 outline-none"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter Promo Code"
              />
              <button
                onClick={applyPromo}
                className="px-4 py-2 bg-blue-400 text-white font-semibold"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col mt-[10px]">
          <div
            onClick={() => setNoteWindow(!noteWindow)}
            className="flex items-center gap-1 cursor-pointer text-blue-400"
          >
            <Notebook size={20} />
            Add a Note
          </div>
          {noteWindow && (
            <div className="flex flex-col gap-2 my-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="max-w-full w-[400px] h-[150px] border-2 border-gray-300 px-4 py-2 outline-none resize-none rounded-md"
                placeholder="Add Note"
              />
              <button className="w-fit px-6 py-2 bg-blue-400 text-white font-semibold rounded-md">
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-fit m-auto p-6">
        <button className="px-6 py-2 rounded-lg bg-green-500 w-fit m-auto text-white font-semibold">
          Confirm
        </button>
      </div>
      {loading && <Loader />}
    </div>
  );
}
