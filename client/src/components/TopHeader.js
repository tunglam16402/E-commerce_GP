import React, { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import path from '../utils/path';
import { getCurrent } from '../store/users/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../utils/icons';
import { logout } from '../store/users/userSlice';

const { IoLogOutSharp } = icons;

const TopHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, current } = useSelector(state => state.user);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCurrent());
        }
    }, [dispatch, isLoggedIn]);

    const handleLogout = () => {
        dispatch(logout());
        navigate(`/${path.AUTH}`);
    };
    return (
        <div className="h-[38px] w-full bg-main flex items-center justify-center">
            <div className="w-main flex items-center justify-between text-sm text-white">
                <span>
                    ORDER ONLINE OR CALL US
                    <a href="tel:+012345678" className=" underline">
                        (+84) 012345678
                    </a>
                </span>
                {isLoggedIn ? (
                    <div className="flex gap-4 text-sm items-center">
                        {current ? (
                            <span>{`Welcome, ${current.lastname} ${current.firstname}`}</span>
                        ) : (
                            <span>Loading...</span>
                        )}
                        <span
                            onClick={handleLogout}
                            className="text-[22px] hover:rounded-full hover:bg-gray-200 hover:text-main p-1 cursor-pointer"
                        >
                            <IoLogOutSharp></IoLogOutSharp>
                        </span>
                    </div>
                ) : (
                    <Link to={`/${path.AUTH}`} className="hover:text-gray-800">
                        Sign In or Create Account
                    </Link>
                )}
            </div>
        </div>
    );
};

export default memo(TopHeader);
