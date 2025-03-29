// components/MobileFilter.tsx
'use client';

import React from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Link from 'next/link';

interface MobileFilterProps {
    browserWindow: Boolean | null;
    setBrowserWindow: React.Dispatch<React.SetStateAction<Boolean | null>>;
    mobileFilterWindow: Boolean | null;
    setMobileFilterWindow: React.Dispatch<React.SetStateAction<Boolean | null>>;
    filters: string[];
    filterType: number;
    setFilterType: React.Dispatch<React.SetStateAction<number>>;
}

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
    { title: 'Dog Collars', url: '/shop/dog-collars' },
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

const MobileFilter: React.FC<MobileFilterProps> = ({
    browserWindow,
    setBrowserWindow,
    mobileFilterWindow,
    setMobileFilterWindow,
    filters,
    filterType,
    setFilterType,
}) => {
    return (
        <>
            {/* Mobile Filter */}
            <div className='flex lg:hidden justify-between items-center mt-4 underline text-blue-600'>
                <h1
                    onClick={() => setBrowserWindow(true)}>
                    Browser</h1>
                <h1
                    onClick={() => setMobileFilterWindow(true)}
                >Filter and Sort</h1>
            </div>

            {/* Mobile Filter Window */}
            <div className={`fixed md:hidden top-0 left-0 flex flex-col w-full h-full items-center overflow-scroll pb-[30px] gap-4 bg-black text-white
            bg-opacity-45 z-[11] 
            ${mobileFilterWindow === true && 'windowO'}
            ${mobileFilterWindow === false && 'windowC'}
            ${mobileFilterWindow === null && 'hidden'}`}>
                <div className='p-[30px] self-end'>
                    <X
                        onClick={() => setMobileFilterWindow(!mobileFilterWindow)}
                        className='border-2 border-white rounded-lg p-2'
                        size={50} />
                </div>
                <h1 className='text-3xl font-bold my-4 text-center'>
                    Filter and Sort
                </h1>

                <div
                    className='cursor-pointer flex gap-2 items-center text-md'>
                    Sort by: {filters[filterType]}
                </div>
                <div className={`w-[250px]`}>
                    <ul className='text-md'>
                        {filters.map((filter, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setFilterType(index);
                                    setMobileFilterWindow(false);
                                }}
                                className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === index ? 'bg-gray-500 text-black' : ''}`}>{filter}</li>
                        ))}
                    </ul>
                </div>

                <div className='max-w-full w-[300px] flex flex-col my-[30px]'>
                    <div className='text-3xl mb-2'>
                        Filter
                    </div>
                    <div className='w-[100%] h-[2px] bg-white mb-[15px]'></div>
                    <div className='w-[100%] h-[2px] bg-white my-[15px]'></div>
                </div>
            </div>

            <div className={`fixed lg:hidden top-0 left-0 flex flex-col w-full h-full items-center overflow-scroll pb-[30px] gap-4 bg-black text-white
            bg-opacity-45 z-[11]
             ${browserWindow === true && 'windowORev'}
             ${browserWindow === false && 'windowCRev'}
             ${browserWindow === null && 'hidden'}`}>
                <div className='p-[30px] self-end'>
                    <X
                        onClick={() => setBrowserWindow(false)}
                        className='border-2 border-white rounded-lg p-2'
                        size={50} />
                </div>
                <h1 className='text-3xl font-bold my-4 text-center'>
                    Browser
                </h1>
                {types.map((item, i) => (
                    <Link
                        href={item.url}
                        className='font-semibold'
                        key={i}>{item.title}</Link>
                ))}
            </div>
        </>
    );
};

export default MobileFilter;
