import React from 'react';
import Slider from 'react-slick';

interface Props {
    images: {
        public_id: string,
        url: string,
    }[];
}

export default function ProductImageSlider({ images }: Props) {
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
    };

    return (
        <div className='max-w-full w-[350px] h-[350px] pb-4 rounded-md'>
            <Slider {...settings}>
                {images.map((item, i) => (
                    <img
                        className='max-w-full w-[400px] h-[400px] rounded-md shadow-lg shadow-blue-100'
                        key={i}
                        src={item.url}
                        alt={item.public_id}
                    />
                ))}
            </Slider>
        </div>
    );
}
