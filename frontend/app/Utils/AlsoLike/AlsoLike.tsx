'use client'

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
    { id: 1, name: 'Product 1', price: '$20.00', image: 'https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' },
    { id: 2, name: 'Product 2', price: '$25.00', image: 'https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' },
    { id: 3, name: 'Product 3', price: '$30.00', image: 'https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' },
    { id: 3, name: 'Product 3', price: '$30.00', image: 'https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' },
    { id: 4, name: 'Product 1', price: '$20.00', image: 'https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' },
    { id: 5, name: 'Product 2', price: '$25.00', image: 'https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' },
    { id: 6, name: 'Product 3', price: '$30.00', image: 'https://static.wixstatic.com/media/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg/v1/fill/w_325,h_325,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_9d85bc28b2a848d2811dcf889dcf69f9~mv2.jpg' },
];

const AlsoLike = () => {
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setSlidesToShow(4);
            } else if (window.innerWidth >= 768) {
                setSlidesToShow(3);
            }
            else if (window.innerWidth >= 500) {
                setSlidesToShow(2);
            }
            else {
                setSlidesToShow(1);
            }
        };

        // Initial setup
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <ChevronLeft size={100} color='black' />,
        nextArrow: <ChevronRight size={100} color='black' />,
        slidesToShow: slidesToShow,
    };

    return (
        <div className='max-w-full w-[90%] h-fit m-auto my-[40px]'>
            <h2 className=' text-2xl font-semibold'>You Might Also Like</h2>
            <div className='block'>
                <Slider {...settings}>
                    {products.map((item, index) => (
                        <div key={index} className='w-[300px] h-[300px] p-4 flex flex-col text-center'>
                            <img
                                className='w-full h-auto'
                                src={item.image}
                                alt={`image-${index}`} />
                            <h3 className='text-xl font-semibold'>{item.name}</h3>
                            <p className='text-md text-gray-500'> {item.price}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default AlsoLike;
