'use client'

import AddressBox from '@/app/Utils/AddressBox/AddressBox'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface AddressData {
    name: string;
    address: string;
    state: string;
    city: string;
    country: string;
    pinCode: number;
    phone: number;
}

export default function Address() {
    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
        'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
        'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
        'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Lakshadweep', 'Delhi', 'Puducherry'];

    const [newAddressWindow, setNewAddressWindow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [addressData, setAddressData] = useState<AddressData>({
        address: '',
        name: '',
        city: '',
        country: 'india',
        state: indianStates[0],
        pinCode: 0,
        phone: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddressData((pre) => ({
            ...pre,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isUpdate) {
                console.log("Update");
            }
            else {
                console.log("Add");
            }
        }
        catch (e) {
            toast.error("Server Error");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className='w-full flex flex-col border-2 border-gray-200 p-6 rounded-lg'>
            <h1 className='text-2xl text-center font-semibold'>Address</h1>

            {!newAddressWindow && <div className='w-full flex flex-col'>
                <AddressBox
                    setWindow={setNewAddressWindow}
                    setData={setAddressData}
                    isUpdate={setIsUpdate} />
            </div>
            }
            {!newAddressWindow && <button
                onClick={() => {
                    setNewAddressWindow(true);
                    const data = {
                        address: '',
                        name: '',
                        city: '',
                        country: 'india',
                        state: indianStates[0],
                        pinCode: 0,
                        phone: 0,
                    };
                    setAddressData(data);
                    setIsUpdate(false);
                }}
                className='px-6 py-2 bg-green-400 w-fit my-4 rounded-md self-end'>Add New Address</button>}


            {
                newAddressWindow &&
                <form
                    action={""}
                    method='POST'
                    onSubmit={handleSubmit}
                    className='w-full flex flex-col'>
                    <div className='w-full flex flex-col flex-wrap gap-2 my-2'>
                        <h1>Name</h1>
                        <input
                            required
                            name='name'
                            value={addressData.name}
                            onChange={handleChange}
                            className='flex-1 border-2 border-gray-400 rounded-md outline-none px-4 py-2 bg-gray-100'
                            type="text"
                            placeholder='Enter Name'
                        />
                    </div>
                    <div className='w-full flex flex-col mt-2'>
                        <h1>Address</h1>
                        <textarea
                            required
                            name='address'
                            value={addressData.address}
                            onChange={handleChange}
                            className='flex-1 h-[200px] border-2 border-gray-400 rounded-md outline-none px-4 py-2 bg-gray-100 resize-none'
                            placeholder='Enter Address'
                        />
                        <h1 className='text-sm text-gray-400 self-end'>{addressData.address.length + "/1000"}</h1>
                    </div>
                    <div className='w-full flex flex-wrap gap-2 my-2 flex-col md:flex-row'>
                        <div className='flex flex-1 flex-col'>
                            <h1>City</h1>
                            <input
                                required
                                name='city'
                                value={addressData.city}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-400 rounded-md outline-none px-4 py-2 bg-gray-100'
                                type="text"
                                placeholder='Enter City'
                            />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <h1>State</h1>
                            <select
                                required
                                name='state'
                                value={addressData.state}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-400 rounded-md outline-none px-4 py-2 bg-gray-100'>
                                {indianStates.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    <div className='w-full flex flex-wrap gap-2 my-2 flex-col md:flex-row'>
                        <div className='flex flex-1 flex-col'>
                            <h1>Pincode</h1>
                            <input
                                required
                                name='pinCode'
                                value={addressData.pinCode > 0 ? addressData.pinCode : ''}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-400 rounded-md outline-none px-4 py-2 bg-gray-100'
                                type="number"
                                placeholder='Enter Pincode'
                            />
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <h1>Country</h1>
                            <select
                                required
                                name='country'
                                value={addressData.country}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-400 rounded-md outline-none px-4 py-2 bg-gray-100'>
                                <option value='india'>India</option>
                                <option value='usa'>United States</option>
                                <option value='canada'>Canada</option>
                                <option value='uk'>United Kingdom</option>
                            </select>
                        </div>

                        <div className='flex flex-1 flex-col'>
                            <h1>Phone</h1>
                            <input
                                required
                                name='phone'
                                value={addressData.phone > 0 ? addressData.phone : ''}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-400 rounded-md outline-none px-4 py-2 bg-gray-100'
                                type="number"
                                placeholder='Enter Phone'
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center'>
                        <button
                            onClick={() => setNewAddressWindow(false)}
                            className='text-lg font-semibold px-6 py-2 mt-4 bg-green-400 text-white rounded-md'>Back</button>
                        <button
                            type='submit'
                            className='text-lg font-semibold px-6 py-2 mt-4 bg-blue-400 text-white rounded-md'>
                            {isUpdate ? "Update" : "Add New Address"}
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}
