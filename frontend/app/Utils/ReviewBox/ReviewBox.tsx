import { Dot } from 'lucide-react';
import React from 'react';
import StarRating from '../StarRating/StarRating';

interface Props {
    user: string;
    date?: string;
    rating: number;
    review: string;
}

export default function ReviewBox({ user, date, rating, review }: Props) {
    return (
        <div className='max-w-full w-[400px] p-5 rounded-lg border border-gray-300 shadow-md bg-white flex flex-col gap-3'>
            {/* User Info */}
            <div className='flex gap-2 items-center text-gray-700 text-sm font-medium'>
                <span>{user}</span>
                <Dot size={18} className='text-gray-500' />
                <span>{date}</span>
            </div>
            
            {/* Rating Section */}
            <div className='flex items-center gap-2'>
                <StarRating rating={rating} />
                <div className='relative group cursor-pointer'>
                    <span className='text-sm text-blue-500 font-semibold'>Verified</span>
                    <div className='absolute left-1/2 -translate-x-1/2 mt-2 w-72 p-3 text-xs bg-gray-900 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        A “Verified” badge means we’ve confirmed that the reviewer purchased this product. Reviews without this badge aren't necessarily fake, just unverified.
                    </div>
                </div>
            </div>
            
            {/* Review Content */}
            <div className='flex flex-col gap-2'>
                <h1 className='text-lg font-semibold text-gray-900'>Highly Recommended</h1>
                <p className='text-gray-700 text-sm leading-relaxed'>{review}</p>
            </div>
        </div>
    );
}
