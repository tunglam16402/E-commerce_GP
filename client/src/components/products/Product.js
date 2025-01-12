import React, { memo, useState } from 'react';
import { formatMoney } from 'utils/helper';
import label1 from 'assets/img/label1.png';
import labelBlue from 'assets/img/label_blue.png';
import { renderStarFromNumber } from 'utils/helper';
import { SelectOption } from 'components';
import icons from 'utils/icons';
import { createSearchParams, Link } from 'react-router-dom';
import withBaseComponent from 'hocs/withBaseComponent';
import { DetailProduct } from 'pages/public';
import { showModal } from 'store/app/appSlice';
import { apiUpdateCart } from 'apis';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/users/asyncAction';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import path from 'utils/path';

const { BsFillSuitHeartFill, AiFillEye, FaCartPlus, BsFillCartCheckFill } = icons;

const Product = ({ productData, isNew, normal, navigate, dispatch, location }) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const { current } = useSelector((state) => state.user);

    const handleClickOptions = async (e, flag) => {
        e.stopPropagation();
        if (flag === 'CART') {
            if (!current) {
                Swal.fire({
                    title: 'Almost...',
                    text: 'Your must login first to buy this',
                    cancelButtonText: 'Not now',
                    confirmButtonText: 'Go login',
                    icon: 'info',
                    showCancelButton: true,
                }).then(async (response) => {
                    if (response.isConfirmed) {
                        navigate({
                            pathname: `/${path.AUTH}`,
                            search: createSearchParams({ redirect: location.pathname }).toString(),
                        });
                    }
                });
            }
            const response = await apiUpdateCart({
                pid: productData?._id,
                color: productData?.color,
                quantity: 1,
                price: productData?.price,
                thumb: productData?.thumb,
                title: productData?.title,
            });
            if (response.success) {
                toast.success(response.message);
                dispatch(getCurrent());
            } else toast.error(response.message);
        }
        if (flag === 'WISHLIST') console.log('Wishlist');
        if (flag === 'QUICK_VIEW') {
            dispatch(
                showModal({
                    isShowModal: true,
                    modalChildren: (
                        <DetailProduct data={{ pid: productData?._id, category: productData?.category }} isQuickView />
                    ),
                }),
            );
        }
        console.log(current.cart, productData._id.toString());
    };

    return (
        <div className="w-full text-base px-[10px] cursor-pointer">
            <div
                className="w-full border p-[15px] flex flex-col items-center"
                onClick={(e) =>
                    navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
                }
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
                            <span title="Quick view" onClick={(e) => handleClickOptions(e, 'QUICK_VIEW')}>
                                <SelectOption icons={<AiFillEye size={24} />}></SelectOption>
                            </span>
                            {current?.cart?.some((element) => element?.product?._id === productData._id.toString()) ? (
                                <span title="Added to Cart">
                                    <SelectOption
                                        icons={<BsFillCartCheckFill size={24} color="green" />}
                                    ></SelectOption>
                                </span>
                            ) : (
                                <span title="Add to Cart" onClick={(e) => handleClickOptions(e, 'CART')}>
                                    <SelectOption icons={<FaCartPlus size={24} />}></SelectOption>
                                </span>
                            )}
                            <span title="Add to Wishlist" onClick={(e) => handleClickOptions(e, 'WISHLIST')}>
                                <SelectOption icons={<BsFillSuitHeartFill size={22} />}></SelectOption>
                            </span>
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
                    {!normal && (
                        <img
                            src={isNew ? label1 : labelBlue}
                            alt=""
                            className="absolute cursor-pointer top-[-15px] left-[-47px] w-[140px] h-[35px] object-cover opacity-85"
                        ></img>
                    )}
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
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Product));
