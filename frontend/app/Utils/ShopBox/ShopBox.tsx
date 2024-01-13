/* eslint-disable @next/next/no-img-element */
import { Dog } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
    url: string;
    name: string;
    desc: string;
    href: string;
    icon: any;
    isLong: Boolean;
};

export default function ShopBox({ url, name, desc, href, icon, isLong }: Props) {
    return (
        <div className={`relative w-full p-4 md:p-0 lg:w-[45%] ${isLong && 'lg:w-2/3'} md:h-[400px] border-2 m-auto rounded-xl shadow-md shadow-black`}>
            <div className="relative overflow-hidden w-full h-full">
                <img
                    className="absolute top-0 left-0 w-full h-full bg-cover md:block hidden rounded-xl"
                    src={url}
                    alt="image"
                />
            </div>
            <div className="flex md:hidden justify-center">
                {icon}
            </div>
            <div className="w-full md:w-[200px] h-fit flex flex-col py-6 px-4 md:absolute top-[30%] z-10 bg-white md:mx-4 rounded-lg shadow-lg shadow-black">
                <h1 className="text-2xl font-bold">{name}</h1>
                <h1 className="text-lg font-semibold text-gray-600">{desc}</h1>
                <Link
                    href={href}
                    className="w-full lg:w-fit px-4 py-2 rounded-md shadow-md shadow-black my-2 text-center bg-red-500 font-semibold text-white">
                    Shop Now
                </Link>
            </div>
        </div>
    );
}
