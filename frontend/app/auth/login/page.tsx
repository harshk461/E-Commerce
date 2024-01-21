'use client'

import PathHeader from '@/app/Utils/PathHeader/PathHeader'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Login() {
    return (
        <div className='w-full flex flex-col'>
            <PathHeader path={usePathname()} />
            <div className='w-full h-[150px] bg-[url("/cover.jpeg")] bg-cover bg-no-repeat'>
                <div className='w-full h-full bg-black bg-opacity-40 text-center flex justify-center items-center text-white text-xl font-semibold'>
                    Customer Login
                </div>
            </div>

            <div className='w-full lg:px-[200px] px-[30px] py-[30px] flex lg:justify-between items-center lg:items-start flex-col gap-[40px] lg:flex-row'>

                <div className='w-full lg:w-1/2 flex flex-col items-start gap-[20px]'>
                    <div>
                        <h1 className='text-lg font-semibold'>REGISTERED CUSTOMER</h1>
                        <h1 className='text-md text-gray-500'>If you have an account, sign in with your email address.</h1>
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <h1>Email<span className='text-red-400'>*</span></h1>
                        <input
                            type="text"
                            className='w-full px-4 py-2 rounded-md outline-none border-2'
                            placeholder='Enter Email...' />
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <h1>Password<span className='text-red-400'>*</span></h1>
                        <div className='px-4 py-2 rounded-md border-2 flex gap-4'>
                            <input
                                type="password"
                                className='w-full outline-none'
                                placeholder='Enter Password...' />
                            <Eye />
                        </div>
                    </div>


                    <div className='w-full flex items-center justify-between mt-[15px]'>
                        <button
                            className='px-4 py-2 rounded-lg bg-slate-300'>
                            Sign In
                        </button>

                        <Link
                            className='text-gray-600'
                            href={"/auth/forgot-password"}>Forgot Password?</Link>
                    </div>
                </div>

                <div className='w-full lg:w-1/3 flex flex-col gap-4 text-start'>
                    <h1 className='text-xl font-semibold'>New  Customers</h1>
                    <h1>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</h1>

                    <Link
                        href={"/auth/sign-up"}
                        className='px-8 py-2 rounded-xl bg-green-300 w-fit mt-[30px]'>
                        Create New Account
                    </Link>
                </div>

            </div>
        </div>
    )
}
