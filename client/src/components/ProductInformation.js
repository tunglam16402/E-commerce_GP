import React, { memo, useState } from 'react';
import { productInFoTabs } from '../utils/constant';

const activedStyles = '';
const notActivedStyles = '';

const ProductInformation = () => {
    const [activedTab, setActivedTab] = useState(1);
    return (
        <div>
            <div className="flex uppercase gap-1 items-center relative bottom-[-1px]">
                {productInFoTabs.map((element) => (
                    <span
                        className={`py-2 px-6 cursor-pointer ${
                            activedTab === element.id ? 'bg-white border border-b-0' : 'bg-gray-200'
                        }`}
                        key={element.id}
                        onClick={() => setActivedTab(element.id)}
                    >
                        {element.name}
                    </span>
                ))}
            </div>
            <div className="w-full  border p-4">
                {productInFoTabs.some((element) => element.id === activedTab) &&
                    productInFoTabs.find((element) => element.id === activedTab)?.content}
            </div>
        </div>
    );
};

export default memo(ProductInformation);
