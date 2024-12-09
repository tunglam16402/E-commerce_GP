import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo.png';
import icons from '../utils/icons';
import path from '../utils/path';

const Header = () => {
    const { RiPhoneFill, GrMail, FaShoppingCart, FaUser } = icons;

    return (
        <div className=" w-main flex justify-between  h-[110px] py-[35px]">
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className="w-[234px] object-contain" />
            </Link>
            <div className=" flex text-[13px]">
                <div className="flex flex-col px-6 border-r items-center ">
                    <span className="flex gap-4 items-center">
                        <RiPhoneFill color="red"></RiPhoneFill>
                        <span className="font-semibold"> (+1800) 000 8808</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col px-6 border-r items-center ">
                    <span className="flex gap-4 items-center">
                        <GrMail color="red"></GrMail>
                        <span className="font-semibold"> support@tadathemes.com</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                <div className="flex px-6 border-r items-center justify-center gap-2">
                    <FaShoppingCart color="red"></FaShoppingCart>
                    <span>0 item(s)</span>
                </div>
                <div className="flex px-6 items-center justify-center">
                    <FaUser size={24} color="red"></FaUser>
                </div>
            </div>
        </div>
    );
};

export default Header;
