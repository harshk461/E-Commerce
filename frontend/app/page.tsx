'use client'

import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeaderSlider from './Components/HeaderSlider/HeaderSlider';
import ShopBox from './Utils/ShopBox/ShopBox';
import { Bird, Cat, Dog, FishIcon, Snail } from 'lucide-react';
import TopChoice from './Utils/TopChoice/TopChoice';
import PathHeader from './Utils/PathHeader/PathHeader';

interface ShopDataInterface {
  url: string;
  name: string;
  desc: string;
  href: string;
  icon: any;
  isLong: Boolean;
}

export default function page() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const Shopdata = [
    {
      url: 'https://static.wixstatic.com/media/82fcd3_8e5daf6e362d432f9f34ff70780c6752~mv2_d_5509_4000_s_4_2.jpg/v1/fill/w_740,h_434,al_t,q_80,usm_0.66_1.00_0.01,enc_auto/82fcd3_8e5daf6e362d432f9f34ff70780c6752~mv2_d_5509_4000_s_4_2.jpg',
      name: 'Dog',
      desc: 'Shop Dog items',
      href: '/',
      icon: <Dog size={100} />,
      isLong: false,
    },
    {
      url: 'https://static.wixstatic.com/media/82fcd3_97259c1aab9e4a9d9d9a6d33896ba1ec~mv2_d_3745_2492_s_4_2.jpg/v1/fill/w_299,h_434,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/82fcd3_97259c1aab9e4a9d9d9a6d33896ba1ec~mv2_d_3745_2492_s_4_2.jpg',
      name: 'Cats',
      desc: 'Shop Cats items',
      href: '/',
      icon: <Cat size={100} />,
      isLong: false,
    },
    {
      url: 'https://static.wixstatic.com/media/82fcd3_2832171e379d4408bd00c5e72c89eff7~mv2_d_2000_1424_s_2.jpg/v1/fill/w_548,h_427,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/82fcd3_2832171e379d4408bd00c5e72c89eff7~mv2_d_2000_1424_s_2.jpg',
      name: 'Bird',
      desc: 'Shop Bird items',
      href: '/',
      icon: <Bird size={100} />,
      isLong: false,
    },
    {
      url: 'https://static.wixstatic.com/media/82fcd3_b0859172cf504ad3b7dfcdad97f6e9a3~mv2_d_4256_2832_s_4_2.jpg/v1/fill/w_549,h_427,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/82fcd3_b0859172cf504ad3b7dfcdad97f6e9a3~mv2_d_4256_2832_s_4_2.jpg',
      name: 'Reptiles',
      desc: 'Shop Reptiles items',
      href: '/',
      icon: <Snail size={100} />,
      isLong: false,
    },
    {
      url: 'https://static.wixstatic.com/media/82fcd3_6d3863ca538744b0b97b69aeecef5137~mv2_d_5800_3800_s_4_2.jpg/v1/fill/w_1065,h_427,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/82fcd3_6d3863ca538744b0b97b69aeecef5137~mv2_d_5800_3800_s_4_2.jpg',
      name: 'Fish',
      desc: 'Shop Fish items',
      href: '/',
      icon: <FishIcon size={100} />,
      isLong: true,
    },
  ];


  return (
    <div className='w-full min-h-screen flex flex-col overflow-x-hidden'>
      <PathHeader
        path={['Home']} />
      <HeaderSlider />
      <div className='w-full h-fit flex-col lg:flex-row flex flex-wrap p-4 gap-10'>
        {Shopdata.map((item, i) => (
          <ShopBox
            key={i}
            url={item.url}
            name={item.name}
            desc={item.desc}
            href={item.href}
            icon={item.icon}
            isLong={item.isLong}
          />
        ))}
      </div>
      <TopChoice />
    </div>
  )
}
