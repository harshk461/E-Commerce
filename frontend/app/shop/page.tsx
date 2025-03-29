// app/page.tsx
import React from 'react';
import { getAllProducts, getTotalProductsCount } from '../shop-action/action';
import ProductList from './ProducList';

interface ProductData {
    _id: string;
    name: string;
    price: number;
    trending: boolean;
    ratings: number;
    images: {
        public_id: string;
        url: string;
    }[]
}

export default async function Page() {
    let products: ProductData[] = [];
    let error: string | null = null;
    let totalPages: number = 1;

    try {
        const currentPage: number = 1;  //Start on page 1
        const s="";
        const { data, error: productsError } = await getAllProducts(s,currentPage);
        if (productsError) {
            error = productsError;
        } else {
            products = data;
        }

        const ITEMS_PER_PAGE = 12;  //Set item per page for total pages count

        const { count, error: countError } = await getTotalProductsCount();

        if (countError) {
            console.error("Failed to fetch total products count:", countError);
            error = "Failed to fetch total product count.";
        } else {
            totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        }
    } catch (e) {
        error = "An unexpected error occurred.";
        console.error(e);
    }

    return (
        <ProductList
            initialProducts={products}
            initialError={error}
            initialTotalPages={totalPages}
        />
    );
}
