import { Facebook, Github, Instagram } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className='w-full m-auto lg:px-[150px] p-[50px] flex flex-col lg:flex-row flex-wrap justify-between bg-[url("/cover.jpeg")] bg-no-repeat bg-cover text-white'>
            <div className='flex max-w-full gap-10 flex-col lg:w-[300px] p-4'>
                <h1 className='text-lg font-semibold'>Our Flagship Store</h1>
                <div className='flex flex-col'>
                    <h1>500 Terry Francine Street<br />
                        San Francisco, CA 94158<br />
                        Tel: 123-456-7890</h1>
                    <Link className='mt-5 hover:underline' href={"/"}>Visit Our Store</Link>
                </div>
            </div>

            <div className='flex max-w-full gap-10 flex-col lg:w-[300px] p-4'>
                <h1 className='text-lg font-semibold'>Shops</h1>
                <div className='flex flex-col gap-2'>
                    <Link href={"/shop"}>SHOP ALL</Link>
                    <Link href={"/shop/dogs"}>DOGS</Link>
                    <Link href={"/shop/cats"}>CATS</Link>
                    <Link href={"/shop/birds"}>BIRDS</Link>
                    <Link href={"/shop/fish"}>FISH</Link>
                    <Link href={"/shop/reptiles"}>REPTILES</Link>
                </div>
            </div>

            <div className='flex max-w-full gap-10 flex-col lg:w-[300px] p-4'>
                <h1 className='text-lg font-semibold'>Info</h1>
                <div className='flex flex-col gap-2'>
                    <Link href={"/"}>Our Story</Link>
                    <Link href={"/"}>Contact</Link>
                    <Link href={"/"}>Shipping and Return</Link>
                    <Link href={"/"}>Store Policy</Link>
                    <Link href={"/"}>Forum</Link>
                    <Link href={"/"}>FAQs</Link>
                </div>
            </div>

            <div className='flex max-w-full gap-10 flex-col lg:w-[300px] p-4'>
                <h1 className='text-lg font-semibold'>Get Special Deals & Offers</h1>
                <div className='flex flex-col w-full gap-4'>
                    <h1>Email Address*</h1>
                    <input
                        type="text"
                        className='w-full p-2 rounded-md outline-none'
                        placeholder='Enter Email...'
                    />
                    <button className='w-full py-2 text-center bg-stone-900 rounded-md text-white'>
                        Subscribe
                    </button>
                    <h1>Thanks for submitting!</h1>
                </div>

                <div className='flex gap-4 mt-4 flex-col'>
                    <h1 className='text-lg font-semibold'>Become Our Bestie!</h1>
                    <div className='flex gap-2'>
                        <Facebook />
                        <Github />
                        <Instagram />
                    </div>
                </div>
            </div>
        </footer>
    );
}
