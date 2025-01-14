import React, { memo } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from 'components';

//setting cho slider
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

const CustomSlider = ({ products, activedTab, normal }) => {
    return (
        <>
            {products && (
                <Slider {...settings} className="custom_slider my-8">
                    {products?.map((element, index) => (
                        <Product
                            key={index}
                            pid={element._id}
                            productData={element}
                            isNew={activedTab === 1 ? false : true}
                            normal={normal}
                        ></Product>
                    ))}
                </Slider>
            )}
        </>
    );
};

export default memo(CustomSlider);
