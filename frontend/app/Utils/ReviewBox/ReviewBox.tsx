import { Dot } from 'lucide-react';
import React from 'react'
import StarRating from '../StarRating/StarRating';

interface Props {
    user: string;
    date: string;
    rating: number;
    review: string;
}

export default function ReviewBox({ user, date, rating, review }: Props) {
    return (
        <div className='w-[400px] p-4 rounded-lg border-2 border-gray-200 flex flex-col gap-2'>
            <div className='flex gap-2 items-center text-[16px]'>
                <h1>{user}</h1>
                <Dot size={20} />
                <h1>{date}</h1>
            </div>
            <div>
                <div className='text-[25px] flex gap-4'>
                    <StarRating rating={rating} />
                    <section className="relative flex justify-center items-center">
                        <div
                            className="group flex justify-center transition-all rounded-full">
                            <h1 className='text-[15px] text-blue-400'>
                                verfied
                            </h1>
                            <span
                                className="absolute w-[300px] opacity-0 group-hover:opacity-100 
                                group-hover:-translate-y-[100%] duration-700 text-sm bg-white rounded-md shadow-md shadow-black p-4">
                                A “Verified” badge means we’ve verified that the reviewer bought this product. It doesn’t mean that reviews without this badge are dishonest or fake, just that we haven’t been able to verify them.
                            </span>
                        </div>
                    </section>
                </div>
            </div>

            <div className='w-full flex flex-col gap-3'>
                <h1 className='text-[18px] font-bold'>Highly Recommended</h1>
                <h1>{review}</h1>
            </div>
        </div>
    )
}
