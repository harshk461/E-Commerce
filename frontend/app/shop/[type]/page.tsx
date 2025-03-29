// app/shop/[type]/page.tsx
'use client'
import React from 'react';
import { getAllProducts, getTotalProductsCount } from '@/app/shop-action/action';  // Adjust path
import ProductList from './ProductList';
import { Metadata } from 'next';
import { useParams } from 'next/navigation';

interface ProductData {
    _id: string;
    name: string;
    description: string;
    images: {
        url: string;
        public_id: string;
    }[];
    ratings: number;
    price: number;
    createdAt: string;
}

interface Params {
    type: string;
}

interface Props {
    params: Params;
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateTitle({ params }: { params: { type: string } }): Promise<Metadata> {
    const capitalizedTitle = (params.type as string).split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
        title: `${capitalizedTitle} - Your Shop Name`,
    }
}

const ITEMS_PER_PAGE = 12; // Define items per page

export default async function Type({ params, searchParams }: Props) {
    const { type } = useParams();
    // const s = type.split("-").join(" ");
    const s='cats'
    const page = Number(searchParams?.page) || 1; // Get current page from search params


    let data: ProductData[] = [];
    let error: string | null = null;
    let totalPages: number = 1;
    try {
        const result = await getAllProducts(s, page); // Pass the 'type' parameter and page
        if (result.error) {
            error = result.error;
        } else {
            data = result.data;
        }

        const countResult = await getTotalProductsCount();  //Get the total amount of data

        if (countResult.error) {
            error = countResult.error;
        } else {
            totalPages = Math.ceil(countResult.count / ITEMS_PER_PAGE);
        }
    } catch (e) {
        error = "Server Error";
        console.error(e);
    }

    return (
        <div className='relative w-full h-full flex flex-col lg:p-[50px]'>
            {/* Title Header */}
            <div className='text-4xl font-bold text-center'>
                {(type as string).split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>

            <ProductList
                initialData={data}
                initialError={error}
                type={type}
                initialCurrentPage={page}  // Pass current page
                initialTotalPages={totalPages} // Pass total pages
            />
        </div>
    );
}
