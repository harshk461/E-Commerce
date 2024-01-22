/* eslint-disable react/no-unescaped-entities */
'use client'

import React from 'react'
import PathHeader from '../Utils/PathHeader/PathHeader'
import { usePathname } from 'next/navigation'

export default function Page() {
    return (
        <div className='w-full flex flex-col'>
            <PathHeader path={usePathname()} />
            <div className='max-w-full w-[900px] flex flex-col items-center lg:items-start lg:mt-[100px] m-auto p-4'>
                <h1 className='text-4xl font-bold text-blue-600 my-[50px]'>Shipping & Returns</h1>

                <div className='flex flex-col max-w-full w-[700px] gap-[20px]'>
                    <h1 className='text-xl font-semibold mb-[20px]'>Shipping Policy</h1>
                    <div className='w-full text-gray-500'>
                        I’m a Shipping Policy section. I’m a great place to update your customers about your shipping methods, packaging and costs. Use plain, straightforward language to build trust and make sure that your customers stay loyal!
                    </div>
                    <div className='w-full text-gray-500'>
                        I’m a Shipping Policy section. I’m a great place to update your customers about your shipping methods, packaging and costs. Use plain, straightforward language to build trust and make sure that your customers stay loyal!
                    </div>
                </div>
                <div className='flex flex-col max-w-full w-[700px] gap-[20px] my-[50px]'>
                    <h1 className='text-xl font-semibold mb-[20px]'>Return & Exchange Policy</h1>
                    <div className='w-full text-gray-500'>
                        I’m a return policy section. I’m a great place to let your customers know what to do in case they’ve changed their mind about their purchase, or if they’re dissatisfied with a product. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence
                    </div>
                    <div className='w-full text-gray-500'>
                        I'm the second paragraph in your Return & Exchange policy. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add details about your policy and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.
                    </div>
                </div>
            </div>
        </div>
    )
}
