import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Home, Public, Products, Services, DetailProduct, Blogs, FAQs } from './pages/public';
import path from './utils/path';
import { getCategories } from './store/app/asyncAction';
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    return (
        <div className="min-h-screen font-main">
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />}></Route>
                    <Route path={path.PRODUCTS} element={<Products />}></Route>
                    <Route path={path.BLOGS} element={<Blogs />}></Route>
                    <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />}></Route>
                    <Route path={path.OUR_SERVICES} element={<Services />}></Route>
                    <Route path={path.FAQS} element={<FAQs />}></Route>
                </Route>
                <Route path={path.LOGIN} element={<Login />}></Route>
            </Routes>
        </div>
    );
}

export default App;
