"use client";

import { RootState } from "@/app/store/store";
import AddressBox from "@/app/Utils/AddressBox/AddressBox";
import Loader from "@/app/Utils/Loader/Loader";
import useBase from "@/app/hooks/useBase";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface AddressData {
  _id?: string;
  name: string;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
  phone: string;
}

export default function Address() {
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  const url = useBase();
  const navigate = useRouter();
  const [newAddressWindow, setNewAddressWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const [addressData, setAddressData] = useState<AddressData>({
    address: "",
    name: "",
    city: "",
    country: "india",
    state: indianStates[0],
    pincode: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setAddressData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Convert pinCode and phoneNumber to numbers
      const preparedData = {
        ...addressData,
        pincode: parseInt(addressData.pincode, 10),
        phone: parseInt(addressData.phone, 10),
      };
      console.log(preparedData);
      if (isUpdate) {
        console.log("Update");
      } else {
        const token = localStorage.getItem("token");
        await axios
          .put(url + "/auth/add-address", preparedData, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            toast.success("New Address Added");
            setNewAddressWindow(false);
          });
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAddresses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(url + "/auth/get-address/", {
          headers: { Authorization: "Bearer " + token },
        });
        console.log(response);
        if (response.data === null) {
          return;
        }
        setAddresses(response.data);
      } catch (e: any) {
        toast.error(e.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getAddresses();
  }, [newAddressWindow]);

  return (
    <div className="w-full flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gray-50 py-4 px-6 border-b border-gray-200">
        <h1 className="text-2xl text-center font-bold text-gray-800">My Addresses</h1>
      </div>

      <div className="p-6">
        {!newAddressWindow && addresses && addresses.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((item, i) => (
              <AddressBox
                key={i}
                address_id={item._id}
                name={item.name}
                address={item.address}
                city={item.city}
                state={item.state}
                pinCode={item.pincode}
                phoneNumber={item.phone}
                country={item.country}
                setWindow={setNewAddressWindow}
                setData={setAddressData}
                isUpdate={setIsUpdate}
              />
            ))}
          </div>
        )}

        {!addresses && (
          <div className="flex flex-col items-center justify-center py-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-600 mt-4">
              No Addresses Found
            </h1>
            <p className="text-gray-500 mt-2">Add a new address to get started</p>
          </div>
        )}

        {!newAddressWindow && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                setNewAddressWindow(true);
                const data = {
                  address: "",
                  name: "",
                  city: "",
                  country: "india",
                  state: indianStates[0],
                  pincode: "",
                  phone: "",
                };
                setAddressData(data);
                setIsUpdate(false);
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Address
            </button>
          </div>
        )}

        {newAddressWindow && (
          <form
            action=""
            method="POST"
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  required
                  name="name"
                  value={addressData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  id="address"
                  required
                  name="address"
                  value={addressData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 h-[120px] resize-none"
                  placeholder="Enter your complete address"
                />
                <p className="text-xs text-gray-500 text-right mt-1">
                  {addressData.address.length}/1000
                </p>
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  id="city"
                  required
                  name="city"
                  value={addressData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  type="text"
                  placeholder="Enter city"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  id="state"
                  required
                  name="state"
                  value={addressData.state.toLocaleLowerCase()}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                >
                  {indianStates.map((state) => (
                    <option key={state} value={state.toLocaleLowerCase()}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  id="pincode"
                  required
                  name="pincode"
                  value={addressData.pincode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  type="text"
                  placeholder="Enter pincode"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  id="country"
                  required
                  name="country"
                  value={addressData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                >
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  id="phone"
                  required
                  name="phone"
                  value={addressData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  type="text"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={() => setNewAddressWindow(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
              >
                {isUpdate ? "Update Address" : "Save Address"}
              </button>
            </div>
          </form>
        )}
      </div>
      {loading && <Loader />}
    </div>
  );
}
