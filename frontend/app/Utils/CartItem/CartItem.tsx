import useBase from "@/app/hooks/useBase";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  cart: CartItemInterface;
  remove: (id: string) => Promise<void>;
}

interface CartItemInterface {
  productId?: string;
  name: string;
  price: number;
  quantity?: number;
  image: string;
  remove?: Function;
}

const CartItem: React.FC<Props> = ({ cart, remove }) => {
  const handleRemoveFromCart = async (id: string) => {
    await remove(id);
  };

  return (
    <div className="w-full flex bg-white rounded-lg shadow-md p-4 mt-4 justify-between items-center">
      <div className="flex items-center gap-4">
        <div>
          <Link href={`/product/${cart.productId}`}>
            <img
              className="w-24 h-24 object-cover rounded-lg border border-gray-300"
              src={cart.image}
              alt="image"
            />
          </Link>
        </div>

        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{cart.name}</h1>
          <h1 className="text-md font-semibold">${cart.price}</h1>
          <h1 className="text-sm text-gray-600">Quantity: {cart.quantity}</h1>
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
      <div className="flex items-center">
        {cart.productId && (
          <button
            onClick={() => handleRemoveFromCart(cart.productId as string)}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition duration-300"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
