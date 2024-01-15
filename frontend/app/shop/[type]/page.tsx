'use client'

import ItemBox from '@/app/Utils/ItemBox/ItemBox';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Type() {
    const { type } = useParams();
    const [filterType, setFilterType] = useState(0);
    const filters = ['Recommended', 'Newest', 'Price:(Low to High)', 'Price:(High to Low)', 'Name:(A-Z)', 'Name:(Z-A)'];
    const [filterWindow, setFilterWindow] = useState(false);
    const [browserWindow, setBrowserWindow] = useState(false);
    const [mobileFilterWindow, setMobileFilterWindow] = useState(false);

    // Convert type to a capitalized title
    const capitalizedTitle = (type as string).split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

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
        { title: 'Dog Food', url: '/shop/dog-food' },
        { title: 'Dog Toys', url: '/shop/dog-toys' },
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
        { title: 'Small Animals', url: '/shop/small-animals' },
    ];

    return (
        <div className='relative w-full h-full flex flex-col lg:p-[50px]'>
            {/* Title Header */}
            <div className='text-4xl font-bold text-center'>
                {capitalizedTitle}
            </div>

            {/* Filter */}
            <div className='hidden lg:flex justify-between items-start text-lg font-semibold my-[30px]'>
                <div>
                    Product Count
                </div>

                <div className='hidden relative w-fit lg:flex flex-col items-center'>
                    <div
                        onClick={() => setFilterWindow(!filterWindow)}
                        className='cursor-pointer flex gap-2 items-center text-md'>
                        Sort by: {filters[filterType]} {filterWindow ? <ChevronDown /> : <ChevronUp />}
                    </div>
                    <div className={`absolute top-full left-0 ${filterWindow ? 'block translate-y-[0%] z-10' : 'hidden'} w-[250px] bg-white rounded-xl`}>
                        <ul className='shadow-lg shadow-black border-2 border-black z-10 rounded-lg text-md'>
                            <li
                                onClick={() => {
                                    setFilterType(0);
                                    setFilterWindow(false);
                                }}
                                className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 0 ? 'bg-gray-500 text-white' : ''}`}>Recommended</li>

                            <li
                                onClick={() => {
                                    setFilterType(1);
                                    setFilterWindow(false);
                                }}
                                className={`cursor-pointer py-3 px-4 hover:bg-gray-300 transition-all duration-200 ${filterType === 1 ? 'bg-gray-500 text-white' : ''}`}>Newest</li>

                            <li
                                onClick={() => {
                                    setFilterType(2);
                                    setFilterWindow(false);
                                }}
                                className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 2 ? 'bg-gray-500 text-white' : ''}`}>Price:(Low to High)</li>

                            <li
                                onClick={() => {
                                    setFilterType(3);
                                    setFilterWindow(false);
                                }}
                                className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 3 ? 'bg-gray-500 text-white' : ''}`}>Price:(High to Low)</li>

                            <li
                                onClick={() => {
                                    setFilterType(4);
                                    setFilterWindow(false);
                                }}
                                className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 4 ? 'bg-gray-500 text-white' : ''}`}>Name:(A-Z)</li>

                            <li
                                onClick={() => {
                                    setFilterType(5);
                                    setFilterWindow(false);
                                }}
                                className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 5 ? 'bg-gray-500 text-white' : ''}`}>Name:(Z-A)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile Filter */}
            <div className='flex md:hidden justify-between items-center mt-4 underline text-blue-600'>
                <h1
                    onClick={() => setBrowserWindow(!browserWindow)}>
                    Browser</h1>
                <h1
                    onClick={() => setMobileFilterWindow(!mobileFilterWindow)}
                >Filter and Sort</h1>
            </div>

            {/* Mobile Filter Window */}
            <div className={`fixed md:hidden top-0 left-0 flex flex-col w-full h-full items-center overflow-scroll pb-[30px] gap-4 bg-black text-white
            bg-opacity-45 z-[11] ${mobileFilterWindow ? 'windowO' : 'windowC'}`}>
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
                    onClick={() => setFilterWindow(!filterWindow)}
                    className='cursor-pointer flex gap-2 items-center text-md'>
                    Sort by: {filters[filterType]} {filterWindow ? <ChevronDown /> : <ChevronUp />}
                </div>
                <div className={`w-[250px]`}>
                    <ul className='text-md'>
                        <li
                            onClick={() => {
                                setFilterType(0);
                                setMobileFilterWindow(false);
                            }}
                            className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 0 ? 'bg-gray-500 text-black' : ''}`}>Recommended</li>

                        <li
                            onClick={() => {
                                setFilterType(1);
                                setMobileFilterWindow(false);
                            }}
                            className={`cursor-pointer py-3 px-4 hover:bg-gray-300 transition-all duration-200 ${filterType === 1 ? 'bg-gray-500 text-black' : ''}`}>Newest</li>

                        <li
                            onClick={() => {
                                setFilterType(2);
                                setMobileFilterWindow(false);
                            }}
                            className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 2 ? 'bg-gray-500 text-black' : ''}`}>Price:(Low to High)</li>

                        <li
                            onClick={() => {
                                setFilterType(3);
                                setMobileFilterWindow(false);
                            }}
                            className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 3 ? 'bg-gray-500 text-black' : ''}`}>Price:(High to Low)</li>

                        <li
                            onClick={() => {
                                setFilterType(4);
                                setMobileFilterWindow(false);
                            }}
                            className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 4 ? 'bg-gray-500 text-black' : ''}`}>Name:(A-Z)</li>

                        <li
                            onClick={() => {
                                setFilterType(5);
                                setMobileFilterWindow(false);
                            }}
                            className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === 5 ? 'bg-gray-500 text-white' : ''}`}>Name:(Z-A)</li>
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

            <div className={`fixed md:hidden top-0 left-0 flex flex-col w-full h-full items-center overflow-scroll pb-[30px] gap-4 bg-black text-white
            bg-opacity-45 z-[11] ${browserWindow ? 'windowORev' : 'windowCRev'}`}>
                <div className='p-[30px] self-end'>
                    <X
                        onClick={() => setBrowserWindow(!browserWindow)}
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

            <div className='w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    isSale={true}
                    rating={4}
                    url='https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    isSale={true}
                    rating={4}
                    url='https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    isSale={true}
                    rating={4}
                    url='https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    isSale={true}
                    rating={4}
                    url='https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    isSale={true}
                    rating={4}
                    url='https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' />
                <ItemBox
                    name="I'm Product"
                    price='$ 12.00'
                    isSale={true}
                    rating={4}
                    url='https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' />
            </div>
        </div>
    )
}
