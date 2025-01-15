import React, { useCallback, useEffect, useState } from 'react';
import { CustomizeVariants, InputForm, Pagination } from 'components';
import { useForm } from 'react-hook-form';
import { apiGetProducts, apiDeleteProduct } from 'apis/product';
import moment from 'moment';
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import UpdateProduct from './UpdateProduct';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdAddToPhotos } from 'react-icons/md';

const ManageProducts = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch,
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState(null);
    const [counts, setCounts] = useState(0);
    const [params] = useSearchParams();
    const [editProduct, setEditProduct] = useState(null);
    const [update, setUpdate] = useState(false);
    const [customizeVariant, setCustomizeVariant] = useState(null);

    const render = useCallback(() => {
        setUpdate(!update);
    });

    const fetchProducts = async (params) => {
        const response = await apiGetProducts({ ...params, limit: process.env.REACT_APP_LIMIT });
        console.log(response);
        if (response.success) {
            setCounts(response.counts);
            setProducts(response.products);
        }
    };

    const queriesDebounce = useDebounce(watch('q'), 800);

    useEffect(() => {
        if (queriesDebounce) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({ q: queriesDebounce }).toString(),
            });
        } else {
            navigate({
                pathname: location.pathname,
            });
        }
    }, [queriesDebounce]);

    useEffect(() => {
        const searchParams = Object.fromEntries([...params]);
        fetchProducts(searchParams);
    }, [params, update]);

    const handleDeleteProduct = async (pid) => {
        Swal.fire({
            title: 'Delete product',
            text: 'Are you sure to delete this product?',
            icon: 'warning',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteProduct(pid);
                if (response.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
                render();
            }
        });
    };

    return (
        <div className="w-full flex flex-col p-4 relative">
            {editProduct && (
                <div className="inset-0 absolute bg-gray-100 min-h-screen">
                    <UpdateProduct
                        editProduct={editProduct}
                        render={render}
                        setEditProduct={setEditProduct}
                    ></UpdateProduct>
                </div>
            )}
            {customizeVariant && (
                <div className="inset-0 absolute bg-gray-100 min-h-screen">
                    <CustomizeVariants
                        customizeVariant={customizeVariant}
                        render={render}
                        setCustomizeVariant={setCustomizeVariant}
                    ></CustomizeVariants>
                </div>
            )}
            <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold border-b-2 border-red-500">
                <span>Manage Products</span>
            </h1>
            <div className="flex justify-end items-center">
                <form className="w-[45%]">
                    <InputForm
                        id="q"
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder="Search products by title, description,..."
                    ></InputForm>
                </form>
            </div>
            <table className="table-auto mb-6 text-left w-full">
                <thead className="font-bold bg-gray-700 text-[14px] text-center text-white">
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Thumb</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Brand</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Color</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Sold</th>
                        <th className="px-4 py-2">Ratings</th>
                        <th className="px-4 py-2">Variants</th>
                        <th className="px-4 py-2">Update at</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((element, index) => (
                        <tr key={element._id} className="border border-gray-500 text-center">
                            <td className="">
                                {(+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT +
                                    index +
                                    1}
                            </td>
                            <td>
                                <img src={element.thumb} alt="thumb" className="w-12 h-12 object-cover"></img>
                            </td>
                            <td>{element.title}</td>
                            <td>{element.brand}</td>
                            <td>{element.category}</td>
                            <td>{element.color}</td>
                            <td>{element.price}</td>
                            <td>{element.quantity}</td>
                            <td>{element.sold}</td>
                            <td>{element.totalRatings}</td>
                            <td>{element?.variants.length || 0}</td>
                            <td>{moment(element.createdAt).format('DD/MM/YYYY')}</td>
                            <td>
                                <span
                                    onClick={() => setEditProduct(element)}
                                    className="text-main hover:text-red-900 cursor-pointer px-1 inline-block"
                                >
                                    <FaEdit />
                                </span>
                                <span
                                    onClick={() => handleDeleteProduct(element._id)}
                                    className="text-main hover:text-red-900 cursor-pointer px-1 inline-block"
                                >
                                    <FaTrashAlt />
                                </span>
                                <span
                                    onClick={() => setCustomizeVariant(element)}
                                    className="text-main hover:text-red-900 cursor-pointer inline-block px-1"
                                >
                                    <MdAddToPhotos />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full flex justify-end">
                <Pagination totalCount={counts}></Pagination>
            </div>
        </div>
    );
};

export default ManageProducts;
