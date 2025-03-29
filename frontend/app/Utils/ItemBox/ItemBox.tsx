'use client';

import React, { useState } from 'react';
import StarRating from '../StarRating/StarRating';
import ItemHover from '../ItemHover/ItemHover';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
            className="
                group
                relative
                flex
                w-fit
                max-w-sm
                flex-col
                overflow-hidden
                rounded-lg
                bg-white
                shadow-md
                transition-shadow
                duration-300
                hover:shadow-lg
                mx-auto
                h-fit  /* Add height to the Link */
            "
        >
            <div className="relative">
                {isSale && (
                    <div className="absolute top-2 left-2 rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white">
                        Trending
                    </div>
                )}
                {url && url.length > 0 && (
                    <img
                        src={url[0].url}
                        alt={name}
                        className="
                            aspect-square
                            w-full
                            object-cover
                            transition-transform
                            duration-300
                            group-hover:scale-105
                            h-64  /*Define image height*/
                        "
                    />
                )}
            </div>

            <div className="px-4 py-3 flex flex-col justify-between h-40"> {/*Adjust height as needed*/}
                <div>
                    <h3 className="text-sm text-gray-700 line-clamp-2">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {name}
                    </h3>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-gray-500">
                    <p className="text-sm">
                        ${price.toFixed(2)}
                    </p>
                    <div className="flex items-center">
                        <StarRating rating={rating} />
                        <span className="ml-2 text-xs">({rating})</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <button className="relative block w-full rounded bg-[#4F45E4] px-5 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring">
                    Add to Cart
                </button>
            </div>

            {openQuick && (
                <ItemHover
                    id={id}
                    name={name}
                    price={price.toString()}
                    isSale={isSale}
                    rating={rating}
                    window={setOpenQuick}
                    desc={"Product description"}
                    url={url[0].url}
                />
            )}
        </Link>
    );
}
