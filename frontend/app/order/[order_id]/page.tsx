'use client'

import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

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
                await axios.get(url + "/order/get-order/" + order_id)
                    .then(res => {
                        if (res.data.status === 'error') {
                            toast.error(res.data.message);
                            return;
                        }
                        console.log(res.data);
                        setOrder(res.data);
                    })
            }
            catch (e) {
                toast.error("Server Error");
            }
            finally {
                setLoading(false);
            }
        }

        getOrder();
    }, [])

    const orderDate = new Date(order?.createdAt ?? '');
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <div className='max-w-full w-[1000px] m-auto flex flex-col p-4'>
            <div className='w-full flex justify-between items-center text-md font-semibold text-gray-400 flex-wrap gap-2'>
                <h1>Order: {order?._id}</h1>
                <h1>Date: {formattedDate}</h1>
            </div>

            <div className='mt-4'>
                <h2 className='text-lg font-semibold mb-2'>Order Details:</h2>

                <div className='flex justify-between'>
                    <p>Status:</p>
                    <p className='text-yellow-400'>{order?.orderStatus}</p>
                </div>
            </div>


            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 my-4'>
                <h1 className='text-xl md:col-span-2 font-semibold underline'>Products</h1>
                {order?.orderItems.map((item, i) => (
                    <div
                        key={i}
                        className='p-4 border-2 border-gray-400 rounded-md flex justify-between items-center'>
                        <img
                            className='w-[100px] h-[100px] object-cover'
                            src={item.image}
                            alt={item.name}
                        />
                        <div className='flex flex-col flex-grow ml-4'>
                            <h1 className='text-lg font-semibold'>{item.name}</h1>
                            <h1>Price: {item.price}</h1>
                            <h1>Quantity: {item.quantity}</h1>
                        </div>
                    </div>
                ))}
            </div>

            <div className='my-[20px] flex flex-col items-start'>
                <h1 className='text-xl md:col-span-2 font-semibold underline'>Shipping Info</h1>
                <div className='flex flex-col items-start mt-[15px] text-lg'>
                    <h1>Name: {order?.shippingInfo.name}</h1>
                    <h1>Address: {order?.shippingInfo.address}</h1>
                    <h1>{order?.shippingInfo.city}, {order?.shippingInfo.state}</h1>
                    <h1>{order?.shippingInfo.country}, {order?.shippingInfo.pinCode}</h1>
                    <h1>Phone: {order?.shippingInfo.phoneNumber}</h1>
                </div>
            </div>

            <div className='my-[20px] flex flex-col items-start'>
                <h1 className='text-xl md:col-span-2 font-semibold underline'>Payment Status</h1>
                <div className='w-full flex items-center justify-between mt-[15px] text-md font-semibold'>
                    <h1>Payement ID: {order?.paymentInfo.id}</h1>
                    <h1 className='text-green-400'>Payment Status: {order?.paymentInfo.status}</h1>
                </div>
            </div>

            <div className='my-[20px] flex flex-col items-start'>
                <h1 className='text-xl md:col-span-2 font-semibold underline'>Payment Status</h1>

                <div className='w-full flex justify-between mt-[15px]'>
                    <p>Items Price:</p>
                    <p>${order?.itemsPrice}</p>
                </div>

                <div className='w-full flex justify-between'>
                    <p>Tax Price:</p>
                    <p>${order?.taxPrice}</p>
                </div>

                <div className='w-full flex justify-between'>
                    <p>Shipping Price:</p>
                    <p>${order?.shippingPrice}</p>
                </div>

                <div className='w-full flex justify-between'>
                    <p>Total Price:</p>
                    <p>${order?.totalPrice}</p>
                </div>
            </div>
        </div>
    )
}
