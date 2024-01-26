import { Minus, Plus, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CartProductBox() {
    return (
        <div className='w-full my-[15px] flex justify-between flex-col md:flex-row gap-4 items-center lg:items-start'>
            <div className='w-full md:w-fit flex items-start gap-4 justify-between md:justify-normal'>
                <Link href={"/"}>
                    <img
                        className='w-[100px] h-[100px] border-2 border-gray-300'
                        src="https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg"
                        alt="image" />
                </Link>

                <div className='flex flex-col items-start'>
                    <h1 className='text-lg'>Im Product</h1>
                    <h1>$ 29.00</h1>
                </div>
            </div>

            <div className='w-full justify-between md:justify-normal md:w-fit flex h-fit md:gap-8'>
                <div className='border-2 border-gray-400 flex px-1 gap-1 items-center'>
                    <Minus size={12} />
                    <input
                        className='w-[40px] text-black outline-none text-center'
                        max="1"
                        type="number"
                    />
                    <Plus size={12} />
                </div>
                <div>
                    $ 29.00
                </div>
                <div className='mr-[20px]'>
                    <X size={20} />
                </div>
            </div>
        </div>
    )
}
