import React, { memo } from 'react';
import Slider from 'react-slick';
import { Product } from './';

//setting cho slider
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const CustomSlider = ({ products, activedTab }) => {
    return (
        <>
            {products && (
                <Slider {...settings}>
                    {products?.map((element, index) => (
                        <Product
                            key={index}
                            pid={element.id}
                            productData={element}
                            isNew={activedTab === 1 ? false : true}
                        ></Product>
                    ))}
                </Slider>
            )}
        </>
    );
};

export default memo(CustomSlider);
