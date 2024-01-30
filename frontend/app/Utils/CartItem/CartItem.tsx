import { Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface CartItem {
    product_id?: string;
    product_name: string;
    price: number;
    quantity?: number;
    image: string;
}


export default function CartItem({ cart }: { cart: CartItem }) {
    return (
        <div className='w-full flex gap-3 items-start justify-start bg-white rounded-lg border-2 border-gray-300 p-2 mt-[10px]'>
            <div>
                <Link href={`/product/${cart.product_id}`}>
                    <img
                        className='w-[100px] h-[100px] border-2 border-gray-300'
                        src={cart.image}
                        alt="image" />
                </Link>
            </div>

            <div className='flex flex-col gap-2'>
                <h1>{cart.product_name}</h1>
                <h1 className='text-lg font-semibold'>$ {cart.price}</h1>
                <h1>Quantity: {cart.quantity}</h1>
                {/* <div className='border-2 border-gray-400 flex px-1 gap-1 items-center rounded-md'>
                    <Minus size={12} />
                    <input
                        className='w-[40px] text-black outline-none text-center'
                        max="1"
                        type="number"
                    />
                    <Plus size={12} />
                </div> */}
            </div>
        </div>
    )
}
