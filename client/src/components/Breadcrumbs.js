import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import icons from '../utils/icons';

const { IoIosArrowForward } = icons;

const Breadcrumbs = ({ title, category }) => {
    const routes = [
        { path: '/:category', breadcrumb: category },
        { path: '/', breadcrumb: 'Home' },
        { path: '/:category/:pid/:title', breadcrumb: title },
    ];
    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <div className="text-sm flex items-center">
            {breadcrumbs
                ?.filter((element) => !element.match.route === false)
                .map(({ match, breadcrumb }, index, self) => (
                    <Link className="flex items-center hover:text-main gap-1" key={match.pathname} to={match.pathname}>
                        <span className="capitalize">{breadcrumb}</span>
                        {index !== self.length - 1 && <IoIosArrowForward></IoIosArrowForward>}
                    </Link>
                ))}
        </div>
    );
};

export default Breadcrumbs;
