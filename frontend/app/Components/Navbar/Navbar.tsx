'use client'

import CartItem from '@/app/Utils/CartItem/CartItem';
/* eslint-disable react/no-unescaped-entities */
import { ChevronRight, Cross, Menu, Search, ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
    const [open, setOpen] = useState<Boolean | null>(null);
    const [cart, setCart] = useState<Boolean | null>(null);
    return (
        <div className='relative w-full '>
            {/*Navbar header*/}
            <div className='w-full flex justify-between items-center py-4 px-6'>
                <div className='flex flex-col'>
                    <Link
                        href={"/"}
                        className='text-xl font-semibold'>BESTIES</Link>
                    <p className='text-md text-gray-500'>A Pet's Favorite Place</p>
                </div>

                <div className='hidden lg:flex items-center gap-4'>
                    <div className='border-2 rounded-3xl px-4 py-2 flex gap-2'>
                        <input
                            type="text"
                            className='outline-none bg-transparent'
                            placeholder='Search' />
                        <Search size={20} />
                    </div>

                    <div className='px-4 py-2 h-full flex flex-col text-center'>
                        <h1 className='text-xl font-semibold'>Call Us</h1>
                        <p>123-456-7890</p>
                    </div>
                </div>

                <div className='lg:hidden border-2 rounded-lg p-2 w-fit'>
                    <Menu
                        onClick={() => setOpen(true)} />
                </div>
            </div>

            <div className='hidden lg:w-full lg:flex items-center py-8 border-t-2 border-t-black justify-between px-6'>
                <div className='flex gap-6 text-sm font-semibold'>
                    <Link href={"/shop"}>SHOP ALL</Link>
                    <Link href={"/shop/dogs"}>DOGS</Link>
                    <Link href={"/shop/cats"}>CATS</Link>
                    <Link href={"/shop/birds"}>BIRDS</Link>
                    <Link href={"/shop/fish"}>FISH</Link>
                    <Link href={"/shop/small-animal"}>SMALL ANIMALS</Link>
                    <Link href={"/shop/reptiles"}>REPTILES</Link>
                    <Link href={"/contact"}>CONTACT</Link>
                </div>

                <div className='flex gap-4 text-md font-semibold'>
                    <button
                        onClick={() => setCart(true)}
                        className='relative'>
                        <ShoppingCart size={35} />
                        <p className='absolute -top-3 left-[20px] bg-slate-400 p-1 rounded-full '>0</p>
                    </button>

                    <Link href={"/auth/login"}>Login</Link>
                </div>
            </div>

            {/* Menu */}
            <div className={`fixed lg:hidden left-0 top-0 w-full h-screen flex-col z-50 bg-gray-600 bg-opacity-55
    ${open === true && 'windowO flex'}
    ${open === false && 'windowC'}
    ${open === null && 'hidden'}`}>
                <div className='w-full md:w-1/2 h-full flex flex-col gap-4 p-4 text-black self-end items-end'>
                    <div>
                        <X
                            size={50}
                            className='p-2 rounded-lg border-2 border-black bg-white'
                            onClick={() => setOpen(false)} />
                    </div>

                    <div className='text-lg font-semibold px-4 py-2 bg-teal-400 rounded-lg'>
                        <Link href={"/"}>Login</Link>
                    </div>

                    <div className='w-full px-4 py-2 rounded-xl border-2 flex bg-white'>
                        <input
                            type="text"
                            className='w-full bg-white outline-none'
                            placeholder='Search' />
                        <Search />
                    </div>

                    <div className='flex flex-col gap-6 text-sm items-center w-full text-white font-semibold'>
                        <Link href={"/shop"}>SHOP ALL</Link>
                        <Link href={"/shop/dogs"}>DOGS</Link>
                        <Link href={"/shop/cats"}>CATS</Link>
                        <Link href={"/shop/birds"}>BIRDS</Link>
                        <Link href={"/shop/fish"}>FISH</Link>
                        <Link href={"/shop/small-animals"}>SMALL ANIMALS</Link>
                        <Link href={"/shop/reptiles"}>REPTILES</Link>
                        <Link href={"/contact"}>CONTACT</Link>
                    </div>
                </div>
            </div>

            {/* Cart */}
            <div className={`fixed top-0 right-0 max-w-full w-[400px] h-screen
  flex flex-col bg-gray-600 bg-opacity-65 shadow-xl shadow-black overflow-y-auto
  ${cart === true && 'windowO flex'}
  ${cart === false && 'windowC'}
  ${cart === null && 'hidden'}`}>
                <div className='w-full py-[40px] px-[20px] flex justify-between items-center'>
                    <ChevronRight
                        onClick={() => setCart(false)}
                        size={30}
                        color='white' />
                    <h1 className='text-center text-3xl text-white font-semibold'>Cart</h1>
                </div>

                <div className='w-full flex flex-col justify-between p-6'>
                    <div className='w-full self-start flex flex-col gap-2'>
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </div>

                    <div className='w-full flex flex-col gap-[30px] self-end text-white mt-[20px]'>
                        <div className='flex flex-col text-3xl gap-2'>
                            <h1>Subtotal</h1>
                            <h1 className='text-2xl'>$ 129.20</h1>
                        </div>

                        <Link
                            className='w-full px-4 py-3 rounded-md bg-blue-400 text-center font-semibold text-white shadow-lg shadow-black'
                            href={"/cart"}>
                            View Cart
                        </Link>
                    </div>
                </div>
            </div>

        </div >
    )
}
