/* eslint-disable react/no-unescaped-entities */
'use client'

import AlsoLike from '@/app/Utils/AlsoLike/AlsoLike';
import NewReview from '@/app/Utils/NewReview/NewReview';
import PathHeader from '@/app/Utils/PathHeader/PathHeader';
import ReviewBox from '@/app/Utils/ReviewBox/ReviewBox';
import StarRating from '@/app/Utils/StarRating/StarRating';
import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { Minus, Plus } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface Product {
    name: string;
    description: string;
    image: string;
    rating: number;
}

export default function Page() {
    const [productData, setProductData] = useState({
        "name": "I'm Product",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error expedita nihil quo dolorem architecto esse omnis rerum, eveniet delectus cumque!",
        "image": "https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg",
        "price": '$ 12.00',
        "rating": 4,
    });
    const { product_id } = useParams();
    const path = usePathname();
    const url = useBase();
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const [window, setWindow] = useState({
        window1: 0,
        window2: 0,
        window3: 0,
    });
    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                await axios.get(url + "/product/" + product_id)
                    .then(res => {
                        if (res.data.status === 'error') {
                            toast.error("Product Not Found");
                            navigate.replace("/");
                            return;
                        }
                        setProductData(res.data);
                    })
            }
            catch (e) {
                toast.error("Server Error");
            }
            finally {
                setLoading(false);
            }
        }

        // getProduct();
    }, [])
    return (
        <div className='w-full flex flex-col'>
            <PathHeader path={path} />
            <div className='max-w-full w-[900px] m-auto my-[50px] flex gap-[20px] flex-col justify-center items-center'>
                <div className='w-full flex flex-col lg:flex-row gap-[50px] justify-center items-center lg:items-start p-4'>
                    <div className='max-w-full w-[400px]'>
                        <img
                            className='max-w-full w-[400px] h-[400px] rounded-md shadow-lg shadow-blue-100'
                            src={productData.image}
                            alt={productData.name} />

                        <h1 className='mt-[20px]'>{productData.description}</h1>
                    </div>

                    <div className='max-w-full w-[400px] flex flex-col items-center lg:items-start'>
                        <h1 className='text-3xl font-bold'>{productData.name}</h1>
                        <div className='my-2 flex gap-4 items-center justify-center text-[30px]'>
                            <StarRating rating={productData.rating} />
                            <h1 className='text-sm text-gray-500'>{productData.rating}</h1>
                        </div>
                        <h1 className='text-sm text-gray-400'>SKU:{product_id}</h1>

                        <h1 className='my-[15px] text-lg font-semibold'>{productData.price}</h1>

                        <div className='flex gap-2 items-center'>
                            <h1>Quantity</h1>
                            <input
                                max="20"
                                placeholder='#1'
                                className='w-[70px] h-[40px] rounded-lg pl-2 outline-none bg-gray-200'
                                type="number" />
                        </div>

                        <button
                            className='w-full bg-blue-400 rounded-md py-2 font-semibold text-white mt-[40px] mb-[10px]'>
                            Add to Cart
                        </button>

                        <button
                            className='w-full bg-red-400 rounded-md py-2 font-semibold text-white'>
                            Buy Now
                        </button>

                        <div className='w-full mt-6 border-b-[2px] border-b-gray-400 pb-5'>
                            <div
                                onClick={() => {
                                    setWindow((pre) => ({
                                        ...pre,
                                        window1: window.window1 === 1 ? 0 : 1,
                                    }))
                                }}
                                className='w-full flex justify-between'>
                                <h1 className='text-lg'>PRODUCT INFO</h1>
                                {window.window1 == 1 ? <Minus /> : <Plus />}
                            </div>
                            <div className={`w-full mt-2 ${window.window1 === 1 ? 'opacity-100 max-h-[500px] transition-all ease-in-out duration-1000' : 'opacity-0 max-h-0 overflow-hidden'}`}>

                                I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.
                            </div>
                        </div>

                        <div
                            onClick={() => {
                                setWindow((pre) => ({
                                    ...pre,
                                    window2: window.window2 === 1 ? 0 : 1,
                                }))
                            }}
                            className='w-full mt-6 border-b-[2px] border-b-gray-400 pb-5'>
                            <div className='w-full flex justify-between'>
                                <h1 className='text-lg'>RETURN AND REFUND INFO</h1>
                                {window.window2 == 1 ? <Minus /> : <Plus />}
                            </div>

                            <div className={`w-full mt-2 ${window.window2 === 1 ? 'opacity-100 max-h-[500px] transition-all ease-in-out duration-1000' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.
                            </div>
                        </div>

                        <div className='w-full mt-6 border-b-[2px] border-b-gray-400 pb-5'>
                            <div
                                onClick={() => {
                                    setWindow((pre) => ({
                                        ...pre,
                                        window3: window.window3 === 1 ? 0 : 1,
                                    }))
                                }}
                                className='w-full flex justify-between'>
                                <h1 className='text-lg'>SHIPPING INFO</h1>
                                {window.window3 == 1 ? <Minus /> : <Plus />}
                            </div>

                            <div className={`w-full mt-2 ${window.window3 === 1 ? 'opacity-100 max-h-[500px] transition-all ease-in-out duration-1000' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.
                            </div>
                        </div>
                    </div>
                </div>

                <div className='max-w-full w-full p-4'>
                    {/* <ReviewBox
                        user='Harsh'
                        rating={4}
                        date='01-01-2024'
                        review='Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam obcaecati voluptate tempora cum, ullam tenetur veniam similique sed doloribus provident modi quidem ratione sint rerum iste, iusto, illum explicabo quos.' /> */}
                    <NewReview />
                </div>
            </div>
            <AlsoLike />
        </div>
    )
}
