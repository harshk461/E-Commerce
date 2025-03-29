'use client'

import Loader from '@/app/Utils/Loader/Loader'
import PathHeader from '@/app/Utils/PathHeader/PathHeader'
import useBase from '@/app/hooks/useBase'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            if (data.password.length < 6 || data.password2.length < 6) {
                toast.error("Password should be length of 6 or more");
                setLoading(false);
                return;
            }
            if (data.password !== data.password2) {
                toast.error("Enter both same password");
                setLoading(false);
                return;
            }

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
            toast.error("An error occurred. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    const getPasswordStrength = (password: string) => {
        if (!password) return '';
        if (password.length < 6) return 'Weak';
        if (password.length < 10) return 'Medium';
        return 'Strong';
    }

    const getPasswordStrengthColor = (strength: string) => {
        switch (strength) {
            case 'Weak': return 'bg-red-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Strong': return 'bg-green-500';
            default: return '';
        }
    }

    const passwordStrength = getPasswordStrength(data.password);
    const strengthColor = getPasswordStrengthColor(passwordStrength);

    return (
        <div className='w-full flex flex-col'>
            <PathHeader path={usePathname()} />
            <div className='w-full h-[150px] bg-[url("/cover.jpeg")] bg-cover bg-no-repeat'>
                <div className='w-full h-full bg-black bg-opacity-40 text-center flex justify-center items-center text-white text-xl font-semibold'>
                    Customer Register
                </div>
            </div>

            <div className='w-full max-w-6xl mx-auto lg:px-[50px] px-[30px] py-[30px]'>
                <div className='bg-white rounded-lg shadow-lg p-8'>
                    <form
                        action=""
                        method='POST'
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className='w-full flex flex-col lg:flex-row justify-between items-center gap-[30px]'>
                        <div className='w-full lg:w-1/2 flex flex-col items-start gap-[20px]'>
                            <div>
                                <h1 className='text-2xl font-bold text-gray-800'>Create Account</h1>
                                <h1 className='text-md text-gray-500 mt-1'>Join our community today</h1>
                            </div>
                            <div className='flex flex-col w-full gap-2'>
                                <h1 className='font-medium'>Username<span className='text-red-400'>*</span></h1>
                                <input
                                    type="text"
                                    name='username'
                                    value={data.username}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-blue-500 transition-all'
                                    placeholder='Enter Username...' />
                            </div>

                            <div className='flex flex-col w-full gap-2'>
                                <h1 className='font-medium'>Name<span className='text-red-400'>*</span></h1>
                                <input
                                    type="text"
                                    name='name'
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-blue-500 transition-all'
                                    placeholder='Enter Name...' />
                            </div>

                            <div className='flex flex-col w-full gap-2'>
                                <h1 className='font-medium'>Email<span className='text-red-400'>*</span></h1>
                                <input
                                    type="email"
                                    name='email'
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 rounded-md outline-none border border-gray-300 focus:border-blue-500 transition-all'
                                    placeholder='Enter Email...' />
                            </div>

                            <div className='flex flex-col w-full gap-2'>
                                <h1 className='font-medium'>Password<span className='text-red-400'>*</span></h1>
                                <div className='px-4 py-3 rounded-md border border-gray-300 focus-within:border-blue-500 transition-all flex gap-4'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        value={data.password}
                                        onChange={handleChange}
                                        required
                                        className='w-full outline-none'
                                        placeholder='Enter Password...' />
                                    <div 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer text-gray-500 hover:text-gray-700">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </div>
                                </div>
                                {data.password && (
                                    <div className="w-full mt-1">
                                        <div className="h-1 w-full bg-gray-200 rounded-full">
                                            <div className={`h-full ${strengthColor} rounded-full`} style={{ width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%' }}></div>
                                        </div>
                                        <p className="text-xs mt-1 text-gray-500">Password strength: {passwordStrength}</p>
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-col w-full gap-2'>
                                <h1 className='font-medium'>Confirm Password<span className='text-red-400'>*</span></h1>
                                <div className='px-4 py-3 rounded-md border border-gray-300 focus-within:border-blue-500 transition-all flex gap-4'>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name='password2'
                                        value={data.password2}
                                        onChange={handleChange}
                                        required
                                        className='w-full outline-none'
                                        placeholder='Confirm Password...' />
                                    <div 
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="cursor-pointer text-gray-500 hover:text-gray-700">
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </div>
                                </div>
                                {data.password2 && data.password !== data.password2 && (
                                    <p className="text-xs text-red-500">Passwords do not match</p>
                                )}
                            </div>

                            <div className='w-full flex items-center justify-between mt-[15px]'>
                                <button
                                    type='submit'
                                    className='px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all'>
                                    Create Account
                                </button>
                                <Link
                                    href={"/auth/login"}
                                    className='px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-all'>
                                    Sign In Instead
                                </Link>
                            </div>
                        </div>

                        <div className='w-full lg:w-1/2 flex flex-col gap-6 items-center justify-center bg-gray-50 p-8 rounded-lg'>
                            <h1 className='text-xl font-semibold text-gray-800'>Profile Picture</h1>
                            <div className='w-[200px] h-[200px] rounded-full bg-gray-200 shadow-md flex justify-center items-center overflow-hidden border-4 border-white'>
                                {data.image ? 
                                    <img
                                        className='w-full h-full object-cover'
                                        src={URL.createObjectURL(data.image)} 
                                        alt="Profile preview" /> : 
                                    <div className="text-gray-400 text-center px-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <p className="mt-2">No image selected</p>
                                    </div>
                                }
                            </div>
                            <div className="w-full max-w-xs">
                                <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Image
                                </label>
                                <input
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm 
                                        text-gray-600 file:border-0 file:bg-gray-100 file:text-gray-700 file:text-sm file:font-medium
                                        file:mr-4 file:py-2 file:px-4 hover:file:bg-gray-200 cursor-pointer" />
                                <p className="mt-1 text-xs text-gray-500">
                                    JPG, PNG or GIF (Max. 5MB)
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}
