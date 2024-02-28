'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [curr, setCurr] = useState<Number | null>(null);
    const navigate = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            navigate.replace("/");
            return;
        }
    }, [])
    return (
        <div className='max-w-full w-[1300px] m-auto p-4 lg:p-0 flex gap-4 items-start lg:mt-[100px] mt-[50px]'>
            <div className='w-[350px] border-2 border-gray-300 flex-col hidden md:flex'>
                <button
                    onClick={() => {
                        setCurr(1);
                        navigate.replace("/user/dashboard")
                    }}
                    className={`w-full p-4 text-center font-semibold border-b-2
                     border-b-gray-400 text-md
                     ${curr === 1 && 'bg-blue-400 text-white'}`}>
                    DashBoard</button>
                <button
                    onClick={() => {
                        setCurr(2);
                        navigate.replace("/user/orders")
                    }}
                    className={`w-full p-4 text-center font-semibold border-b-2
                     border-b-gray-400 text-md
                     ${curr === 2 && 'bg-blue-400 text-white'}`}>
                    Orders</button>
                <button
                    onClick={() => {
                        setCurr(3);
                        navigate.replace("/user/address")
                    }}
                    className={`w-full p-4 text-center font-semibold border-b-2
                     border-b-gray-400 text-md
                     ${curr === 3 && 'bg-blue-400 text-white'}`}>
                    Address</button>
                <button
                    onClick={() => {
                        setCurr(4);
                        navigate.replace("/user/account")
                    }}
                    className={`w-full p-4 text-center font-semibold border-b-2
                     border-b-gray-400 text-md
                     ${curr === 4 && 'bg-blue-400 text-white'}`}>
                    Account</button>
                <button
                    onClick={() => {
                        setCurr(5);
                        handleLogout();
                        localStorage.removeItem("token");
                        navigate.replace("/auth/login");
                    }}
                    className={`w-full p-4 text-center font-semibold border-b-2
                     border-b-gray-400 text-md
                     ${curr === 5 && 'bg-blue-400 text-white'}`}>
                    Log Out</button>
            </div>

            <div className='w-full h-full'>
                {children}
            </div>
        </div>
    )
}
