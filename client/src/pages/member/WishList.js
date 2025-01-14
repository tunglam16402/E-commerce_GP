import { Product } from 'components';
import React from 'react';
import { useSelector } from 'react-redux';

const WishList = () => {
    const { current } = useSelector((state) => state.user);
    return (
        <div className="relative px-4">
            <header className="text-3xl font-semibold py-4 border-b border-main">My Wishlist</header>
            <div className="p-4 w-full flex flex-wrap gap-4">
                {current?.wishlist?.map((element) => (
                    <div key={element._id}>
                        <Product
                            pid={element._id}
                            productData={element}
                            className="bg-white rounded-md drop-shadow flex flex-col pt-3 gap-3 w-[284px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishList;
