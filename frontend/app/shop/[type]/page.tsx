'use client'

import ItemBox from '@/app/Utils/ItemBox/ItemBox';
import Loader from '@/app/Utils/Loader/Loader';
import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface ProductData {
    _id: string;
    name: string;
    description: string;
    images: {
        url: string,
        public_id: string,
    }[];
    ratings: number;
    price: number;
    createdAt: string;
}


export default function Type() {
    const { type } = useParams();
    const url = useBase();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ProductData[]>([]);

    const [filterType, setFilterType] = useState(0);
    const filters = ['Recommended', 'Newest', 'Price:(Low to High)', 'Price:(High to Low)', 'Name:(A-Z)', 'Name:(Z-A)'];
    const [filterWindow, setFilterWindow] = useState<Boolean | null>(null);
    const [browserWindow, setBrowserWindow] = useState<Boolean | null>(null);
    const [mobileFilterWindow, setMobileFilterWindow] = useState<Boolean | null>(null);

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

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const s = (type as string).split("-").join(" ");
                console.log(s);
                await axios.get(url + "/products/get/" + s)
                    .then(res => {
                        if (res.data.status === 'error') {
                            toast.error(res.data.message);
                            return;
                        }
                        setData(res.data);
                    })
            }
            catch (e) {
                toast.error("Server Error");
            }
            finally {
                setLoading(false);
            }
        }
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const filterData = () => {
            let newData: ProductData[] = [...data];

            switch (filterType) {
                case 0:
                    // No filter, set data as is
                    setData(newData);
                    break;
                case 1:
                    // Newest: Sort by date or any other relevant field
                    newData.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
                    setData(newData);
                    break;
                case 2:
                    // Price: Low to High
                    newData.sort((a, b) => a.price - b.price);
                    setData(newData);
                    break;
                case 3:
                    // Price: High to Low
                    newData.sort((a, b) => b.price - a.price);
                    setData(newData);
                    break;
                case 4:
                    // Name: A-Z
                    newData.sort((a, b) => a.name.localeCompare(b.name));
                    setData(newData);
                    break;
                case 5:
                    // Name: Z-A
                    newData.sort((a, b) => b.name.localeCompare(a.name));
                    setData(newData);
                    break;
                default:
                    // No filter, set data as is
                    setData(newData);
                    break;
            }
        };

        filterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterType])

    return (
        <div className='relative w-full h-full flex flex-col lg:p-[50px]'>
            {/* Title Header */}
            <div className='text-4xl font-bold text-center'>
                {capitalizedTitle}
            </div>

            {/* Filter */}
            <div className='hidden lg:flex justify-between items-start text-lg font-semibold my-[30px]'>
                <div>
                    {data.length + " Products"}
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
                    onClick={() => setFilterWindow(true)}
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

            <div className='w-full h-full grid lg:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center'>
                {/* <div className='w-full h-full grid gap-4 grid-cols-1 md:grid-col-2 xl:grid-col-4'> */}
                {data.map((item, i) => (
                    <ItemBox
                        key={i}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        isSale={true}
                        rating={item.ratings}
                        url={item.images} />
                ))}
            </div>
            {loading && <Loader />}
        </div >
    )
}
