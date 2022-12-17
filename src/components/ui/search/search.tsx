import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHook";
import { useClickCatcher } from "../../../hooks/useClickCatcher";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { IProduct, ISubCategory } from "../../../models";
import { getAllProducts } from "../../../store/products";
import { getAllSubCategories } from "../../../store/subCategories";
import "../../../styles/navBarSimple.scss";
import betweenNumberSpacer from "../../../utils/betweenNumberSpacer";
import limitedText from "../../../utils/limitedText";
import TextField from "../../common/form/textField";

const Search = () => {
    const { windowWidth } = useWindowDimensions();
    const limitOfRows = windowWidth && windowWidth >= 767 ? 5 : 3;
    const history = useHistory();
    const [searchParams, setSearchParams] = useState("");
    const subCategoriesAllData = useAppSelector(getAllSubCategories());
    const productsAllData = useAppSelector(getAllProducts());
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showList, setShowList] = useState(false);
    const { searchIsInFocus } = useClickCatcher();

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchParams(newValue);
        if (subCategoriesAllData && productsAllData && newValue.trim() !== "") {
            const searchSubCategoriesResult = subCategoriesAllData.filter(
                (subCategory) =>
                    subCategory.label
                        .toLowerCase()
                        .includes(newValue.trim().toLowerCase())
            );
            setSubCategories(searchSubCategoriesResult);
            const searchProductsResult = productsAllData.filter((product) =>
                product.label
                    .toLowerCase()
                    .includes(newValue.trim().toLowerCase())
            );
            setProducts(searchProductsResult);
        }
    };

    const changePage = (link: string) => {
        history.push(link);
        setSearchParams("");
        setShowList(false);
    };

    return (
        <div className="search">
            <div className="search__field">
                <TextField
                    type="text"
                    name="search"
                    placeholder="Поиск..."
                    value={searchParams}
                    handleChange={handleChangeSearch}
                    handleFocus={() => setShowList(true)}
                />
                {(subCategories.length > 0 || products.length > 0) && showList && searchParams && searchIsInFocus && (
                    <div className="search__resultArea">
                        {subCategories.map((subCategory, index) => {
                            if (index <= limitOfRows) {
                                return (
                                    <div
                                        key={subCategory._id}
                                        className="search__searchItem searchItem"
                                        onClick={() =>
                                            changePage(
                                                "/my-shop/categories/" +
                                                subCategory.categoryName +
                                                "/" +
                                                subCategory.name +
                                                "/"
                                            )
                                        }
                                    >
                                        <div className="searchItem__image">
                                            <img
                                                src={subCategory.img}
                                                alt={subCategory.label}
                                            />
                                        </div>
                                        <div className="searchItem__textField">
                                            <div className="searchItem__label">
                                                <b>{subCategory.label}</b>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else return null;
                        })}
                        {products.map((product, index) => {
                            if (
                                index <=
                                limitOfRows - subCategories.length
                            ) {
                                return (
                                    <div
                                        key={product._id}
                                        className="search__searchItem searchItem"
                                        onClick={() =>
                                            changePage(
                                                "/my-shop/categories/" +
                                                product.categoryName +
                                                "/" +
                                                product.subCategoryName +
                                                "/" +
                                                product.name +
                                                "/"
                                            )
                                        }
                                    >
                                        <div className="searchItem__image">
                                            <img
                                                src={product.img}
                                                alt={product.label}
                                            />
                                        </div>
                                        <div className="searchItem__textField">
                                            <div className="searchItem__label">
                                                {limitedText(
                                                    product.label,
                                                    windowWidth &&
                                                        windowWidth >= 480
                                                        ? 65
                                                        : 30
                                                )}
                                            </div>
                                            <div className="searchItem__price">
                                                {betweenNumberSpacer(
                                                    product.price
                                                )}{" "}
                                                руб.
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else return null;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
