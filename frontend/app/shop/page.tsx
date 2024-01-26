'use client'

import React, { useEffect, useState } from 'react'
import ItemBox from '../Utils/ItemBox/ItemBox';
import toast from 'react-hot-toast';
import axios from 'axios';
import useBase from '../hooks/useBase';

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

export default function Page() {
    const [data, setData] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(false);
    const url = useBase();

    useEffect(() => {
        const getData = async () => {
            try {
                await axios.get(url + "/products/get")
                    .then(res => {
                        if (res.data.status === 'error') {
                            toast.error(res.data.message);
                            return;
                        }
                        console.log(res.data);
                        setData(res.data);
                    })
            }
            catch (e) {
                toast.error("Server Error");
            }
            finally {
                setLoading(false);
            }
        }
        getData();
    }, [])


    return (
        <div className='w-full h-screen grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data.map((item, i) => (
                <ItemBox
                    key={i}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    isSale={item.trending}
                    rating={item.ratings}
                    url={item.images} />
            ))}
        </div>
    )
}
