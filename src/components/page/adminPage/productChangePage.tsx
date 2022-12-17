import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { IProduct, IStringObject } from "../../../models";
import { defaultProductData } from "../../../settings";
import { getAllCategories } from "../../../store/categories";
import {
    getProductById,
    getProductsLoadingStatus,
    loadProductsList
} from "../../../store/products";
import { getAllSubCategories } from "../../../store/subCategories";
import validator from "../../../utils/validator";
import { wrapAsyncFunction } from "../../../utils/wrapAsyncFunction";
import SelectFieldNative from "../../common/form/selectFieldNative";
import TextField from "../../common/form/textField";
import Loader from "../../ui/loader";

interface ProductChangePageProps {
    productId: string;
}

const defaultErrorObject = {
    name: "",
    label: "",
    brand: "",
    price: ""
};

const ProductChangePage = ({ productId }: ProductChangePageProps) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(getAllCategories());
    const subCategoriesAll = useAppSelector(getAllSubCategories());
    const product =
        useAppSelector(getProductById(productId)) || defaultProductData;
    const isLoadingProduct = useAppSelector(getProductsLoadingStatus());

    const history = useHistory();
    useEffect(() => {
        if (!isLoadingProduct && product._id === "") {
            history.push("/my-shop/admin/");
        }
    }, [product]);

    const [data, setData] = useState<IProduct>(product);
    const [errors, setErrors] = useState<IStringObject>(defaultErrorObject);
    const [subCategories, setSubCategories] = useState(subCategoriesAll);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setSubCategories(
            subCategoriesAll.filter(
                (subCategory) => subCategory.categoryName === data.categoryName
            )
        );
    }, [data.categoryName]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле не может быть пустым"
            },
            isNameForUrl: {
                message:
                    "Наименование может содержать только латинские буквы, без пробелов, цифры и символ '_'"
            }
        },
        label: {
            isRequired: {
                message: "Поле не может быть пустым"
            }
        },
        brand: {
            isRequired: {
                message: "Поле не может быть пустым"
            }
        },
        price: {
            isRequired: {
                message: "Текущая цена не может быть равна нулю"
            }
        }
    };

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        if (
            e.target.name === "quantity" ||
            e.target.name === "oldPrice" ||
            e.target.name === "price" ||
            e.target.name === "rate" ||
            e.target.name === "votes"
        ) {
            if (Number(e.target.value) <= 0) {
                setData((prevState) => ({
                    ...prevState,
                    [e.target.name]: 0
                }));
            } else {
                if (e.target.name === "rate") {
                    if (Number(e.target.value) > 5) {
                        setData((prevState) => ({
                            ...prevState,
                            [e.target.name]: 5
                        }));
                    } else {
                        setData((prevState) => ({
                            ...prevState,
                            [e.target.name]:
                                Math.floor(Number(e.target.value) * 10) / 10
                        }));
                    }
                } else {
                    setData((prevState) => ({
                        ...prevState,
                        [e.target.name]: Math.floor(Number(e.target.value))
                    }));
                }
            }
        } else {
            setData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
        if (e.target.name === "categoryName") {
            setData((prevState) => ({
                ...prevState,
                subCategoryName: subCategoriesAll.filter(
                    (subCategory) => subCategory.categoryName === e.target.value
                )[0].name
            }));
        }
    };

    const validate = () => {
        const objectForValidate = {
            name: data.name,
            label: data.label,
            brand: data.brand,
            price: data.price === 0 ? "" : String(data.price)
        };
        const errors = validator(objectForValidate, validatorConfig);
        setErrors(errors);
        return !Object.keys(errors).length;
    };

    useEffect(() => {
        setIsValid(validate());
    }, [data]);

    const sendProductChangeForm = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (isValid) {
            toast.info("Изменения внесены в базу данных");
            setIsLoading(true);
            await axios.put("products/" + data._id + ".json", data);
            await dispatch(loadProductsList());
            setIsLoading(false);
            history.push("/my-shop/admin/");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="productChange">
            <h1 className="productChange__title">
                Панель изменения параметров продукта
            </h1>
            {data && (
                <form
                    className="productChange__form"
                    onSubmit={wrapAsyncFunction(sendProductChangeForm)}
                >
                    <div className="productChange__input-item">
                        <SelectFieldNative
                            name="categoryName"
                            label="Категория"
                            value={data.categoryName}
                            options={categories.map((category) => {
                                return {
                                    text: category.label,
                                    value: category.name
                                };
                            })}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <SelectFieldNative
                            name="subCategoryName"
                            label="Подкатегория"
                            value={data.subCategoryName}
                            options={subCategories.map((subCategory) => {
                                return {
                                    text: subCategory.label,
                                    value: subCategory.name
                                };
                            })}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <TextField
                            type="text"
                            label="Наименование в базе данных и адресной строке"
                            name="name"
                            value={data.name}
                            handleChange={handleChange}
                            error={errors.name}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <TextField
                            type="text"
                            label="Наименование для потребителя"
                            name="label"
                            value={data.label}
                            handleChange={handleChange}
                            error={errors.label}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <TextField
                            type="text"
                            label="Брэнд"
                            name="brand"
                            value={data.brand}
                            handleChange={handleChange}
                            error={errors.brand}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <TextField
                            type="number"
                            label="Количество на складе"
                            name="quantity"
                            value={data.quantity}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <TextField
                            type="number"
                            label="Старая цена"
                            name="oldPrice"
                            value={data.oldPrice}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <TextField
                            type="number"
                            label="Текущая цена"
                            name="price"
                            value={data.price}
                            handleChange={handleChange}
                            error={errors.price}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <TextField
                            type="number"
                            label="Рейтинг (от 0 до 5)"
                            name="rate"
                            value={data.rate}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="productChange__input-item">
                        <TextField
                            type="number"
                            label="Количество проголосовавших"
                            name="votes"
                            value={data.votes}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="productChange__button-area">
                        {isValid && (
                            <button
                                className="productChange__button button"
                                type="submit"
                            >
                                Отправить
                            </button>
                        )}
                        {!isValid && (
                            <div className="productChange__button button button_disabled">
                                Отправить
                            </div>
                        )}
                        <Link to={"/my-shop/admin/"}>
                            <button
                                className="productChange__button button button_green"
                                type="button"
                            >
                                Назад
                            </button>
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProductChangePage;
