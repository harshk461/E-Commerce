/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';
import ItemHover from '../ItemHover/ItemHover';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider';

interface Props {
    id: string;
    isSale?: Boolean;
    rating: number;
    name: string;
    price: number;
    url: {
        public_id: string,
        url: string,
    }[];
}

export default function ItemBox({ id, name, price, url, isSale, rating }: Props) {
    const [showQuick, setShowQuick] = useState<Boolean | null>(null);
    const [openQuick, setOpenQuick] = useState(false);
    const path = usePathname();
    return (
        <Link
            href={`${'/product/' + id}`}
            onMouseEnter={() => setShowQuick(true)}
            onMouseLeave={() => setShowQuick(false)}
            className='max-w-full m-auto flex flex-col md:p-4 my-4'>
            <div
                className='relative flex flex-col overflow-hidden'>
                {isSale && (
                    <div className='absolute top-0 left-0 px-4 py-1 bg-green-800 font-semibold text-white text-sm mt-2 w-fit'>
                        Trending
                    </div>
                )}

                {url && url.length > 0 && (
                    <img
                        className='max-w-full h-full m-auto'
                        src={url[0].url}
                        alt="" />
                )}

                <div
                    onClick={() => setOpenQuick(true)}
                    className={`absolute bottom-0 left-0 right-0 text-center bg-white text-lg py-2 bg-opacity-55 filter drop-shadow-m cursor-pointer
                        ${showQuick === true && 'quickO'} ${showQuick === false && 'quickC'}`}>
                    Quick View
                </div>
            </div>

            <div
                className='flex flex-col text-center mt-5 mb-2'>
                <h1 className='text-2xl font-bold'>
                    {name}
                </h1>
                <div className='w-[40px] m-auto h-[3px] bg-gray-500 my-1'>

                </div>
                <h1 className='text-md text-gray-500'>
                    {price}
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

            {openQuick && <ItemHover
                id={id}
                name={name}
                price={"price"}
                isSale={true}
                rating={rating}
                window={setOpenQuick}
                desc={"sdkj"}
                url={"dsjsd"}
            />}
        </Link>
    );
}
