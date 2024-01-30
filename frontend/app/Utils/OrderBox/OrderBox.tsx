import Link from 'next/link';
import React from 'react'

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


export default function OrderBox({ order }: { order: Order }) {
    const orderDate = new Date(order.createdAt);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(orderDate);
    return (
        <div className='w-full p-4 border-2 border-green-300 rounded-md'>
            <div className='w-full flex justify-between items-center text-sm text-gray-400 font-semibold flex-wrap gap-2'>
                <h1 className='word-break'>Order: {order._id}</h1>
                <h1>Date: {formattedDate}</h1>
            </div>
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 my-4'>
                <h1 className='text-lg md:col-span-2'>Products</h1>
                {order.orderItems.map((item, i) => (
                    <div
                        key={i}
                        className='p-4 border-2 border-gray-400 rounded-md flex md:justify-between items-center flex-wrap justify-center gap-2'>
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
            <Link
                href={"/order/" + order._id}
                className='text-green-800 underline'>Show More Details</Link>
        </div>
    )
}
