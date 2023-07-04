import React from "react";
import CategoriesForMainPage from "../../components/page/categoriesForMainPage";
import { useAppSelector } from "../../hooks/reduxHook";
import { getAllCategories } from "../../store/categories";
import { getAllSubCategories } from "../../store/subCategories";
import "../../styles/mainPage.scss";
import useMockData from "../../utils/mockData";
import { wrapAsyncFunction } from "../../utils/wrapAsyncFunction";
import MainSlider from "../../components/ui/mainSlider/MainSlider";
import PopularSlider from "../../components/ui/popularSlider/PopularSlider";

const MainPage = () => {
    const isShow = false;
    const { initialize, progress, status } = useMockData();
    const handleClick = async () => {
        await initialize();
    };

    const subCategories = useAppSelector(getAllSubCategories());
    const categories = useAppSelector(getAllCategories());

    return (
        <>
            <MainSlider />
            <div className="categories">
                {categories.map((category) => (
                    <CategoriesForMainPage
                        key={category._id}
                        name={category.name}
                        img={category.img}
                        label={category.label}
                        subCategories={subCategories.filter(
                            (subCategory) =>
                                subCategory.categoryName === category.name
                        )}
                    />
                ))}
            </div>
            <PopularSlider />
            {isShow && (
                <>
                    <h3>Загрузка дефолтной базы данных</h3>
                    <ul>
                        <li>Status: {status}</li>
                        <li>Progress: {progress}%</li>
                    </ul>
                    <button
                        className="button"
                        onClick={wrapAsyncFunction(handleClick)}
                    >
                        Загрузить
                    </button>
                </>
            )}
        </>
    );
};

export default MainPage;
