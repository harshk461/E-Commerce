'use client'

import Loader from '@/app/Utils/Loader/Loader'
import PathHeader from '@/app/Utils/PathHeader/PathHeader'
import useBase from '@/app/hooks/useBase'
import axios from 'axios'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface SignUpData {
    username: string;
    name: string;
    email: string;
    password: string;
    password2: string;
    image: File | null;
}

export default function SignUp() {
    const url = useBase();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SignUpData>({
        username: '',
        name: '',
        email: '',
        password: '',
        password2: '',
        image: null,
    });
    const navigate = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData((pre) => ({
                ...pre,
                'image': e.target.files ? e.target.files[0] : null,
            }));
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value,
        }));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            // if (data.password.length < 6 || data.password2.length < 6) {
            //     toast.error("Password should be length of 6 or more");
            //     return;
            // }
            // if (data.password !== data.password2) {
            //     toast.error("Enter both same password");
            //     return;
            // }

            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('password2', data.password2);

            if (data.image) {
                formData.append('image', data.image);
            }

            await axios.post(url + "/auth/register", formData)
                .then(res => {
                    toast.success("Successful sign up");
                    navigate.replace("/auth/login");
                })
                .catch(e => {
                    toast.error(e.response.data.message || 'Server Error');
                })
        }
        catch (e) {
            // console.log(e.response.data);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full flex flex-col'>
            <PathHeader path={usePathname()} />
            <div className='w-full h-[150px] bg-[url("/cover.jpeg")] bg-cover bg-no-repeat'>
                <div className='w-full h-full bg-black bg-opacity-40 text-center flex justify-center items-center text-white text-xl font-semibold'>
                    Customer Register
                </div>
            </div>

            <div className='w-full lg:px-[200px] px-[30px] py-[30px] flex lg:justify-between items-center lg:items-start flex-col gap-[40px] lg:flex-row'>
                <form
                    action=""
                    method='POST'
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className='w-full g:w-1/2 flex flex-col md:flex-row justify-between items-center gap-[20px]'>
                    <div className='w-full lg:w-1/2 flex flex-col items-start gap-[20px]'>
                        <div>
                            <h1 className='text-lg font-semibold'>SIGN-UP INFORMATION</h1>
                            <h1 className='text-md text-gray-500'>Create new account</h1>
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <h1>Username<span className='text-red-400'>*</span></h1>
                            <input
                                type="text"
                                name='username'
                                value={data.username}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-2 rounded-md outline-none border-2'
                                placeholder='Enter Username...' />
                        </div>

                        <div className='flex flex-col w-full gap-2'>
                            <h1>Name<span className='text-red-400'>*</span></h1>
                            <input
                                type="text"
                                name='name'
                                value={data.name}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-2 rounded-md outline-none border-2'
                                placeholder='Enter Name...' />
                        </div>

                        <div className='flex flex-col w-full gap-2'>
                            <h1>Email<span className='text-red-400'>*</span></h1>
                            <input
                                type="text"
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-2 rounded-md outline-none border-2'
                                placeholder='Enter Email...' />
                        </div>

                        <div className='flex flex-col w-full gap-2'>
                            <h1>Password<span className='text-red-400'>*</span></h1>
                            <div className='px-4 py-2 rounded-md border-2 flex gap-4'>
                                <input
                                    type="password"
                                    name='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                    className='w-full outline-none'
                                    placeholder='Enter Password...' />
                                <Eye />
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-2'>
                            <h1>Confirm Password<span className='text-red-400'>*</span></h1>
                            <div className='px-4 py-2 rounded-md border-2 flex gap-4'>
                                <input
                                    type="password"
                                    name='password2'
                                    value={data.password2}
                                    onChange={handleChange}
                                    required
                                    className='w-full outline-none'
                                    placeholder='Confirm Password...' />
                                <Eye />
                            </div>
                        </div>


                        <div className='w-full flex items-center justify-between mt-[15px]'>
                            <button
                                type='submit'
                                className='px-4 py-2 rounded-lg bg-slate-300'>
                                Sign Up
                            </button>
                            <Link
                                href={"/auth/login"}
                                className='px-4 py-2 rounded-lg bg-green-300'>
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className='w-full lg:w-1/2 flex flex-col gap-4 items-center justify-center'>
                        <div className='max-w-[250px] max-h-[250px] w-[400px] h-[400px] rounded-full shadow-md shadow-black flex justify-center items-center'>
                            {data.image && <img
                                className='w-full h-full rounded-full'
                                src={URL.createObjectURL(data.image)} />}
                        </div>
                        <input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="flex h-10 max-w-full w-[300px] rounded-md border border-input bg-white px-3 py-2 text-sm 
                                text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
                        <h1 className='text-xl font-semibold'>Choose Profile Image</h1>
                    </div>
                </form>
            </div>
            {loading && <Loader />}
        </div>
    )
}
