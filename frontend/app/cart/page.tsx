'use client'

import React, { useState } from 'react'
import PathHeader from '../Utils/PathHeader/PathHeader'
import { usePathname } from 'next/navigation'
import CartProductBox from '../Utils/CartProductBox/CartProductBox'
import { Lock, Notebook, Tag } from 'lucide-react'

export default function Cart() {

    const [promoWindow, setPromoWindow] = useState<Boolean | null>(false)
    const [noteWindow, setNoteWindow] = useState<Boolean | null>(null)

    return (
        <div className='w-full h-fit flex flex-col'>
            <PathHeader path={usePathname()} />
            <div className='max-w-full w-[1000px] mx-auto py-[100px] px-4 lg:px-0 flex lg:items-start items-center gap-4 flex-col lg:flex-row'>
                <div className='w-full lg:w-2/3 flex flex-col'>
                    <h1 className='text-lg '>My Cart</h1>
                    <div className='w-full h-[2px] bg-gray-300 my-[15px]'></div>
                    <CartProductBox />
                    <CartProductBox />
                    <div className='w-full h-[2px] bg-gray-300 my-[15px]'></div>

                    <div className='flex flex-col'>
                        <div
                            onClick={() => setPromoWindow(!promoWindow)}
                            className='w-fit flex items-center gap-1 cursor-pointer text-blue-400'><Tag size={20} />Enter a Promo code</div>
                        {promoWindow && (
                            <div className='flex my-4'>
                                <input
                                    className='w-full lg:w-[300px] border-2 border-gray-300 px-4 py-2 outline-none'
                                    type="text"
                                    placeholder='Enter Promo Code' />
                                <button className='px-4 py-2 bg-blue-400 text-white font-semibold'>
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col mt-[10px]'>
                        <div
                            onClick={() => setNoteWindow(!noteWindow)}
                            className='flex items-center gap-1 cursor-pointer text-blue-400'><Notebook size={20} />Add a Note</div>
                        {noteWindow && (
                            <div className='flex flex-col gap-2 my-4'>
                                <textarea
                                    className='max-w-full w-[400px] h-[150px] border-2 border-gray-300 px-4 py-2 outline-none resize-none rounded-md'
                                    placeholder='Add Note' />
                                <button className='w-fit px-6 py-2 bg-blue-400 text-white font-semibold rounded-md'>
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className='w-full lg:w-1/3 flex flex-col'>
                    <h1 className='text-lg '>Order Summary</h1>
                    <div className='w-full h-[2px] bg-gray-300 my-[15px]'></div>

                    <div className='flex justify-between items-center mt-4 text-lg'>
                        <h1>Subtotal</h1>
                        <h1>$ 29.00</h1>
                    </div>
                    <div className='flex justify-between items-center mt-4 text-lg'>
                        <h1>Delivery</h1>
                        <h1>FREE</h1>
                    </div>

                    <div className='w-full h-[2px] bg-gray-300 my-[15px]'></div>

                    <div className='flex w-full justify-between items-center'>
                        <h1 className='text-xl'>Total</h1>
                        <h1 className='text-xl'>$ 29.00</h1>
                    </div>
                    <button
                        className='w-full bg-blue-400 rounded-md outline-none py-2 mt-6 mb-4 text-white font-semibold'>
                        Checkout
                    </button>
                    <h1
                        className='text-center flex justify-center gap-1 text-sm items-center font-bold'>
                        <Lock size={15} /> Secure Checkout</h1>
                </div>
            </div>
        </div>
    )
}
