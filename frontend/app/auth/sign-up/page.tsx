'use client'

import PathHeader from '@/app/Utils/PathHeader/PathHeader'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SignUp() {
    return (
        <div className='w-full flex flex-col'>
            <PathHeader path={["Auth", "Customer Register"]} />
            <div className='w-full h-[150px] bg-[url("/cover.jpeg")] bg-cover bg-no-repeat'>
                <div className='w-full h-full bg-black bg-opacity-40 text-center flex justify-center items-center text-white text-xl font-semibold'>
                    Customer Register
                </div>
            </div>

            <div className='w-full lg:px-[200px] px-[30px] py-[30px] flex lg:justify-between items-center lg:items-start flex-col gap-[40px] lg:flex-row'>

                <div className='w-full lg:w-1/2 flex flex-col items-start gap-[20px]'>
                    <div>
                        <h1 className='text-lg font-semibold'>SIGN-UP INFORMATION</h1>
                        <h1 className='text-md text-gray-500'>Create new account</h1>
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <h1>Name<span className='text-red-400'>*</span></h1>
                        <input
                            type="text"
                            className='w-full px-4 py-2 rounded-md outline-none border-2'
                            placeholder='Enter Name...' />
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

                    <div className='flex flex-col w-full gap-2'>
                        <h1>Confirm Password<span className='text-red-400'>*</span></h1>
                        <div className='px-4 py-2 rounded-md border-2 flex gap-4'>
                            <input
                                type="password"
                                className='w-full outline-none'
                                placeholder='Confirm Password...' />
                            <Eye />
                        </div>
                    </div>


                    <div className='w-full flex items-center justify-between mt-[15px]'>
                        <button
                            className='px-4 py-2 rounded-lg bg-slate-300'>
                            Sign Up
                        </button>
                        <Link
                            href={"/auth/login"}
                            className='px-4 py-2 rounded-lg bg-green-300'>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
