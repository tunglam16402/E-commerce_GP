import React, { memo, Fragment, useState } from 'react';
import logo from 'assets/img/logo.png';
import { adminSidebar } from 'utils/constant';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-main text-white transition-colors duration-200 ease-in-out';
const notActivedStyle =
    'px-4 py-2 flex items-center gap-2 hover:bg-gray-300 transition-colors duration-200 ease-in-out';

const AdminSidebar = () => {
    const [actived, setActived] = useState([]);
    const handleShowTabs = (tabID) => {
        if (actived.some((element) => element === tabID)) {
            setActived((prev) => prev.filter((element) => element !== tabID));
        } else setActived((prev) => [...prev, tabID]);
    };

    return (
        <div className="py-4  h-full bg-gray-50 shadow-lg">
            <Link to={'/'} className="flex flex-col p-4 gap-2 items-center justify-center">
                <img src={logo} alt="logo" className="w-[200px] object-contain"></img>
                <small>Admin Workspace</small>
            </Link>
            <div>
                {adminSidebar.map((element) => (
                    <Fragment key={element.id}>
                        {element.type === 'SINGLE' && (
                            <NavLink
                                to={element.path}
                                className={({ isActive }) =>
                                    clsx(isActive && activedStyle, !isActive && notActivedStyle)
                                }
                            >
                                <span>{element.icon}</span>
                                <span>{element.text}</span>
                            </NavLink>
                        )}
                        {element.type === 'PARENT' && (
                            <div onClick={() => handleShowTabs(+element.id)} className=" flex flex-col">
                                <div className="flex items-center justify-between cursor-pointer gap-2 px-4 py-2 hover:bg-gray-300">
                                    <div className="flex items-center gap-2">
                                        <span>{element.icon}</span>
                                        <span>{element.text}</span>
                                    </div>
                                    {actived.some((id) => id === element.id) ? (
                                        <AiOutlineCaretRight></AiOutlineCaretRight>
                                    ) : (
                                        <AiOutlineCaretDown></AiOutlineCaretDown>
                                    )}
                                </div>
                                {actived.some((id) => +id === +element.id) && (
                                    <div className="flex flex-col ">
                                        {element.submenu.map((item) => (
                                            <NavLink
                                                key={element.text}
                                                to={item.path}
                                                onClick={(e) => e.stopPropagation()}
                                                className={({ isActive }) =>
                                                    clsx(
                                                        isActive && activedStyle,
                                                        !isActive && notActivedStyle,
                                                        'pl-10',
                                                    )
                                                }
                                            >
                                                <span>{item.icon}</span>
                                                <span>{item.text}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default memo(AdminSidebar);
