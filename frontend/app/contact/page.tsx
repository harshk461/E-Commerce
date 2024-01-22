'use client'

import React, { useState } from 'react'
import PathHeader from '../Utils/PathHeader/PathHeader'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast';
import axios from 'axios';
import useBase from '../hooks/useBase';

export default function Contact() {
    const path = usePathname();
    const [loading, setLoading] = useState(false);
    const url = useBase();
    const [data, setData] = useState({
        'name': '',
        'email': '',
        'phone': '',
        'message': '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(url + "/contact", data)
                .then(res => {
                    if (res.data.status === 'error') {
                        toast.error(res.data.message);
                        return;
                    }
                })
        }
        catch (e) {
            toast.error("Server Error");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className='w-full h-full flex flex-col'>
            <PathHeader path={path} />
            <div className='max-w-full w-[900px] m-auto flex flex-col md:my-[100px]'>
                <div className='w-[90%] m-auto h-[1px] bg-gray-500 mb-[70px]'></div>
                <div className='w-full flex justify-between items-start'>
                    <div className='text-5xl font-bold text-blue-600'>
                        Throw us <br />
                        a question,<br />
                        we promise<br />
                        to fetch<br />
                    </div>

                    <form
                        action=""
                        method='POST'
                        onSubmit={handleSubmit}
                        className='max-w-full w-[500px] flex flex-col items-start gap-4'>
                        <div className='w-full flex gap-2 items-start flex-col'>
                            <h1>Name</h1>
                            <input
                                required
                                className='w-full border-2 border-gray-300 rounded-md outline-none px-4 py-2'
                                type="text"
                                name='name'
                                value={data.name}
                                onChange={handleChange}
                                placeholder='Enter Name' />
                        </div>
                        <div className='w-full flex gap-2 items-start flex-col'>
                            <h1>Email</h1>
                            <input
                                required
                                className='w-full border-2 border-gray-300 rounded-md outline-none px-4 py-2'
                                type="email"
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                placeholder='Enter Email' />
                        </div>
                        <div className='w-full flex gap-2 items-start flex-col'>
                            <h1>Phone </h1>
                            <input
                                required
                                className='w-full border-2 border-gray-300 rounded-md outline-none px-4 py-2'
                                type="number"
                                name='phone'
                                value={data.phone}
                                onChange={handleChange}
                                placeholder='Enter Phone' />
                        </div>
                        <div className='w-full flex gap-2 items-start flex-col'>
                            <h1>Message</h1>
                            <textarea
                                required
                                name='message'
                                value={data.message}
                                onChange={handleChange}
                                maxLength={1000}
                                className='w-full border-2 border-gray-300 rounded-md outline-none px-4 py-2 resize-none h-[150px]'
                                placeholder='Enter Message' />
                            <h1 className='self-end text-sm text-gray-400'>{data.message.length + "/1000"}</h1>
                        </div>

                        <button
                            type='submit'
                            className='px-8 py-2 rounded-md bg-blue-600 text-white font-bold self-end'>
                            Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
