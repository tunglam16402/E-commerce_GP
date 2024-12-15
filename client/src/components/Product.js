import React, { useState } from 'react';
import { formatMoney } from '../utils/helper';
import label1 from '../assets/img/label1.png';
import labelBlue from '../assets/img/label_blue.png';
import { renderStarFromNumber } from '../utils/helper';
import { SelectOption } from './';
import icons from '../utils/icons';
import { Link } from 'react-router-dom';
import path from '../utils/path';

const { BsFillSuitHeartFill, AiFillEye, AiOutlineMenu } = icons;

const Product = ({ productData, isNew }) => {
    const [isShowOption, setIsShowOption] = useState(false);

    return (
        <div className="w-full text-base px-[10px]">
            <Link
                className="w-full border p-[15px] flex flex-col items-center"
                to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    setIsShowOption(true);
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setIsShowOption(false);
                }}
            >
                <div className="w-full relative">
                    {isShowOption && (
                        <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
                            <SelectOption icons={<AiFillEye />}></SelectOption>
                            <SelectOption icons={<AiOutlineMenu />}></SelectOption>
                            <SelectOption icons={<BsFillSuitHeartFill />}></SelectOption>
                        </div>
                    )}
                    <img
                        src={
                            productData?.thumb ||
                            'https://tse3.mm.bing.net/th?id=OIP.uOQ047yW1qXUtl2dpGhwvQHaHa&pid=Api&P=0&h=220'
                        }
                        alt="Product img"
                        // className="w-[274px] h-[274px] object-cover"
                        className="w-full object-contain"
                    ></img>
                    <img
                        src={isNew ? label1 : labelBlue}
                        alt=""
                        className="absolute top-[-15px] left-[-47px] w-[140px] h-[35px] object-cover opacity-85"
                    ></img>
                    <span
                        className="before:content-[''] before:w-[6px] before:h-[6px] before:rounded-[6px] 
                    before:bg-white before:absolute before:left-[-12px] before:top-[10px] before:z-[1] 
                    top-[-15px] left-[-8px] absolute text-white "
                    >
                        {isNew ? 'New' : 'Trending'}
                    </span>
                </div>
                <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span className="flex h-4">
                        {renderStarFromNumber(productData?.totalRatings)?.map((element, index) => (
                            <span key={index}>{element}</span>
                        ))}
                    </span>
                    <span className="">{`${formatMoney(productData?.price)} VNĐ`}</span>
                </div>
            </Link>
        </div>
    );
};

export default Product;
