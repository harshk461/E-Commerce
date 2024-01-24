'use client'

import React, { useEffect, useState } from 'react'
import ItemBox from '../Utils/ItemBox/ItemBox';
import toast from 'react-hot-toast';
import axios from 'axios';
import useBase from '../hooks/useBase';

export default function Page() {
    const [data, setData] = useState([]);
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
                    url={"https://static.wixstatic.com/media/84770f_fdfcbbaf39ef4bec8302ba850905b910~mv2.jpg/v1/fill/w_351,h_351,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_fdfcbbaf39ef4bec8302ba850905b910~mv2.jpg"} />
            ))}
        </div>
    )
}
