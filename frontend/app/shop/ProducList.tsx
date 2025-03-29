// app/ProductList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ItemBox from '../Utils/ItemBox/ItemBox';
import { getAllProducts } from '../shop-action/action';

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

interface ProductListProps {
    initialProducts: ProductData[];
    initialError: string | null;
    initialTotalPages: number;
}

export default function ProductList({ initialProducts, initialError, initialTotalPages }: ProductListProps) {
    const [products, setProducts] = useState<ProductData[]>(initialProducts);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(initialError);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await getAllProducts(currentPage);
                if (error) {
                    setError(error);
                    setProducts([]); // Clear products on error
                } else {
                    setProducts(data);
                }
            } catch (e) {
                setError("An unexpected error occurred.");
                console.error(e);
                setProducts([]); // Clear products on error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div>
            <div className='w-full h-full flex flex-wrap gap-4'>
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : products.length > 0 ? (
                    products.map((item) => (
                        <ItemBox
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            isSale={item.trending}
                            rating={item.ratings}
                            url={item.images}
                        />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>

            {/* Pagination Section */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mx-2 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                {renderPaginationButtons()}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="mx-2 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
