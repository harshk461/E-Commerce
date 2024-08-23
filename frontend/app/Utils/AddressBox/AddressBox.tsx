import useBase from "@/app/hooks/useBase";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Pencil, X } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  address_id?: string;
  address: string;
  name: string;
  city: string;
  country: string;
  state: string;
  pinCode: string;
  phoneNumber: string;
  setWindow: Function;
  setData: Function;
  isUpdate: Function;
}

export default function AddressBox({
  address_id,
  address,
  name,
  city,
  country,
  state,
  pinCode,
  phoneNumber,
  setWindow,
  setData,
  isUpdate,
}: Props) {
  const url = useBase();

  const edit = () => {
    setWindow(true);
    const data = {
      address: address,
      name: name,
      city: city,
      country: country,
      state: state,
      pinCode: pinCode,
      phoneNumber: phoneNumber,
    };
    setData(data);
    isUpdate(true);
  };

  const removeAddress = async () => {
    try {
      console.log(address_id);
      const token = localStorage.getItem("token");
      await axios
        .patch(
          url + "/auth/remove-address/" + address_id,
          {},
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          if (res.data.status === "error") {
            toast.error(res.data.message);
            return;
          }
          toast.success("Deleted Successfully");
          setWindow(false);
        });
    } catch (e) {
      toast.error("Server Error");
    } finally {
    }
  };

  return (
    <div className="w-full p-3 md:p-6 border-2 border-gray-300 rounded-md flex justify-between items-start flex-wrap gap-4 mt-4">
      <div className="max-w-full w-[270px] flex flex-col items-start">
        <h1 className="text-xl font-semibold mb-2">{name}</h1>
        <h1>{address}</h1>
        <h1>{`${state}, ${country}`}</h1>
        <h1 className="text-sm text-gray-500">{`Pincode: ${pinCode}`}</h1>
        <h1 className="text-sm text-gray-500">{`Phone: ${phoneNumber}`}</h1>
      </div>

      <div className="flex items-start flex-row gap-2 md:flex-col">
        <h1
          onClick={edit}
          className="text-lg font-semibold underline text-blue-400 flex cursor-pointer"
        >
          <Pencil /> Edit
        </h1>

        <h1
          onClick={removeAddress}
          className="text-lg font-semibold underline text-red-400 flex cursor-pointer"
        >
          <X /> Remove
        </h1>
      </div>
    </div>
  );
}
