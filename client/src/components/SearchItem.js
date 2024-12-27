import React, { memo, useEffect, useState } from 'react';
import icons from '../utils/icons';
import { colors } from '../utils/constant';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import path from '../utils/path';

const { AiOutlineDown } = icons;

const SearchItem = ({ name, activedClick, changeActivedFilter, type = 'checkbox' }) => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [selected, setSelected] = useState([]);

    const handleSelected = (e) => {
        const alreadyEl = selected.find((element) => element === e.target.value);
        if (alreadyEl) {
            setSelected((prev) => prev.filter((element) => element !== e.target.value));
        } else {
            setSelected((prev) => [...prev, e.target.value]);
        }
        changeActivedFilter(null);
    };

    useEffect(() => {
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({
                color: selected,
            }).toString(),
        });
    }, [selected]);

    return (
        <div
            className="cursor-pointer p-3 text-gray-600 relative gap-6 text-sm border-gray-600 border flex justify-center items-center "
            onClick={() => changeActivedFilter(name)}
        >
            <span className="capitalize">{name}</span>
            <AiOutlineDown />
            {activedClick === name && (
                <div className="absolute top-[calc(100%+1px)] left-0 w-fit p-4 border border-gray-400 bg-white min-w-[150px] z-50">
                    {type === 'checkbox' && (
                        <div>
                            <div className="p-4 pb-6 items-center flex justify-between gap-8 border-b-2">
                                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelected([]);
                                        changeActivedFilter(null);
                                    }}
                                    className="underline hover:text-main"
                                >
                                    Reset
                                </span>
                            </div>
                            <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2 mt-4">
                                {colors.map((element, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded bg-gray-300 border-gray-100"
                                            value={element}
                                            onChange={handleSelected}
                                            id={element}
                                            checked={selected.some((selectedItem) => selectedItem === element)}
                                        ></input>
                                        <label htmlFor={element} className="text-gray-700 capitalize">
                                            {element}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(SearchItem);
