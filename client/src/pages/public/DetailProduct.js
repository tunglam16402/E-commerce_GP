import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetDetailProducts, apiGetProducts } from '../../apis';
import {
    Breadcrumbs,
    Button,
    SelectQuantity,
    ProductExtraInfoItem,
    ImageMagnifier,
    ProductInformation,
    CustomSlider,
} from '../../components';
import Slider from 'react-slick';
import { formatMoney, formatPrice, renderStarFromNumber } from '../../utils/helper';
import { productExtraInformation } from '../../utils/constant';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const fetchProductData = async () => {
        const response = await apiGetDetailProducts(pid);
        if (response.success) {
            setProduct(response.productData);
        }
    };

    const fetchProduct = async () => {
        const response = await apiGetProducts({ category });
        if (response.success) {
            setRelatedProducts(response.products);
        }
    };

    useEffect(() => {
        if (pid) {
            fetchProductData();
            fetchProduct();
        }
    }, [pid]);

    const handleQuantity = useCallback(
        (number) => {
            if (!Number(number) || Number(number) < 1) {
                return;
            } else {
                setQuantity(number);
            }
        },
        [quantity],
    );

    const handleChangeQuantity = useCallback(
        (flag) => {
            if (flag === 'minus' && quantity === 1) return;
            if (flag === 'minus') setQuantity((prev) => +prev - 1);
            if (flag === 'plus') setQuantity((prev) => +prev + 1);
        },
        [quantity],
    );

    return (
        <div className="w-full">
            <div className="h-[81px] flex flex-col justify-center items-center bg-gray-100">
                <div className=" w-main">
                    <h3 className="font-semibold text-[22px]">{title}</h3>
                    <Breadcrumbs title={title} category={category}></Breadcrumbs>
                </div>
            </div>
            <div className="w-main m-auto mt-6 flex">
                <div className="w-2/5 flex flex-col gap-4 ">
                    <div className="w-[458px] h-[458px] border object-cover">
                        {product && <ImageMagnifier smallImageSrc={product?.thumb} largeImageSrc={product?.thumb} />}
                    </div>
                    <div className="w-[458px]">
                        <Slider {...settings} className="image_slider">
                            {product?.images?.map((element) => (
                                <div key={element} className="flex w-full gap-2">
                                    <img
                                        src={element}
                                        alt="sub_product_img"
                                        className="w-[143px] h-[143px] border object-cover"
                                    ></img>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="w-2/5 pr-[24px] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[34px] font-semibold text-gray-700">{`${formatMoney(
                            formatPrice(product?.price),
                        )} VND`}</h2>
                    </div>
                    <div className="flex items-center">
                        {renderStarFromNumber(product?.totalRatings, 18)?.map((element, index) => (
                            <span key={index}>{element}</span>
                        ))}
                        <span className="text-sm text-main italic ml-4">{`Sold: ${product?.sold}`}</span>
                    </div>
                    <ul className=" text-[16px] list-square text-gray-500 pl-8">
                        {product?.description?.map((element) => (
                            <li className="leading-6" key={element}>
                                {element}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-8 mt-4">
                        <div className="flex items-center">
                            <span className="text-[16px] pr-8">Quantity:</span>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            ></SelectQuantity>
                            <span className="text-sm text-main ml-8">{`Products available: ${product?.quantity}`}</span>
                        </div>
                        <Button fullWidth>Add to cart</Button>
                    </div>
                </div>
                <div className="w-1/5 ">
                    {productExtraInformation.map((element) => (
                        <ProductExtraInfoItem
                            key={element.id}
                            title={element.title}
                            icon={element.icon}
                            sub={element.sub}
                        ></ProductExtraInfoItem>
                    ))}
                </div>
            </div>
            <div className="w-main m-auto mt-8">
                <ProductInformation></ProductInformation>
            </div>
            <div className="w-main m-auto mt-8">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main uppercase">
                    Other also like
                </h3>
                <CustomSlider normal={true} products={relatedProducts}></CustomSlider>
            </div>
        </div>
    );
};

export default DetailProduct;
