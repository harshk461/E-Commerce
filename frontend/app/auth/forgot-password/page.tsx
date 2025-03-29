/* eslint-disable react/no-unescaped-entities */
'use client'

import Loader from '@/app/Utils/Loader/Loader';
import PathHeader from '@/app/Utils/PathHeader/PathHeader'
import useBase from '@/app/hooks/useBase';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [receivedOTP, setReceivedOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const url = useBase();
    const router = useRouter();

    const getOTP = async () => {
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            await axios.get(url + "/auth/forgot-password/" + email)
                .then(res => {
                    if (res.data.status === 'error') {
                        toast.error(res.data.message);
                        return;
                    }
                    setReceivedOTP(res.data.otp);
                    toast.success("OTP sent to your email");
                    setStep(2);
                })
        }
        catch (e) {
            console.log(e);
            toast.error("Server Error");
        }
        finally {
            setLoading(false);
        }
    }

    const handleVerify = () => {
        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }

        if (receivedOTP === otp) {
            setStep(3);
            toast.success("Email verified successfully");
            return;
        }
        else {
            toast.error("Incorrect OTP");
            return;
        }
    }

    const changePassword = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password should be at least 6 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await axios.post(url + "/auth/reset-password", {
                email,
                newPassword,
                otp: receivedOTP
            })
            .then(res => {
                if (res.data.status === 'error') {
                    toast.error(res.data.message);
                    return;
                }
                toast.success("Password changed successfully");
                router.push("/auth/login");
            })
        }
        catch (e) {
            toast.error("Server Error");
        }
        finally {
            setLoading(false);
        }
    }

    const getPasswordStrength = (password:any) => {
        if (!password) return '';
        if (password.length < 6) return 'Weak';
        if (password.length < 10) return 'Medium';
        return 'Strong';
    }

    const getPasswordStrengthColor = (strength:any) => {
        switch (strength) {
            case 'Weak': return 'bg-red-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Strong': return 'bg-green-500';
            default: return '';
        }
    }

    const passwordStrength = getPasswordStrength(newPassword);
    const strengthColor = getPasswordStrengthColor(passwordStrength);

    return (
        <div className='w-full h-full flex flex-col'>
            <PathHeader path={usePathname()} />
            <div className='w-full h-[150px] bg-[url("/cover.jpeg")] bg-cover bg-no-repeat'>
                <div className='w-full h-full bg-black bg-opacity-40 text-center flex justify-center items-center text-white text-xl font-semibold'>
                    Forgot Password
                </div>
            </div>

            <div className='flex max-w-full w-[450px] mx-auto my-[30px]'>
                <div className='w-full bg-white rounded-lg shadow-lg p-6'>
                    {step === 1 && (
                        <div className='w-full flex flex-col justify-center gap-4'>
                            <h1 className='text-xl font-bold text-center text-gray-800 mb-2'>
                                Reset Your Password
                            </h1>
                            <p className='text-md text-gray-600 text-center mb-4'>
                                Enter your email address to receive a One-Time Password (OTP) for resetting your password.
                            </p>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email" className='font-medium text-gray-700'>Email Address</label>
                                <input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all'
                                    type="email"
                                    placeholder='Enter your email address'
                                />
                            </div>
                            <button
                                onClick={getOTP}
                                className='w-full px-4 py-3 mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-all'>
                                Send OTP
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className='w-full flex flex-col justify-center gap-4'>
                            <h1 className='text-xl font-bold text-center text-gray-800 mb-2'>Email Verification</h1>
                            <p className='text-md text-gray-600 text-center mb-4'>
                                We've sent a 6-digit code to {email}. Enter the code below to verify your email.
                            </p>
                            <div className='w-full'>
                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="text"
                                    maxLength={6}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all text-center text-xl tracking-widest'
                                    placeholder='Enter OTP'
                                />
                            </div>
                            <button
                                onClick={handleVerify}
                                className='w-full px-4 py-3 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-all'>
                                Verify OTP
                            </button>
                            <div className='flex justify-center mt-2 text-sm'>
                                <span className='text-gray-600'>Didn't receive the code?</span>
                                <button
                                    onClick={getOTP}
                                    className='text-blue-600 font-medium ml-2 hover:text-blue-800'>
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className='w-full flex flex-col justify-center gap-4'>
                            <h1 className='text-xl font-bold text-center text-gray-800 mb-2'>
                                Create New Password
                            </h1>
                            <p className='text-md text-gray-600 text-center mb-4'>
                                Your identity has been verified. Set your new password.
                            </p>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="newPassword" className='font-medium text-gray-700'>New Password</label>
                                <div className='flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 transition-all'>
                                    <input
                                        id="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className='w-full outline-none'
                                        placeholder='Enter new password'
                                    />
                                    <div 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="cursor-pointer text-gray-500 hover:text-gray-700 ml-2">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </div>
                                </div>
                                {newPassword && (
                                    <div className="w-full mt-1">
                                        <div className="h-1 w-full bg-gray-200 rounded-full">
                                            <div className={`h-full ${strengthColor} rounded-full`} style={{ width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%' }}></div>
                                        </div>
                                        <p className="text-xs mt-1 text-gray-500">Password strength: {passwordStrength}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className='flex flex-col gap-2 mt-2'>
                                <label htmlFor="confirmPassword" className='font-medium text-gray-700'>Confirm Password</label>
                                <div className='flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 transition-all'>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className='w-full outline-none'
                                        placeholder='Confirm new password'
                                    />
                                    <div 
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="cursor-pointer text-gray-500 hover:text-gray-700 ml-2">
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </div>
                                </div>
                                {confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-xs text-red-500">Passwords do not match</p>
                                )}
                            </div>

                            <button
                                onClick={changePassword}
                                className='w-full px-4 py-3 mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-all'>
                                Reset Password
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}
