import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    Authentication,
    Register,
    Home,
    Public,
    Products,
    Services,
    DetailProduct,
    Blogs,
    FAQs,
    FinalRegister,
    ResetPassword,
} from './pages/public';
import path from './utils/path';
import { getCategories } from './store/app/asyncAction';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollToTop } from './components';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    return (
        <div className="min-h-screen font-main">
            <ScrollToTop />
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />}></Route>
                    <Route path={path.PRODUCTS} element={<Products />}></Route>
                    <Route path={path.BLOGS} element={<Blogs />}></Route>
                    <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
                    <Route path={path.OUR_SERVICES} element={<Services />}></Route>
                    <Route path={path.FAQS} element={<FAQs />}></Route>
                    <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
                    <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
                    <Route path={path.AUTH} element={<Authentication />}></Route>
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                // transition={Bounce}
            />
        </div>
    );
}

export default App;
