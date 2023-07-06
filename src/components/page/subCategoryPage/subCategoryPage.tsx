import React, { useEffect, useState } from "react";
import { quantityForShowOptions, sortParams } from "../../../settings";
import "../../../styles/subCategoryPage.scss";
import SelectFieldNative from "../../common/form/selectFieldNative";
import Pagination from "../../common/pagination";
import ProductCard from "../../common/productCard";
import _ from "lodash";
import {
    getDataFromLocalStorage,
    updateLocalStorage,
    updateCartInLocalStorage
} from "../../../services/localStorageService";
import paginate from "../../../utils/paginate";
import InputFilterField from "../../common/form/inputFilterField";
import { useHistory } from "react-router-dom";
import Popup from "../../common/popup";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import {
    getSubCategoriesLoadingStatus,
    getSubCategory
} from "../../../store/subCategories";
import { getProducts } from "../../../store/products";
import { setCart } from "../../../store/cart";

interface SubCategoryPageProps {
    subCategoryName: string;
}

const SubCategoryPage = ({ subCategoryName }: SubCategoryPageProps) => {
    const dispatch = useAppDispatch();
    const subCategory = useAppSelector(getSubCategory(subCategoryName));
    const isLoading = useAppSelector(getSubCategoriesLoadingStatus());
    const products = useAppSelector(getProducts(subCategoryName));

    const history = useHistory();
    useEffect(() => {
        if (!isLoading && !subCategory) {
            history.push("/my-shop/404/");
        }
    }, [subCategory]);

    const subCategoryMinPrice = Math.min(
        ...products.map((product) => product.price)
    );
    const [minPriceForShow, setMinPriceForShow] = useState(subCategoryMinPrice);
    const [minPriceForFilter, setMinPriceForFilter] =
        useState(subCategoryMinPrice);
    const changeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = Number(event.target.value);
        if (newNumber <= 999999) {
            setMinPriceForShow(newNumber);
        }
    };
    const handleBlurForMinPrice = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newNumber = Number(event.target.value);
        if (newNumber < subCategoryMinPrice) {
            setMinPriceForShow(subCategoryMinPrice);
            setMinPriceForFilter(subCategoryMinPrice);
            return;
        }
        if (newNumber > maxPriceForFilter) {
            setMinPriceForShow(maxPriceForFilter);
            setMinPriceForFilter(maxPriceForFilter);
            return;
        }
        setMinPriceForFilter(newNumber);
    };
    const clearMinPrice = () => {
        setMinPriceForShow(subCategoryMinPrice);
        setMinPriceForFilter(subCategoryMinPrice);
    };

    const subCategoryMaxPrice = Math.max(
        ...products.map((product) => product.price)
    );
    const [maxPriceForShow, setMaxPriceForShow] = useState(subCategoryMaxPrice);
    const [maxPriceForFilter, setMaxPriceForFilter] =
        useState(subCategoryMaxPrice);
    const changeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = Number(event.target.value);
        if (newNumber <= 999999) {
            setMaxPriceForShow(newNumber);
        }
    };
    const handleBlurForMaxPrice = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newNumber = Number(event.target.value);
        if (newNumber > subCategoryMaxPrice) {
            setMaxPriceForShow(subCategoryMaxPrice);
            setMaxPriceForFilter(subCategoryMaxPrice);
            return;
        }
        if (newNumber < minPriceForFilter) {
            setMaxPriceForShow(minPriceForFilter);
            setMaxPriceForFilter(minPriceForFilter);
            return;
        }
        setMaxPriceForFilter(newNumber);
    };
    const clearMaxPrice = () => {
        setMaxPriceForShow(subCategoryMaxPrice);
        setMaxPriceForFilter(subCategoryMaxPrice);
    };

    const filteredProducts = products.filter(
        (product) =>
            product.price >= minPriceForFilter &&
            product.price <= maxPriceForFilter
    );

    const userPageSize = getDataFromLocalStorage("diplomUserPageSize");
    const userSortParam = getDataFromLocalStorage("diplomUserSortParam");

    const [sortBy, setSortBy] = useState({
        sortPath: sortParams[userSortParam].sortPath,
        sortDirection: sortParams[userSortParam].sortDirection,
        value: sortParams[userSortParam].value
    });
    const sortedProducts = _.orderBy(
        filteredProducts,
        sortBy.sortPath,
        sortBy.sortDirection
    );

    const totalQuantity = sortedProducts.length;

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState({
        value: quantityForShowOptions[userPageSize].value
    });

    const productsCrop = paginate(
        sortedProducts,
        currentPage,
        Number(pageSize.value)
    );

    const handlePageChange = (index: number) => {
        setCurrentPage(index + 1);
    };

    useEffect(() => {
        const pagesQuantity = Math.ceil(totalQuantity / Number(pageSize.value));
        if (currentPage > pagesQuantity) {
            setCurrentPage(pagesQuantity);
        }
    }, [totalQuantity]);

    const changeQuantityForShow = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setPageSize({ value: event.target.value });
        setCurrentPage(1);

        const choosedOption = Object.values(quantityForShowOptions).find(
            (option) => option.value === event.target.value
        )?.objectValue;
        choosedOption &&
            updateLocalStorage("diplomUserPageSize", choosedOption);
    };

    const changeSortParams = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortValue = event.target.value;
        const newSortPath = sortParams[newSortValue].sortPath;
        const newSortOrder = sortParams[newSortValue].sortDirection;

        const newParams = {
            sortPath: newSortPath,
            sortDirection: newSortOrder,
            value: newSortValue
        };

        setSortBy(newParams);
        setCurrentPage(1);
        updateLocalStorage("diplomUserSortParam", newSortValue);
    };

    useEffect(() => {
        clearMinPrice();
        clearMaxPrice();
        setCurrentPage(1);
    }, [subCategoryName]);

    const [addToCartId, setAddToCartId] = useState<string>();
    const addToCart = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            const productId = e.target.closest(".productCard")?.id;
            if (productId) {
                const data = {
                    [productId]: {
                        id: productId,
                        quantityToBuy: 1
                    }
                };
                updateCartInLocalStorage("diplomUserCart", data);
                dispatch(setCart(data));
            }
            setAddToCartId(productId);
            setIsPopupOpen(true);
        }
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            {subCategory && (
                <>
                    <h1 className="mainHeader">{subCategory.label}</h1>
                    <div className="subCategoryPage">
                        <div className="subCategoryPage__filterArea">
                            <div className="subCategoryPage__filterBlock">
                                <div className="filterBlock__label">
                                    Цена, рублей
                                </div>
                                <div className="filterBlock__content">
                                    <div className="filterBlock__filterItem">
                                        <InputFilterField
                                            type="number"
                                            name="minPriceInput"
                                            className="filterItem__price filterItem__price_first"
                                            value={minPriceForShow}
                                            subCategoryMinPrice={
                                                subCategoryMinPrice
                                            }
                                            subCategoryMaxPrice={
                                                subCategoryMaxPrice
                                            }
                                            handleBlur={handleBlurForMinPrice}
                                            handleChange={changeMinPrice}
                                            handleClick={clearMinPrice}
                                            message="от"
                                            classNameForMessage="filterItem__message"
                                            classNameForClearIcon="filterItem__clearIcon"
                                        />
                                    </div>
                                    <div className="filterBlock__filterItem">
                                        <InputFilterField
                                            type="number"
                                            name="maxPriceInput"
                                            className="filterItem__price filterItem__price_second"
                                            value={maxPriceForShow}
                                            subCategoryMinPrice={
                                                subCategoryMinPrice
                                            }
                                            subCategoryMaxPrice={
                                                subCategoryMaxPrice
                                            }
                                            handleBlur={handleBlurForMaxPrice}
                                            handleChange={changeMaxPrice}
                                            handleClick={clearMaxPrice}
                                            message="до"
                                            classNameForMessage="filterItem__message"
                                            classNameForClearIcon="filterItem__clearIcon"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {totalQuantity === 0 && (
                            <div className="systemMessage">
                                К сожалению, товары с указанными параметрами не
                                найдены.
                            </div>
                        )}
                        {totalQuantity > 0 && (
                            <div className="subCategoryPage__mainArea">
                                <div className="subCategoryPage__sortedArea">
                                    <div className="subCategoryPage__paginateSelect">
                                        <SelectFieldNative
                                            name="quantityForShow"
                                            value={String(pageSize.value)}
                                            options={Object.values(
                                                quantityForShowOptions
                                            )}
                                            handleChange={changeQuantityForShow}
                                        />
                                    </div>
                                    <div className="subCategoryPage__sortSelect">
                                        <SelectFieldNative
                                            name="sortParams"
                                            value={sortBy.value}
                                            options={Object.values(sortParams)}
                                            handleChange={changeSortParams}
                                        />
                                    </div>
                                </div>
                                <div className="subCategoryPage__productCards">
                                    {productsCrop.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            categoryName={
                                                subCategory.categoryName
                                            }
                                            subCategoryName={subCategory.name}
                                            productName={product.name}
                                            id={product._id}
                                            img={product.img}
                                            label={product.label}
                                            price={product.price}
                                            oldPrice={product.oldPrice}
                                            rate={product.rate}
                                            votes={product.votes}
                                            quantity={product.quantity}
                                            handleClick={addToCart}
                                            product={product}
                                        />
                                    ))}
                                </div>
                                <Pagination
                                    totalQuantity={totalQuantity}
                                    pageSize={Number(pageSize.value)}
                                    currentPage={currentPage}
                                    handleClick={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
            <Popup
                type="text"
                isPopupOpen={isPopupOpen}
                handleClose={() => setIsPopupOpen(false)}
                productId={addToCartId}
            />
        </>
    );
};

export default SubCategoryPage;
