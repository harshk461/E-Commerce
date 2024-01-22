'use client'

import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import StarRating from '../StarRating/StarRating';

export default function NewReview() {
    const [data, setData] = useState({
        rating: 0,
        title: '',
        review: ''
    });

    const handleChangeRating = (rate: number) => {
        setData((pre) => ({
            ...pre,
            rating: rate,
        }));
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value,
        }))
    }

    return (
        <div className='w-full flex flex-col items-start my-[50px] gap-[10px]'>
            <div className='flex  flex-col text-[35px] mb-[10px]'>
                <h1 className='text-[18px]'>Add a rating*</h1>
                <StarRating
                    rating={4} />
            </div>

            <div className='flex flex-col w-full gap-2'>
                <h1 className='text-[18px]'>Review Title*</h1>
                <input
                    className='w-full p-3 border-[2px] rounded-md outline-none'
                    type="text"
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                    placeholder='Enter Review Title'
                    maxLength={1000}
                />
                <h1 className='self-end text-sm text-gray-400'>{data.title.length + "/ 1000"}</h1>
            </div>

            <div className='flex flex-col w-full gap-2'>
                <h1 className='text-[18px]'>Review*</h1>
                <textarea
                    className='w-full h-[100px] p-3 border-[2px] rounded-md outline-none resize-none'
                    name='review'
                    value={data.review}
                    onChange={handleChange}
                    placeholder='Enter Review'
                    maxLength={5000}
                />
                <h1 className='self-end text-sm text-gray-400'>{data.review.length + "/ 1000"}</h1>
            </div>

            <div className='self-end flex items-center gap-4'>
                <button className='px-5 py-1 rounded-md bg-white border-2 border-blue-500 font-semibold'>Cancel</button>
                <button className='px-5 py-1 rounded-md bg-blue-500 border-2 border-blue-500 font-semibold text-white'>Publish</button>
            </div>
        </div>
    )
}
