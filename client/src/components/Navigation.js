import React from 'react';
import { navigation } from '../utils/constant';
import { NavLink } from 'react-router-dom';

const notActivedStyle = '';
const activedStyle = '';

const Navigation = () => {
    return (
        <div className="w-main h-[48px] py-2 border-y mb-6 text-sm flex items-center">
            {navigation.map((element) => (
                <NavLink
                    to={element.path}
                    key={element.id}
                    className={({ isActive }) =>
                        isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'
                    }
                >
                    {element.value}
                </NavLink>
            ))}
        </div>
    );
};

export default Navigation;
