'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ProductCard from './ProductCard';
import type { SwiperRef } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

interface IProduct {
    _id?: string;
    image: string;
    title: string;
    description: string;
    price: number;
    category: string;
    gender: string;
    ageGroup: string;
}

type Props<T extends IProduct> = {
    mainTitle: string;
    shopTitle: string;
    shopLink: string;
    products: T[],
    breakPoints: SwiperOptions[ 'breakpoints' ];
}

export default function ProductSwiper<T extends IProduct>( { mainTitle, shopTitle, shopLink, products, breakPoints }: Props<T>, ) {

    const ref = useRef<SwiperRef>( null );

    const handleNext = () => {
        ref.current?.swiper?.slideNext();
    };
    const handlePrev = () => {
        ref.current?.swiper?.slidePrev();
    };

    return (
        <div className="my-10">
            {/* Header Section */ }
            <div className="flex items-center justify-between my-5">
                <h1 className="font-semibold">{ mainTitle }</h1>

                <div className="flex gap-3 items-center">
                    <Link href={ shopLink || '' } className="text-sm font-semibold">
                        { shopTitle }
                    </Link>

                    <div className="flex gap-3 items-center">
                        {/* Previous Button */ }
                        <div
                            onClick={ handlePrev }
                            className="cursor-pointer w-10 h-10 rounded-full bg-[#E5E5E5] hover:bg-[#F5F5F5] flex items-center justify-center"
                        >
                            <IoIosArrowBack size={ 22 } />
                        </div>

                        {/* Next Button */ }
                        <div
                            onClick={ handleNext }
                            className="cursor-pointer w-10 h-10 rounded-full bg-[#E5E5E5] hover:bg-[#F5F5F5] flex items-center justify-center"
                        >
                            <IoIosArrowForward size={ 22 } />
                        </div>
                    </div>
                </div>
            </div>

            {/* Swiper Section */ }
            <Swiper
                ref={ ref }
                className="mySwiper"
                loop={ true }
                grabCursor={ true }
                navigation={ true }
                modules={ [ Navigation ] }
                breakpoints={ breakPoints }
            >
                { products.map( ( product ) => (
                    <SwiperSlide key={ product._id }>
                        <ProductCard product={ product } />
                    </SwiperSlide>
                ) ) }
            </Swiper>
        </div>
    );
}
