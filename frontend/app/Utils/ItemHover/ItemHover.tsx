import { X } from 'lucide-react';
import React from 'react'
import StarRating from '../StarRating/StarRating';

interface Props {
    id: string;
    isSale?: Boolean;
    rating: number;
    name: string;
    price: string;
    url: string;
    desc: string;
    window: Function;
}


export default function ItemHover({ id, name, price, url, isSale, rating, desc, window }: Props) {
    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-45 z-10 flex justify-center items-center px-4'>
            <div className='absolute top-[30px] right-[30px] cursor-pointer'>
                <X
                    onClick={() => window(false)}
                    color='white'
                    size={40} />
            </div>
            <div className='max-w-full w-fit p-9 rounded-lg bg-gray-200 flex justify-evenly items-start gap-4'>
                <div className='w-[300px] flex flex-col gap-4'>
                    <div
                        className='relative flex flex-col overflow-hidden rounded-md shadow-md shadow-gray-400'>
                        {isSale && (
                            <div className='absolute top-0 left-0 py-1 px-4 bg-green-800 font-semibold text-white text-sm'>
                                Sale
                            </div>
                        )}
                        <img
                            className='w-fit hover:cursor-pointer'
                            src={url}
                            alt="Product"
                        />
                    </div>

                    <h1>{desc}</h1>
                </div>

                <div className='w-[300px] flex flex-col gap-4'>
                    <h1 className='text-3xl  font-bold text-blue-500'>{name}</h1>
                    <h1 className='text-sm text-gray-500'>Code</h1>
                    <h1 className='text-lg font-semibold'>{price}</h1>

                    <div className='flex gap-2 flex-col'>
                        <h1>Quantity</h1>
                        <input
                            max="20"
                            placeholder='#1'
                            className='w-[70px] h-[40px] rounded-lg pl-2 outline-none'
                            type="number" />
                    </div>

                    <div className='w-fit items-center font-semibold my-2 flex gap-4 text-[25px]'>
                        <StarRating rating={rating} />
                        <h1 className='text-sm font-semibold text-gray-500'>{rating}</h1>
                    </div>

                    <button
                        className='w-full bg-blue-400 rounded-md py-2 font-semibold text-white'>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
