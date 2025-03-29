// components/ProductList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import ItemBox from '@/app/Utils/ItemBox/ItemBox';
import MobileFilter from '../MobileFilter';
import ProductFilter from '../ProductFilter';
import Loader from '@/app/Utils/Loader/Loader';
import Pagination from '../Pagination';  // Import the Pagination component

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

interface ProductListProps {
    initialData: ProductData[];
    initialError: string | null;
    type: string;
    initialCurrentPage: number;  // Add currentPage to props
    initialTotalPages: number;  // Add totalPages to props
}

export default function ProductList({
    initialData,
    initialError,
    type,
    initialCurrentPage,
    initialTotalPages
}: ProductListProps) {
    const [data, setData] = useState<ProductData[]>(initialData);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(initialError);
    const [filterType, setFilterType] = useState<number>(0);
    const [filterWindow, setFilterWindow] = useState<Boolean | null>(null);
    const [browserWindow, setBrowserWindow] = useState<Boolean | null>(null);
    const [mobileFilterWindow, setMobileFilterWindow] = useState<Boolean | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage); // Use initialCurrentPage
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages);   // Use initialTotalPages
    const filters = ['Recommended', 'Newest', 'Price:(Low to High)', 'Price:(High to Low)', 'Name:(A-Z)', 'Name:(Z-A)'];
    const ITEMS_PER_PAGE = 12;  // It's used so it should be a state.

    useEffect(() => {
        const filterData = async () => {
            setLoading(true);
            setError(null);

            try {
                // const { data, error } = await getAllProducts(type); //Remove this since pagination changes the data
                // if (error) {
                //     setError(error);
                //     setData([]); // Clear products on error
                // } else {
                //     setData(data);
                // }
                let newData: ProductData[] = [...data]; //Don't need it

                switch (filterType) {
                    case 0:
                        // No filter, set data as is
                        break;
                    case 1:
                        // Newest: Sort by date or any other relevant field
                        newData.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
                        break;
                    case 2:
                        // Price: Low to High
                        newData.sort((a, b) => a.price - b.price);
                        break;
                    case 3:
                        // Price: High to Low
                        newData.sort((a, b) => b.price - a.price);
                        break;
                    case 4:
                        // Name: A-Z
                        newData.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 5:
                        // Name: Z-A
                        newData.sort((a, b) => b.name.localeCompare(a.name));
                        break;
                    default:
                        break;
                }
                setData([...newData]);  // Important: Create a new array to trigger re-render

            } catch (e) {
                setError("An unexpected error occurred.");
                console.error(e);
                setData([]); // Clear products on error
            } finally {
                setLoading(false);
            }
        };

        filterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterType]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                //Fetch Data from the server on a page change
                //Remember to add the page number with every request
                // const { data, error } = await getAllProducts(type, currentPage);

                // if (error) {
                //     setError(error);
                //     setProducts([]); // Clear products on error
                // } else {
                //     setProducts(data);
                // }
                // const { count, error: countError } = await getTotalProductsCount();

                // if (countError) {
                //     console.error("Failed to fetch total products count:", countError);
                //     setError("Failed to fetch total product count.");
                // } else {
                //     setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
                // }

            } catch (e) {
                setError("An unexpected error occurred.");
                console.error(e);
                //setProducts([]); // Clear products on error
            } finally {
                setLoading(false);
            }
        };

        //fetchData();Comment for now since we have a default props,
    }, [currentPage, type]); //Call this fetch the first time this component is loaded.

    return (
        <>
            <ProductFilter
                dataLength={data.length}
                filters={filters}
                filterType={filterType}
                setFilterType={setFilterType}
                filterWindow={filterWindow}
                setFilterWindow={setFilterWindow}
            />
            <MobileFilter
                browserWindow={browserWindow}
                setBrowserWindow={setBrowserWindow}
                mobileFilterWindow={mobileFilterWindow}
                setMobileFilterWindow={setMobileFilterWindow}
                filters={filters}
                filterType={filterType}
                setFilterType={setFilterType}
            />
            <div className='w-full h-full grid lg:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center'>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    data.map((item, i) => (
                        <ItemBox
                            key={i}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            isSale={true}
                            rating={item.ratings}
                            url={item.images}
                        />
                    ))
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}
