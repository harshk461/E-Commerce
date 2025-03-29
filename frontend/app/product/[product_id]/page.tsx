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
import { Minus, Plus } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ProductData {
    name: string;
    description: string;
    images: { url: string; public_id: string }[];
    ratings: number;
    price: number;
    reviews: { user: string; rating: number; message: string }[];
    stock: number;
}

export default function Page() {
    const [productData, setProductData] = useState<ProductData>({
        description: '',
        images: [],
        name: '',
        price: 0,
        ratings: 0,
        reviews: [],
        stock: 0,
    });
    const { product_id } = useParams();
    const path = usePathname();
    const url = useBase();
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [newReview, setNewReview] = useState(false);
    const navigate = useRouter();
    const [accordion, setAccordion] = useState({ info: false, refund: false, shipping: false });

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${url}/product/get-single/${product_id}`);
                if (res.data.status === "error") {
                    toast.error("Product Not Found");
                    navigate.replace("/");
                    return;
                }
                setProductData(res.data);
            } catch (e) {
                toast.error("Server Error");
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, []);

    const addToCart = async () => {
        if (quantity === 0 || productData.stock < quantity) {
            toast.error("Invalid Quantity");
            return;
        }
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            await axios.put(
                `${url}/auth/add-to-cart`,
                {
                    productId: product_id,
                    name: productData.name,
                    price: productData.price,
                    quantity,
                    image: productData.images[0]?.url,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Added to Cart");
        } catch (e) {
            toast.error((e as any).response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full flex flex-col bg-gray-50'>
            <PathHeader path={path} />
            <div className="container mx-auto py-12 max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="order-2 lg:order-none">
                        {productData.images.length > 0 && <ProductImageSlider images={productData.images} />}
                        <p className="mt-6 text-gray-700 text-lg leading-relaxed">{productData.description}</p>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
                        <div className="flex items-center gap-2 mt-3">
                            <StarRating rating={productData.ratings} />
                            <span className="text-gray-500">({productData.ratings})</span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mt-4">${productData.price}</h2>
                        <div className="mt-4">
                            <label htmlFor="quantity" className="text-gray-700 font-medium mr-2">Quantity:</label>
                            <select
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {[1, 2, 3, 4, 5, 6].map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={addToCart}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-3 font-medium transition"
                            >
                                Add to Cart
                            </button>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-3 font-medium transition">Buy Now</button>
                        </div>
                        {/* Accordion */}
                        {['PRODUCT INFO', 'RETURN AND REFUND INFO', 'SHIPPING INFO'].map((title, index) => (
                            <div key={index} className="mt-6 border-b border-gray-300 pb-3">
                                <div
                                    onClick={() => setAccordion((prev) => ({ ...prev, [title]: !prev[title] }))}
                                    className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-100 transition"
                                >
                                    <h2 className="text-lg font-medium">{title}</h2>
                                    {accordion[title] ? <Minus /> : <Plus />}
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ${accordion[title] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-600 mt-2">Sample content for {title}.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Reviews Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
                    {productData.reviews.length === 0 ? (
                        <div className="text-center mt-5 text-gray-700">No Reviews Yet</div>
                    ) : (
                        productData.reviews.map((review, i) => (
                            <ReviewBox key={i} user={review.user} rating={review.rating} review={review.message} />
                        ))
                    )}
                </div>
            </div>
            <AlsoLike />
            {loading && <Loader />}
        </div>
    );
}
