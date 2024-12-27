import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header, Navigation, TopHeader } from '../../components';
import path from '../../utils/path';

const Public = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === `/${path.AUTH}`;

    return (
        <div className="w-full flex flex-col items-center">
            {!isLoginPage && <TopHeader />}
            <Header />
            {!isLoginPage && <Navigation />}
            <div className="w-full flex flex-col items-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Public;
