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
        <div className='w-full bg-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 hover:shadow-lg'>
            <div className='w-full flex justify-between items-center flex-wrap gap-2 mb-4 pb-3 border-b border-gray-200'>
                <div className='flex flex-col'>
                    <span className='text-xs text-gray-500'>ORDER ID</span>
                    <h1 className='text-sm font-medium text-gray-700 break-all'>{order._id}</h1>
                </div>
                <div className='flex flex-col items-end'>
                    <span className='text-xs text-gray-500'>ORDER DATE</span>
                    <h1 className='text-sm font-medium text-gray-700'>{formattedDate}</h1>
                </div>
                <div className='flex items-center'>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.orderStatus === 'Shipped' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {order.orderStatus}
                    </span>
                </div>
            </div>
            
            <h2 className='text-lg font-semibold text-gray-800 mb-3'>Products</h2>
            
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                {order.orderItems.map((item, i) => (
                    <div
                        key={i}
                        className='p-4 bg-gray-50 rounded-lg flex items-center gap-4 transition-all duration-300 hover:bg-gray-100'>
                        <img
                            className='w-20 h-20 object-cover rounded-md'
                            src={item.image}
                            alt={item.name}
                        />
                        <div className='flex flex-col flex-grow'>
                            <h3 className='text-md font-semibold text-gray-800'>{item.name}</h3>
                            <div className='flex flex-wrap gap-4 mt-1 text-sm text-gray-600'>
                                <span>${item.price.toFixed(2)}</span>
                                <span>Qty: {item.quantity}</span>
                                <span className='font-medium text-gray-800'>Total: ${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className='flex justify-between items-center'>
                <div className='text-sm font-medium text-gray-700'>
                    Total: <span className='text-lg font-bold text-gray-900'>${order.totalPrice.toFixed(2)}</span>
                </div>
                <Link
                    href={`/order/${order._id}`}
                    className='px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors duration-300'>
                    View Details
                </Link>
            </div>
        </div>
    )
}
