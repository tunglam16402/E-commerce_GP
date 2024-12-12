import { React, useEffect, useState } from 'react';
import { apiGetProducts } from '../apis/product';
import { Product } from './';
import Slider from 'react-slick';

const tabs = [
    { id: 1, name: 'best seller' },
    { id: 2, name: 'new arrivals' },
    { id: 3, name: 'tablet' },
];

//setting cho slider
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

function BestSeller() {
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        const response = await Promise.all([
            //sắp xếp theo số lg sold
            apiGetProducts({ sort: '-sold' }),
            //sắp xếp theo tg tạo
            apiGetProducts({ sort: '-createdAt' }),
        ]);
        if (response[0]?.success) {
            setBestSellers(response[0].products);
            setProducts(response[0].products);
        }
        if (response[0]?.success) {
            setNewProducts(response[1].products);
        }
        setProducts(response[0].products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    //handle change tab slider
    useEffect(() => {
        if (activedTab === 1) {
            setProducts(bestSellers);
        }
        if (activedTab === 2) {
            setProducts(newProducts);
        }
    }, [activedTab]);
    return (
        <div>
            <div className="flex text-[20px] ml-[-32px] ">
                {tabs.map((element) => (
                    <span
                        key={element.id}
                        className={`font-semibold capitalize px-8 border-r cursor-pointer text-gray-400 ${
                            activedTab === element.id ? 'text-main' : ''
                        }`}
                        onClick={() => {
                            setActivedTab(element.id);
                        }}
                    >
                        {element.name}
                    </span>
                ))}
            </div>
            <div className="mt-4 border-t-2 mx-[-10px] border-main pt-4">
                <Slider {...settings}>
                    {products?.map((element) => (
                        <Product
                            key={element.id}
                            pid={element.id}
                            productData={element}
                            isNew={activedTab === 1 ? false : true}
                        ></Product>
                    ))}
                </Slider>
            </div>
            <div className="w-full flex gap-4 mt-4">
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    alt="banner"
                    className="flex-1 object-contain"
                ></img>
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    alt="banner"
                    className="flex-1 object-contain"
                ></img>
            </div>
        </div>
    );
}

export default BestSeller;
