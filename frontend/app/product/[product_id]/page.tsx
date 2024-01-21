'use client'

import PathHeader from '@/app/Utils/PathHeader/PathHeader';
import ReviewBox from '@/app/Utils/ReviewBox/ReviewBox';
import StarRating from '@/app/Utils/StarRating/StarRating';
import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import Image from 'next/image';
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
            <div className='max-w-full w-1/2 m-auto my-[50px] flex gap-[20px] flex-col'>
                <div className='w-full flex gap-[50px]'>
                    <div className='w-[400px]'>
                        <img
                            className='max-w-full w-[400px] h-[400px] rounded-md shadow-lg shadow-blue-100'
                            src={productData.image}
                            alt={productData.name} />

                        <h1 className='mt-[20px]'>{productData.description}</h1>
                    </div>

                    <div className='w-[400px] flex flex-col items-start'>
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
                    </div>
                </div>

                <div>
                    <ReviewBox
                        user='Harsh'
                        rating={4}
                        date='01-01-2024'
                        review='Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam obcaecati voluptate tempora cum, ullam tenetur veniam similique sed doloribus provident modi quidem ratione sint rerum iste, iusto, illum explicabo quos.' />
                </div>
            </div>
        </div>
    )
}
