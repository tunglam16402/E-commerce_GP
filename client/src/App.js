import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    Authentication,
    Home,
    Public,
    Products,
    Services,
    DetailProduct,
    Blogs,
    FAQs,
    FinalRegister,
    ResetPassword,
} from 'pages/public';
import { AdminLayout, ManageOrders, ManageProducts, ManageUsers, Dashboard, CreateProducts } from 'pages/admin';
import { MemberLayout, Personal, MyCart, HistoryBuy, WishList } from 'pages/member';
import path from 'utils/path';
import { getCategories } from 'store/app/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollToTop, Modal } from 'components';

function App() {
    const dispatch = useDispatch();
    const [isShowModal, modalChildren] = useSelector((state) => [state.app.isShowModal, state.app.modalChildren]);
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    return (
        <div className=" font-main relative">
            <ScrollToTop />
            {isShowModal && <Modal>{modalChildren}</Modal>}
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
                    <Route path={path.ALL} element={<Home />}></Route>
                </Route>
                <Route path={path.ADMIN} element={<AdminLayout />}>
                    <Route path={path.DASHBOARD} element={<Dashboard />}></Route>
                    <Route path={path.MANAGE_USER} element={<ManageUsers />}></Route>
                    <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />}></Route>
                    <Route path={path.MANAGE_ORDER} element={<ManageOrders />}></Route>
                    <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />}></Route>
                </Route>
                <Route path={path.MEMBER} element={<MemberLayout />}>
                    <Route path={path.PERSONAL} element={<Personal />}></Route>
                    <Route path={path.MY_CART} element={<MyCart />}></Route>
                    <Route path={path.WISHLIST} element={<WishList />}></Route>
                    <Route path={path.HISTORY_BUY} element={<HistoryBuy />}></Route>
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
