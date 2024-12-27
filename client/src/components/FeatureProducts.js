import React, { useEffect, useState } from 'react';
import { ProductCard } from './';
import { apiGetProducts } from '../apis';

const FeatureProducts = () => {
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, totalRatings: 4 });
        if (response.success) {
            setProducts(response.products);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div>
            <div className="w-main">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">FEATURE PRODUCTS</h3>
                <div className="flex flex-wrap mt-[15px] mx-[-10px]">
                    {products?.map((element) => (
                        <ProductCard
                            key={element._id}
                            image={element.thumb}
                            title={element.title}
                            totalRatings={element.totalRatings}
                            price={element.price}
                        ></ProductCard>
                    ))}
                </div>
                <div className="flex justify-between">
                    <img
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
                        alt=""
                        className='w-[50%] object-contain'
                    ></img>
                    <div className="flex flex-col justify-between gap-4 w-[24%]">
                        <img
                            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                            alt=""
                        ></img>
                        <img
                            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                            alt=""
                        ></img>
                    </div>
                    <img
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
                        alt=""
                        className='w-[24%] object-contain'
                    ></img>
                </div>
            </div>
        </div>
    );
};

export default FeatureProducts;
