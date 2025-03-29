'use client'

import React, { useState } from 'react'
import PathHeader from '../Utils/PathHeader/PathHeader'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import axios from 'axios';
import useBase from '../hooks/useBase';

interface ContactData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export default function Contact() {
    const path = usePathname();
    const [loading, setLoading] = useState(false);
    const url = useBase();
    const [data, setData] = useState<ContactData>({
        'name': '',
        'email': '',
        'phone': '',
        'message': '',
    });

    const navigate = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (data.phone.toString().length < 10) {
                toast.error("Enter Valid Phone");
                return;
            }
            setLoading(true);
            console.log(data);
            await axios.post(url + "/contact", data)
                .then(res => {
                    if (res.data.status === 'error') {
                        toast.error(res.data.message);
                        return;
                    }
                    toast.success("Sent");
                    navigate.replace("/");
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
        <div className='w-full min-h-screen bg-gray-50'>
            <PathHeader path={path} />
            <div className='max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                <div className='max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8'>
                    <div>
                        <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
                            Throw us a question,
                            <span className='block text-blue-600'>we promise to fetch</span>
                        </h2>
                        <div className='mt-3'>
                            <p className='text-lg text-gray-500'>
                                We're here to help and answer any question you might have. We look forward to hearing from you.
                            </p>
                        </div>
                        <div className='mt-8'>
                            <div className='flex'>
                                <div className='flex-shrink-0'>
                                    <svg className='h-6 w-6 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                    </svg>
                                </div>
                                <div className='ml-3 text-base text-gray-500'>
                                    <p>support@example.com</p>
                                </div>
                            </div>
                            <div className='mt-6 flex'>
                                <div className='flex-shrink-0'>
                                    <svg className='h-6 w-6 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                                    </svg>
                                </div>
                                <div className='ml-3 text-base text-gray-500'>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 sm:mt-16 md:mt-0'>
                        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-6'>
                            <div>
                                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                    Name
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='text'
                                        name='name'
                                        id='name'
                                        autoComplete='name'
                                        required
                                        value={data.name}
                                        onChange={handleChange}
                                        className='py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                    Email
                                </label>
                                <div className='mt-1'>
                                    <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        autoComplete='email'
                                        required
                                        value={data.email}
                                        onChange={handleChange}
                                        className='py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                                    Phone
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='tel'
                                        name='phone'
                                        id='phone'
                                        autoComplete='tel'
                                        required
                                        value={data.phone}
                                        onChange={handleChange}
                                        className='py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md'
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
                                    Message
                                </label>
                                <div className='mt-1'>
                                    <textarea
                                        id='message'
                                        name='message'
                                        rows={4}
                                        required
                                        value={data.message}
                                        onChange={handleChange}
                                        className='py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md'
                                    />
                                </div>
                                <p className='mt-2 text-sm text-gray-500'>{data.message.length}/1000</p>
                            </div>
                            <div>
                                <button
                                    type='submit'
                                    className='w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
