import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import logo from 'assets/img/logo.png';
import icons from 'utils/icons';
import path from 'utils/path';
import { useState } from 'react';
import { logout } from 'store/users/userSlice';
import withBaseComponent from 'hocs/withBaseComponent';
import { showCart } from 'store/app/appSlice';

const { RiPhoneFill, GrMail, FaShoppingCart, FaUser } = icons;

const Header = ({ dispatch }) => {
    const { current } = useSelector((state) => state.user);
    const [isShowOption, setIsShowOption] = useState(false);
    //handle when click out after click mouse some effect
    useEffect(() => {
        const handleClickOutOptions = (e) => {
            const profile = document.getElementById('profile');
            if (!profile?.contains(e.target)) setIsShowOption(false);
        };
        document.addEventListener('click', handleClickOutOptions);

        return () => {
            document.removeEventListener('click', handleClickOutOptions);
        };
    }, []);

    return (
        <div className=" w-main flex justify-between  h-[110px] py-[35px]">
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className="w-[234px] object-contain" />
            </Link>
            <div className=" flex ">
                <div className="flex flex-col px-6 border-r items-center text-[13px]">
                    <span className="flex gap-4 items-center">
                        <RiPhoneFill color="red"></RiPhoneFill>
                        <span className="font-semibold"> (+1800) 000 8808</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col px-6 border-r items-center text-[13px]">
                    <span className="flex gap-4 items-center">
                        <GrMail color="red"></GrMail>
                        <span className="font-semibold"> support@tadathemes.com</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                {current && (
                    <>
                        <div
                            onClick={() => dispatch(showCart())}
                            className=" cursor-pointer flex px-6 border-r items-center justify-center gap-2 text-[16px]"
                        >
                            <FaShoppingCart color="red"></FaShoppingCart>
                            <span>{`${current?.cart?.length || 0} item(s)`}</span>
                        </div>
                        <div
                            className="cursor-pointer flex px-6 items-center justify-center gap-2 text-[16px] relative"
                            onClick={() => setIsShowOption((prev) => !prev)}
                            id="profile"
                        >
                            <FaUser color="red"></FaUser>
                            <span>Profile</span>
                            {isShowOption && (
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute top-full left-4 flex flex-col bg-white shadow-md py-2 border min-w-[180px]"
                                >
                                    <Link
                                        className="p-2 w-full hover:bg-gray-100 border-b-2"
                                        to={`/${path.MEMBER}/${path.PERSONAL}`}
                                    >
                                        Personal
                                    </Link>
                                    {+current?.role === 2002 && (
                                        <Link
                                            className="p-2 w-full hover:bg-gray-100"
                                            to={`/${path.ADMIN}/${path.DASHBOARD}`}
                                        >
                                            Admin workspace
                                        </Link>
                                    )}
                                    <span onClick={() => dispatch(logout())} className="p-2 w-full hover:bg-gray-100">
                                        Logout
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Header));
