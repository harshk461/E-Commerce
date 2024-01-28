import { Pencil } from 'lucide-react'
import React from 'react'

interface Props {
    setWindow: Function;
    setData: Function;
    isUpdate: Function;
}

export default function AddressBox({ setWindow, setData, isUpdate }: Props) {
    const edit = () => {
        setWindow(true);
        const data = {
            address: 'jsk',
            name: 'sagdklsd',
            city: 'sdksld',
            country: 'india',
            state: "delhi",
            pinCode: 110012,
            phone: 123456789,
        };
        setData(data);
        isUpdate(true);
    }

    return (
        <div className='w-full p-3 md:p-6 border-2 border-gray-300 rounded-md flex justify-between items-start flex-wrap gap-4 mt-4'>
            <div className='max-w-full w-[270px] flex flex-col items-start'>
                <h1 className='text-xl font-semibold mb-2'>Name</h1>
                <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </h1>
                <h1>State,Country</h1>
                <h1 className='text-sm text-gray-500'>Pincode</h1>
                <h1 className='text-sm text-gray-500'>Phone</h1>
            </div>

            <h1
                onClick={edit}
                className='text-lg font-semibold underline text-blue-400 flex cursor-pointer'><Pencil />Edit</h1>
        </div>
    )
}
