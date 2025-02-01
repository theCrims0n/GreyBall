'use client';

import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slide.css';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlides = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties
                }
                navigation={true}
                autoplay={{
                    delay: 2500
                }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2 "
            >
                {
                    images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <ProductImage
                                width={300}
                                height={300}
                                src={image}
                                alt={title}
                                className="rounded-lg object-fill"
                                style={{ width: 600 }}
                            />
                        </SwiperSlide>

                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={0}
                slidesPerView={10}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <ProductImage
                                width={200}
                                height={200}
                                src={image}
                                alt={title}
                                style={{ width: 200 }}
                                className="rounded-lg object-fill"
                            />
                        </SwiperSlide>

                    ))
                }
            </Swiper>
        </div>
    );
};