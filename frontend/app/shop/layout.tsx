'use client'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Link from 'next/link';
import React, { useState } from 'react'
import Loader from '../Utils/Loader/Loader';
import { usePathname } from 'next/navigation';
import PathHeader from '../Utils/PathHeader/PathHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [type, setType] = useState('');
    const types = [
        { title: 'All Products', url: '/shop/all-products' },
        { title: 'Bird Food', url: '/shop/bird-food' },
        { title: 'Bird Houses', url: '/shop/bird-houses' },
        { title: 'Bird Toys', url: '/shop/bird-toys' },
        { title: 'Birds', url: '/shop/birds' },
        { title: 'Cat Litters', url: '/shop/cat-litters' },
        { title: 'Cat Poles', url: '/shop/cat-poles' },
        { title: 'Cat Tools', url: '/shop/cat-tools' },
        { title: 'Cat Toys', url: '/shop/cat-toys' },
        { title: 'Cats', url: '/shop/cats' },
        { title: 'Dog Beds', url: '/shop/dog-beds' },
        { title: 'Dog Collars', url: '/shop/dogs-collars' },
        { title: 'Dog Food', url: '/shop/dogs-food' },
        { title: 'Dog Toys', url: '/shop/dogs-toys' },
        { title: 'Dogs', url: '/shop/dogs' },
        { title: 'Fish & Aquatics', url: '/shop/fish-aquatics' },
        { title: 'Fish Aquariums', url: '/shop/fish-aquariums' },
        { title: 'Fish Cleaning', url: '/shop/fish-cleaning' },
        { title: 'Fish Decoration', url: '/shop/fish-decoration' },
        { title: "Our Pets Choice", url: '/shop/our-pets-choice' },
        { title: 'Reptile Aquariums', url: '/shop/reptile-aquariums' },
        { title: 'Reptile Decoration', url: '/shop/reptile-decoration' },
        { title: 'Reptile Heating', url: '/shop/reptile-heating' },
        { title: 'Reptiles', url: '/shop/reptiles' },
        { title: 'Small Animal Cages', url: '/shop/small-animal-cages' },
        { title: 'Small Animal Equipment', url: '/shop/small-animal-equipment' },
        { title: 'Small Animal Toys', url: '/shop/small-animal-toys' },
        { title: 'Small Animals', url: '/shop/small-animal' },
    ];
    const [rangeValues, setRangeValues] = useState([10, 80]);
    const path = usePathname();

    return (
        <div className='w-full h-full flex flex-col'>
            <PathHeader path={path} />
            <div className='w-full h-screen flex gap-4 p-4'>
                <div className='hidden xl:flex w-[200px] h-full items-start flex-col px-6'>
                    <h1 className='text-2xl font-semibold text-center'>Browser By</h1>
                    <div className='w-[90%] h-1 p-[0.5px] bg-black my-[15px]'></div>

                    <div className='w-full flex flex-col gap-2 text-sm'>
                        {types.map((item, i) => (
                            <Link
                                className='cursor-pointer hover:text-blue-500 duration-200 transition'
                                href={item.url}
                                onClick={() => setType(item.title)}
                                key={i}>{item.title}</Link>
                        ))}
                    </div>

                    <div className='w-full flex flex-col my-[30px]'>
                        <div className='text-3xl mb-2'>
                            Filter
                        </div>
                        <div className='w-[100%] h-[1px] bg-black mb-[15px]'></div>
                        <Slider
                            range
                            min={0}
                            max={100}
                            value={rangeValues}
                        // onChange={(val) => setRangeValues(val)}
                        />
                        <p>Selected Range: {rangeValues[0]} - {rangeValues[1]}</p>
                        {/* <div className='flex justify-between'>
                            <h1>{priceRange.start}</h1>
                            <h1>{priceRange.end}</h1>
                        </div> */}
                        <div className='w-[100%] h-[1px] bg-black my-[15px]'></div>
                    </div>
                </div>
                <div className='w-full'>
                    {children}
                </div>
            </div>
            {/* <Loader /> */}
        </div >
    )
}
