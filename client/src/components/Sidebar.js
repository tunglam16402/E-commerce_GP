import { apiGetCategories } from '../apis/app';
import { React, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createSlug } from '../utils/helper';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { categories } = useSelector((state) => state.app);
    console.log(categories);
    return (
        <div className="flex flex-col border">
            {categories?.map((element) => (
                <NavLink
                    key={createSlug(element.title)}
                    to={createSlug(element.title)}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                            : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                    }
                >
                    {element.title}
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
