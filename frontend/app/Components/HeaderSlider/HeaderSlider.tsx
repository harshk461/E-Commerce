// Import required libraries
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define the HeaderSlider component
export default function HeaderSlider() {
    // Settings for the Slider component
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    // Array of image URLs for the slider
    const images = [
        'https://blog.bodytech.com.br/wp-content/uploads/2017/11/cachorro_viver_mais.jpg',
        'https://www.freewebheaders.com/wp-content/gallery/cats/amazing-red-eye-tabby-kitten-website-header.jpg',
        'https://t3.ftcdn.net/jpg/02/45/42/26/360_F_245422678_7ood6OTTGocKmTQhPAkkt7QkxqSFzfHw.jpg',
        'https://www.sfvaudubon.org/wp-content/uploads/2016/04/HOSP-BannerSize.jpg',
    ];

    // Return the component JSX
    return (
        <div className='lg:relative w-full h-fit'>
            {/* Slider visible on all screen sizes */}
            <div className='hidden lg:block'>
                <Slider {...settings}>
                    {images.map((item, index) => (
                        <div key={index} className='w-full h-[500px] overflow-hidden'>
                            <img className='w-full h-full' src={item} alt={`image-${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Welcome div positioned over the slider */}
            <div className='lg:absolute top-0 w-full h-full flex justify-center items-center p-2 z-10'>
                <div className='w-full md:w-fit flex bg-white bg-opacity-40 px-8 py-20 flex-col rounded-lg shadow-lg shadow-black'>
                    <h1 className='text-4xl md:text-6xl font-bold'>
                        Welcome <br />
                        to Our Pet<br />
                        Supply Shop
                    </h1>
                    <button className='self-start mt-4 px-6 py-2 rounded-lg bg-green-300 font-semibold'>
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}
