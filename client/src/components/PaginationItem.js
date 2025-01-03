import React from 'react';
import clsx from 'clsx';
import { useSearchParams, useNavigate, useParams, createSearchParams } from 'react-router-dom';

const PaginationItem = ({ children }) => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [params] = useSearchParams();
    const handlePagination = () => {
        let param = [];
        for (let i of params.entries()) {
            param.push(i);
        }
        const queries = {};
        for (let i of param) {
            queries[i[0]] = i[1];
        }
        if (Number(children)) queries.page = children;
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),
        });
    };

    return (
        <button
            className={clsx(
                'p-4 w-10 h-10 flex items-center justify-center rounded-full ',
                !Number(children) && 'items-end pb-2',
                Number(children) && 'items-center hover:rounded-full hover:bg-main hover:text-white',
                +params.get('page') === +children && 'rounded-full bg-main text-white',
                !+params.get('page') && children === 1 && 'rounded-full bg-main text-white',
            )}
            onClick={handlePagination}
            type="button"
            disabled={!Number(children)}
        >
            {children}
        </button>
    );
};

export default PaginationItem;
