'use client'

import PathHeader from '@/app/Utils/PathHeader/PathHeader';
import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { Eye, EyeOffIcon } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Visibility {
    pass1: boolean,
    pass2: boolean,
}

export default function Page() {
    const { token } = useParams();

    const baseurl = useBase();
    const navigate = useRouter();
    const [loading, setLoading] = useState<Boolean | null>(null);
    const [visibility, setVisibility] = useState<Visibility>({
        pass1: false,
        pass2: false,
    });

    const [data, setData] = useState({
        password: '',
        confirmpassword: '',
    });

    const dataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChange = (name: string) => {
        setVisibility(prevVisibility => ({
            ...prevVisibility,
            [name]: !prevVisibility[name],
        }));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (data.password !== data.confirmpassword) {
                toast.error("Both Password Should be same");
                return;
            }

            setLoading(true);
            await axios.put(baseurl + "/auth/reset-password/" + token, data)
                .then(res => {
                    toast.success("Password Changed");
                    navigate.replace("/auth/login");
                })
                .catch(e => {
                    toast.error(e.response.data.message);
                })
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false); e
        }
    };

    return (
        <div className='w-full flex flex-col'>
            <PathHeader path={usePathname()} />
            <div className='max-w-full w-[450px] h-full m-auto p-4 md:mt-[100px] mt-[50px]'>
                <div className='w-full flex flex-col px-4 py-8 shadow-md shadow-gray-500 rounded-lg'>
                    <h1 className='text-center text-3xl font-semibold mb-[20px]'>Reset Password</h1>
                    <form
                        method='PUT'
                        action=""
                        onSubmit={handleSubmit}
                        className='w-full flex flex-col gap-4'>
                        <div className='w-full flex gap-2 items-center px-4 py-2 border-2 border-gray-300 rounded-lg'>
                            <input
                                type={visibility.pass1 ? "text" : "password"}
                                placeholder='Enter New Password'
                                className='outline-none w-full'
                                name='password'
                                value={data.password}
                                onChange={dataChange}
                                required />
                            {visibility.pass1 ? <EyeOffIcon onClick={() => handleChange('pass1')} /> : <Eye onClick={() => handleChange('pass1')} />}
                        </div>
                        <div className='w-full flex gap-2 items-center px-4 py-2 border-2 border-gray-300 rounded-lg'>
                            <input
                                type={visibility.pass2 ? "text" : "password"}
                                placeholder='Confirm New Password'
                                className='outline-none w-full'
                                name='confirmpassword'
                                value={data.confirmpassword}
                                onChange={dataChange}
                                required />
                            {visibility.pass2 ? <EyeOffIcon onClick={() => handleChange('pass2')} /> : <Eye onClick={() => handleChange('pass2')} />}
                        </div>

                        <button
                            type='submit'
                            className='px-6 py-2 rounded-md text-white font-semibold bg-green-400 w-fit self-end shadow-md shadow-gray-500'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
