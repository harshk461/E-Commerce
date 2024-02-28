/* eslint-disable react/no-unescaped-entities */
'use client'

import Loader from '@/app/Utils/Loader/Loader';
import PathHeader from '@/app/Utils/PathHeader/PathHeader'
import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { setRequestMeta } from 'next/dist/server/request-meta';
import { usePathname } from 'next/navigation';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

export default function ForgotPassword() {
    const [showInitialWindow, setShowInitialWindow] = useState(false);
    const [otp, setOtp] = useState('123456');
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [receivedOTP, setreceivedOTP] = useState('123456');
    const url = useBase();
    const [loading, setLoading] = useState(false);
    const GetOTP = async () => {
        try {
            setLoading(true);
            await axios.get(url + "/auth/forgot-password/" + email)
                .then(res => {
                    if (res.data.status === 'error') {
                        toast.error(res.data.message);
                        return;
                    }
                    setreceivedOTP(res.data.otp);
                })
            setStep(2);
        }
        catch (e) {
            toast.error("Server Error");
        }
        finally {
            setLoading(false);
        }
    }

    const handleVerify = () => {
        if (receivedOTP === otp) {
            setStep(3);
            toast.success("User Verified");
            return;
        }
        else {
            toast.error("Incorrect OTP");
            return;
        }
    }

    const changePassword = async () => {
        try {
            setLoading(true);
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
            <PathHeader path={usePathname()} />
            <div className='w-full h-[150px] bg-[url("/cover.jpeg")] bg-cover bg-no-repeat'>
                <div className='w-full h-full bg-black bg-opacity-40 text-center flex justify-center items-center text-white text-xl font-semibold'>
                    Forgot Password
                </div>
            </div>

            <div className='flex max-w-full w-[400px] mx-auto my-[30px]'>

                {step === 1 && <div className='max-w-full w-[400px] flex flex-col justify-center gap-4 p-4 my-4'>
                    <h1 className='text-md font-semibold'>
                        Enter your email address to receive a One-Time Password (OTP) for resetting your password.
                    </h1>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-4 py-2 border-2 rounded-lg my-4 outline-none'
                        type="email"
                        placeholder='Enter Email...'
                    />
                    <button
                        onClick={GetOTP}
                        className='px-4 py-2 rounded-lg bg-green-500 font-bold text-yellow-50'>
                        Get OTP
                    </button>
                </div>}

                {step === 2 && <div className='max-w-full w-[400px] flex flex-col justify-center gap-4 p-4 my-4'>
                    <h1 className='text-xl font-bold text-center'>Enter OTP for Email Verification</h1>
                    <div className='m-auto w-full'>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            maxLength={6}
                            className='w-full py-3 rounded-lg shadow-md outline-none my-4 text-center'
                            placeholder='Enter OTP'
                        />
                    </div>
                    <button
                        onClick={handleVerify}
                        className='w-fit px-6 py-2 rounded-md bg-green-500 font-semibold text-white m-auto shadow-lg'>
                        Verify
                    </button>
                    <div className='flex justify-center my-4 font-semibold'>
                        <span>Didn't receive OTP?</span>
                        <button
                            onClick={GetOTP}
                            className='text-blue-400 ml-2'>
                            Resend OTP
                        </button>
                    </div>
                </div>
                }

                {/*Change Password*/}
                {step === 3 && <div className='max-w-full w-[400px] flex flex-col justify-center gap-4 p-4 my-4'>
                    <div className='text-xl font-semibold text-center'>
                        Change Password
                    </div>
                    <input
                        type="text"
                        className='w-full px-4 py-2 rounded-md shadow-md shadow-gray-400 outline-none my-4'
                        placeholder='Enter New Password' />
                    <input
                        type="text"
                        className='w-full px-4 py-2 rounded-md shadow-md shadow-gray-400 outline-none mb-4'
                        placeholder='Confirm New Password' />

                    <button
                        onClick={changePassword}
                        className='px-8 py-2 rounded-lg  bg-green-500 font-semibold text-white w-fit m-auto'>
                        Submit
                    </button>
                </div>}
            </div>
            {loading && <Loader />}
        </div>
    )
}
