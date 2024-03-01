/* eslint-disable react/no-unescaped-entities */
'use client'

import AlsoLike from '@/app/Utils/AlsoLike/AlsoLike';
import Loader from '@/app/Utils/Loader/Loader';
import NewReview from '@/app/Utils/NewReview/NewReview';
import PathHeader from '@/app/Utils/PathHeader/PathHeader';
import ProductImageSlider from '@/app/Utils/ProductImageSlider/ProductImageSlider';
import ReviewBox from '@/app/Utils/ReviewBox/ReviewBox';
import StarRating from '@/app/Utils/StarRating/StarRating';
import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Minus, Plus } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface ProductData {
    name: string;
    description: string;
    images: {
        url: string,
        public_id: string,
    }[];
    ratings: number;
    price: number;
    reviews: {
        user: string;
        rating: number;
        // date: string;
        review: string;
        message: string;
    }[];
    stock: number;
}

export default function Page() {
    const [productData, setProductData] = useState<ProductData>({
        'description': '',
        'images': [],
        "name": '',
        "price": 0,
        "ratings": 0,
        "reviews": [],
        "stock": 0,
    });

    const { product_id } = useParams();
    const path = usePathname();
    const url = useBase();
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [newReview, setnewReview] = useState<Boolean | null>(null);
    const navigate = useRouter();
    const [window, setWindow] = useState({
        window1: 0,
        window2: 0,
        window3: 0,
    });

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                await axios.get(url + "/product/get-single/" + product_id)
                    .then(res => {
                        if (res.data.status === "error") {
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

        getProduct();
    }, [])

    const addToCart = async () => {
        if (quantity === 0) {
            toast.error("Enter Valid Quantity");
            return;
        }

        if (productData.stock < quantity) {
            toast.error("Quantity is greater than available stock");
            return;
        }
        try {
            setLoading(true);
            const payload = {
                "productId": product_id,
                "name": productData.name,
                "price": productData.price,
                "quantity": +quantity,
                "image": productData.images[0].url,
            };
            const token = localStorage.getItem("token");
            await axios.put(url + "/auth/add-to-cart", payload, { headers: { 'Authorization': 'Bearer ' + token } })
                .then(res => {
                    toast.success("Added to Cart");
                })
        }
        catch (e) {
            console.log(e);
            toast.error((e as any).response.data.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className='w-full flex flex-col'>
            <PathHeader path={path} />
            <div className='max-w-full w-[900px] m-auto my-[50px] flex gap-[20px] flex-col justify-center items-center'>
                <div className='w-full flex flex-col lg:flex-row gap-[50px] justify-center items-center lg:items-start p-4'>
                    <div className='relative max-w-full w-[400px] flex flex-col'>
                        {productData && productData.images && productData.images.length > 0 && (
                            <ProductImageSlider images={productData.images} />
                        )}
                        {productData && <h1 className='absolute -bottom-[105px] text-lg text-black'>{productData.description}</h1>}
                    </div>
                    <div className='max-w-full w-[400px] flex flex-col items-center lg:items-start'>
                        <h1 className='text-3xl font-bold'>{productData.name}</h1>
                        <div className='my-2 flex gap-4 items-center justify-center text-[30px]'>
                            <StarRating rating={productData.ratings} />
                            <h1 className='text-sm text-gray-500'>{productData.ratings}</h1>
                        </div>
                        <h1 className='text-sm text-gray-400'>SKU:{product_id}</h1>

                        <h1 className='my-[15px] text-lg font-semibold'>{productData.price}</h1>

                        <div className='flex gap-2 items-center'>
                            <h1>Quantity</h1>
                            <select
                                value={quantity}
                                onChange={handleQuantityChange}
                                className='border-2 border-gray-400 rounded-md outline-none px-4 py-1 bg-gray-100'>
                                {[1, 2, 3, 4, 5, 6].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={addToCart}
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

                <div className='max-w-full w-full p-4 flex flex-wrap justify-between'>
                    {productData.reviews.length === 0 ?
                        <div className={`${newReview === true && 'hidden'} ${newReview === false && 'flex'} w-full m-auto flex-col justify-center items-center gap-2 mt-[20px]`}>
                            <h1 className='text-xl'>No Reviews Yet</h1>
                            <h1 className=''>Share your thoughts. Be the first to leave a review.</h1>

                            <button
                                onClick={() => setnewReview(true)}
                                className='px-8 py-2 rounded-lg border-2 border-blue-500 mt-3'>
                                Leave a Review
                            </button>
                        </div>
                        :
                        productData.reviews.map((item, i) => (
                            <ReviewBox
                                key={i}
                                user={item.user}
                                rating={item.rating}
                                date={"01-01-2024"}
                                review={item.message}
                            />
                        ))
                    }

                    {newReview && <NewReview />}
                </div>
            </div>
            <AlsoLike />
            {loading && <Loader />}
        </div>
    )
}
