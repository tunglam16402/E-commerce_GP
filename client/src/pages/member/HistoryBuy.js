import { apiGetUserOrders } from 'apis';
import { CustomSelect, InputForm, Pagination } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'react-use';
import { statusOrders } from 'utils/constant';

const HistoryBuy = ({ dispatch, navigate, location }) => {
    const [orders, setOrders] = useState(null);
    const [counts, setCounts] = useState(0);
    const [params] = useSearchParams();
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useForm();

    const q = watch('q');
    const status = watch('status');

    const fetchOrders = async (params) => {
        const response = await apiGetUserOrders({ ...params, limit: process.env.REACT_APP_LIMIT });
        if (response.success) {
            setOrders(response.orders);
            setCounts(response.counts);
        }
    };

    useEffect(() => {
        const searchParams = Object.fromEntries([...params]);
        fetchOrders(searchParams);
    }, [params]);

    const handleSearchStatus = ({ value }) => {
        navigate({
            pathname: location.pathname,
            search: value ? createSearchParams({ status: value }).toString() : '',
        });
    };

    return (
        <div className="w-full relative px-4">
            <header className="text-3xl font-semibold py-4 border-b border-main">History Buy</header>
            <div className="flex justify-end items-center">
                <form className="w-[45%] grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <InputForm
                            id="q"
                            register={register}
                            errors={errors}
                            fullWidth
                            placeholder="Search Order by title, status,..."
                        ></InputForm>
                    </div>
                    <div className="flex items-center col-span-1">
                        <CustomSelect
                            options={statusOrders}
                            value={status}
                            // onChange={(value) => handleSearchStatus(value)}
                            onChange={handleSearchStatus}
                            wrapClassname="w-full"
                        />
                    </div>
                </form>
            </div>
            <table className="table-auto mb-6 text-left w-full">
                <thead className="font-bold bg-gray-700 text-[14px] text-center text-white">
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Products</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Created at</th>
                        {/* <th className="px-4 py-2">Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((element, index) => (
                        <tr key={element._id} className="border border-gray-500 text-center">
                            <td className="">
                                {(+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT +
                                    index +
                                    1}
                            </td>
                            <td className="text-center max-w-[600px] py-2">
                                <span className="grid grid-cols-4 gap-4">
                                    {element.products?.map((item) => (
                                        <span className="flex col-span-2 items-center gap-2" key={item._id}>
                                            <img
                                                src={item.thumb}
                                                alt="thumb"
                                                className="w-16 h-16 rounded-md object-cover"
                                            ></img>
                                            <span className="flex flex-col">
                                                <span className="text-main ">{item.title}</span>
                                                <span className="flex items-center gap-2">
                                                    <span>x {item.quantity}</span>
                                                </span>
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </td>
                            <td>{element.total}</td>
                            <td>{element.status}</td>
                            <td>{moment(element.createdAt)?.format('DD/MM/YYYY')}</td>
                            {/* <td>
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
                            </td> */}
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

export default withBaseComponent(HistoryBuy);
