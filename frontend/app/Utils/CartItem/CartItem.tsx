import { Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CartItem() {
    return (
        <div className='w-full flex gap-3 items-start justify-start bg-white rounded-lg shadow-lg shadow-black p-2'>
            <div>
                <Link href={"/"}>
                    <img
                        className='w-[100px] h-[100px] border-2 border-gray-300'
                        src="https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg"
                        alt="image" />
                </Link>
            </div>

            <div className='flex flex-col gap-2'>
                <h1>Im Product</h1>
                <h1 className='text-lg font-semibold'>$ 12.00</h1>
                <div className='border-2 border-gray-400 flex px-1 gap-1 items-center rounded-md'>
                    <Minus size={12} />
                    <input
                        className='w-[40px] text-black outline-none text-center'
                        max="1"
                        type="number"
                    />
                    <Plus size={12} />
                </div>
            </div>
        </div>
    )
}
