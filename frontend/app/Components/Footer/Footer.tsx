import { Facebook, Github, Instagram, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
        }
    };

    return (
        <footer className='relative w-full m-auto lg:px-[150px] p-[50px] flex flex-col lg:flex-row flex-wrap justify-between bg-[url("/cover.jpeg")] bg-no-repeat bg-cover bg-opacity-80 text-white'>
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>
            
            <div className='relative flex max-w-full gap-8 flex-col lg:w-[300px] p-4'>
                <h1 className='text-xl font-bold'>Our Flagship Store</h1>
                <div className='flex flex-col'>
                    <p className='text-gray-200'>
                        500 Terry Francine Street<br />
                        San Francisco, CA 94158<br />
                        Tel: 123-456-7890
                    </p>
                    <Link 
                        className='mt-5 inline-block px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300' 
                        href={"/"}
                    >
                        Visit Our Store
                    </Link>
                </div>
            </div>

            <div className='relative flex max-w-full gap-8 flex-col lg:w-[300px] p-4'>
                <h1 className='text-xl font-bold'>Shop By Category</h1>
                <div className='flex flex-col gap-3'>
                    <Link href={"/shop"} className='hover:text-indigo-300 transition-colors'>SHOP ALL</Link>
                    <Link href={"/shop/dogs"} className='hover:text-indigo-300 transition-colors'>DOGS</Link>
                    <Link href={"/shop/cats"} className='hover:text-indigo-300 transition-colors'>CATS</Link>
                    <Link href={"/shop/birds"} className='hover:text-indigo-300 transition-colors'>BIRDS</Link>
                    <Link href={"/shop/fish"} className='hover:text-indigo-300 transition-colors'>FISH</Link>
                    <Link href={"/shop/reptiles"} className='hover:text-indigo-300 transition-colors'>REPTILES</Link>
                </div>
            </div>

            <div className='relative flex max-w-full gap-8 flex-col lg:w-[300px] p-4'>
                <h1 className='text-xl font-bold'>Customer Support</h1>
                <div className='flex flex-col gap-3'>
                    <Link href={"/"} className='hover:text-indigo-300 transition-colors'>Our Story</Link>
                    <Link href={"/"} className='hover:text-indigo-300 transition-colors'>Contact</Link>
                    <Link href={"/"} className='hover:text-indigo-300 transition-colors'>Shipping and Return</Link>
                    <Link href={"/"} className='hover:text-indigo-300 transition-colors'>Store Policy</Link>
                    <Link href={"/"} className='hover:text-indigo-300 transition-colors'>Forum</Link>
                    <Link href={"/"} className='hover:text-indigo-300 transition-colors'>FAQs</Link>
                </div>
            </div>

            <div className='relative flex max-w-full gap-8 flex-col lg:w-[300px] p-4'>
                <h1 className='text-xl font-bold'>Get Special Deals & Offers</h1>
                <div className='flex flex-col w-full gap-4'>
                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email" className='block mb-2 text-gray-200'>Email Address*</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-3 rounded-md outline-none text-gray-800 focus:ring-2 focus:ring-indigo-300'
                                placeholder='Enter Email...'
                                required
                            />
                            <button 
                                type="submit"
                                className='w-full py-3 mt-3 text-center bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition-colors duration-300'
                            >
                                Subscribe
                            </button>
                        </form>
                    ) : (
                        <div className='bg-green-600 bg-opacity-30 border border-green-500 rounded-md p-4 text-center'>
                            <p className='text-white'>Thanks for subscribing!</p>
                        </div>
                    )}
                </div>

                <div className='flex gap-4 mt-6 flex-col'>
                    <h1 className='text-xl font-bold'>Become Our Bestie!</h1>
                    <div className='flex gap-4'>
                        <a href="#" className='hover:text-indigo-300 transition-colors'>
                            <Facebook size={24} />
                        </a>
                        <a href="#" className='hover:text-indigo-300 transition-colors'>
                            <Github size={24} />
                        </a>
                        <a href="#" className='hover:text-indigo-300 transition-colors'>
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
            </div>
            
            <div className='relative w-full mt-12 pt-6 border-t border-gray-600 text-center text-sm text-gray-300'>
                <p>© 2025 BESTIES. All rights reserved.</p>
            </div>
            
            <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className='absolute bottom-8 right-8 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition-colors duration-300'
            >
                <ChevronUp size={24} />
            </button>
        </footer>
    );
}
