/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import StarRating from '../StarRating/StarRating';

interface Props {
    isSale?: Boolean;
    rating: number;
    name: string;
    price: string;
    url: string;
}

export default function ItemBox({ name, price, url, isSale, rating }: Props) {
    const [showQuick, setShowQuick] = useState(false);
    return (
        <div
            onMouseEnter={() => setShowQuick(true)}
            onMouseLeave={() => setShowQuick(false)}
            className='max-w-[400px] w-full md:w-fit m-auto flex flex-col p-4 lg:p-0 my-4'>
            <div
                className='relative flex flex-col overflow-hidden'>
                {isSale && (
                    <div className='absolute top-0 left-0 py-1 px-4 bg-green-800 font-semibold text-white text-sm'>
                        Sale
                    </div>
                )}
                <img
                    className='w-full'
                    src={url}
                    alt="Product"
                />

                <div
                    className={`absolute bottom-0 left-0 right-0 text-center bg-white text-lg py-2 bg-opacity-55 filter drop-shadow-m cursor-pointer
                        ${showQuick ? 'quickO' : 'quickC'}`}>
                    Quick View
                </div>
            </div>

            <div
                className='flex flex-col text-center mt-5 mb-2'>
                <h1 className='text-2xl font-bold'>
                    I'm the Product
                </h1>
                <div className='w-[40px] m-auto h-[3px] bg-gray-500 my-1'>

                </div>
                <h1 className='text-md text-gray-500'>
                    $ 12.00
                </h1>
            </div>

            <div className='my-2 flex gap-4 items-center justify-center text-[25px]'>
                <StarRating rating={rating} />
                <h1 className='text-sm text-gray-500'>{rating}</h1>
            </div>

            <div
                className='w-full flex flex-col'>
                <button
                    className='w-full text-center py-2 bg-blue-500 text-white font-bold rounded-lg'>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
