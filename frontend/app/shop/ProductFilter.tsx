// components/ProductFilter.tsx
'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProductFilterProps {
    dataLength: number;
    filters: string[];
    filterType: number;
    setFilterType: React.Dispatch<React.SetStateAction<number>>;
    filterWindow: Boolean | null;
    setFilterWindow: React.Dispatch<React.SetStateAction<Boolean | null>>;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
    dataLength,
    filters,
    filterType,
    setFilterType,
    filterWindow,
    setFilterWindow
}) => {
    return (
        <div className='hidden lg:flex justify-between items-start text-lg font-semibold my-[30px]'>
            <div>
                {dataLength + " Products"}
            </div>

            <div className='hidden relative w-fit lg:flex flex-col items-center'>
                <div
                    onClick={() => setFilterWindow(!filterWindow)}
                    className='cursor-pointer flex gap-2 items-center text-md'>
                    Sort by: {filters[filterType]} {filterWindow ? <ChevronDown /> : <ChevronUp />}
                </div>
                <div className={`absolute top-full left-0 ${filterWindow ? 'block translate-y-[0%] z-10' : 'hidden'} w-[250px] bg-white rounded-xl`}>
                    <ul className='shadow-lg shadow-black border-2 border-black z-10 rounded-lg text-md'>
                        {filters.map((filter, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setFilterType(index);
                                    setFilterWindow(false);
                                }}
                                className={`cursor-pointer py-3 px-5 hover:bg-gray-300 transition-all duration-200 ${filterType === index ? 'bg-gray-500 text-white' : ''}`}>{filter}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
