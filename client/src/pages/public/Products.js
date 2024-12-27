import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Product, SearchItem } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const Products = () => {
    const [product, setProduct] = useState(null);
    const [activedClick, setActivedClick] = useState(null);
    const [params] = useSearchParams();
    const fetchProductsByCategory = async (queries) => {
        const response = await apiGetProducts(queries);
        if (response.success) setProduct(response.products);
    };

    const { category } = useParams();

    useEffect(() => {
        let param = [];
        for (let i of params.entries()) {
            param.push(i);
        }
        const queries = {};
        for (let i of params) {
            queries[i[0]] = i[1];
        }
        fetchProductsByCategory(queries);
    }, [params]);

    const changeActivedFilter = useCallback(
        (name) => {
            if (activedClick === name) {
                setActivedClick(null);
            } else {
                setActivedClick(name);
            }
        },
        [activedClick],
    );

    return (
        <div className="w-full">
            <div className="h-[81px] flex flex-col justify-center items-center bg-gray-100">
                <div className=" w-main">
                    <h3 className="font-semibold text-[22px] uppercase">{category}</h3>
                    <Breadcrumbs category={category}></Breadcrumbs>
                </div>
            </div>
            <div className="w-main p-4 flex justify-between mt-8 m-auto border">
                <div className="w-4/5 flex flex-auto flex-col gap-3">
                    <span className="font-semibold text-sm">Filter by</span>
                    <div className="flex items-center gap-4 mb-2">
                        <SearchItem
                            name="price"
                            activedClick={activedClick}
                            changeActivedFilter={changeActivedFilter}
                        ></SearchItem>
                        <SearchItem
                            name="color"
                            activedClick={activedClick}
                            changeActivedFilter={changeActivedFilter}
                        ></SearchItem>
                    </div>
                </div>
                <div className="w-1/5">sort by</div>
            </div>
            <div className="mt-4 w-main m-auto">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column mb-[-20px]"
                >
                    {product?.map((element) => (
                        <Product key={element._id} pid={element.id} productData={element} normal={true}></Product>
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default Products;
