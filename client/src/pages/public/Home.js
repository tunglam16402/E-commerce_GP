import { React} from 'react';
import { Sidebar, Banner, BestSeller, DealDaily, FeatureProducts, CustomSlider } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';

const { IoIosArrowForward } = icons;

const Home = () => {
    const { newProducts } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.app);

    return (
        <>
            <div className="w-main flex mt-6">
                <div className="flex flex-col gap-5 w-[25%] flex-auto ">
                    <Sidebar></Sidebar>
                    <DealDaily></DealDaily>
                </div>
                <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
                    <Banner></Banner>
                    <BestSeller></BestSeller>
                </div>
            </div>
            <div className="my-8">
                <FeatureProducts></FeatureProducts>
            </div>
            <div className="my-8 w-main">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main uppercase">new arrivals</h3>
                <div className=" mt-4 mx-[-10px] ">
                    <CustomSlider products={newProducts}></CustomSlider>
                </div>
            </div>
            <div className="w-main">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main uppercase">
                    hot collections
                </h3>
                <div className="flex flex-wrap gap-4 mt-4 ">
                    {categories
                        ?.filter((element) => element.brand.length > 0)
                        ?.map((element) => (
                            <div key={element._id} className="w-[396px]">
                                <div className="border flex p-4 gap-4 min-h-[202px]">
                                    <img
                                        src={element?.image}
                                        alt=""
                                        className="flex-1 w-[144px] h-[129px] object-cover"
                                    ></img>
                                    <div className="flex-1 text-gray-700 mb-2">
                                        <h4 className="font-semibold uppercase mb-2">{element?.title}</h4>
                                        <ul>
                                            {element?.brand?.map((item, index) => (
                                                <span key={index} className="flex gap-1 items-center text-gray-500 mb-1">
                                                    <IoIosArrowForward></IoIosArrowForward>
                                                    <li key={item}>{item}</li>
                                                </span>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="my-8 w-main">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main uppercase">
                    blog posts
                </h3>
            </div>
        </>
    );
};

export default Home;
