import axios from "axios";
import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { IProduct, IStringObject } from "../../../models";
import { defaultProductData } from "../../../settings";
import { getAllCategories } from "../../../store/categories";
import { loadProductsList } from "../../../store/products";
import { getAllSubCategories } from "../../../store/subCategories";
import validator from "../../../utils/validator";
import { wrapAsyncFunction } from "../../../utils/wrapAsyncFunction";
import SelectFieldNative from "../../common/form/selectFieldNative";
import TextField from "../../common/form/textField";
import Loader from "../../ui/loader";

const defaultErrorObject = {
    name: "",
    label: "",
    brand: "",
    price: ""
};

const ProductCreatePage = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const categories = useAppSelector(getAllCategories());
    const subCategoriesAll = useAppSelector(getAllSubCategories());
    const product = {
        ...defaultProductData,
        categoryName: "kitchen",
        subCategoryName: "fridges"
    };

    const [data, setData] = useState<IProduct>(product);
    const [errors, setErrors] = useState<IStringObject>(defaultErrorObject);
    const [subCategories, setSubCategories] = useState(subCategoriesAll);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [freshForm, setFreshForm] = useState(true);

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
        setFreshForm(false);
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
        if (!freshForm) setIsValid(validate());
    }, [data]);

    const createImg = (subCategoryName: string): string => {
        if (subCategoryName === "fridges") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg1.jpg?alt=media&token=cff3b702-75ca-4427-9185-956962edbcd6";
        if (subCategoryName === "dishwashers") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg3.jpg?alt=media&token=285bc9c9-752b-4909-b086-1319aa9e3a22";
        if (subCategoryName === "coffeeMakers") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg2.jpg?alt=media&token=5c753dd1-5384-45c5-a9f0-dfbb782636fc";
        if (subCategoryName === "microwaves") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg4.jpg?alt=media&token=d9d0fd75-6897-4c12-b885-cfddcdd4ace1";
        if (subCategoryName === "TVs") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg16.jpg?alt=media&token=18624c79-3ceb-4658-a9b9-d60faf448cc3";
        if (subCategoryName === "soundbars") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg13.jpg?alt=media&token=065c4b9f-305e-4f13-ba1a-6efcaa82dc14";
        if (subCategoryName === "musicSystems") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg14.jpg?alt=media&token=792a09c6-7628-44cf-b2c0-83828db4136a";
        if (subCategoryName === "synthesizers") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg15.jpg?alt=media&token=29df0a7c-5742-42ac-b815-8e1760e7812d";
        if (subCategoryName === "smartphones") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg5.jpg?alt=media&token=ee3e05ce-b591-47a5-aaaa-d4e12153c6e3";
        if (subCategoryName === "mobilePhones") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg6.jpg?alt=media&token=d6ad6388-9483-415b-86ec-9678c9bc27d0";
        if (subCategoryName === "externalBatteries") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg7.jpg?alt=media&token=b3531e8d-6965-4133-b125-190051f5155b";
        if (subCategoryName === "chargers") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg8.jpg?alt=media&token=b32ca01c-4f31-45dc-8145-c88daaea1f08";
        if (subCategoryName === "laptops") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg9.jpg?alt=media&token=aaf91331-3dfe-40ca-96a3-92a65cce4333";
        if (subCategoryName === "systemBlocks") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg10.jpg?alt=media&token=b1bd4b67-6402-4533-af21-1cc8c3f5ebcb";
        if (subCategoryName === "monitors") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg11.jpg?alt=media&token=bc5920c1-400d-4c6c-a20d-20857a74e628";
        if (subCategoryName === "pcSpeakers") return "https://firebasestorage.googleapis.com/v0/b/diplom-project-es2612.appspot.com/o/subcategories%2Fsubcateg12.jpg?alt=media&token=10d74ffc-8cb5-40e6-9ee3-6956d4ff305b";
        return "";
    };

    const sendProductChangeForm = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (isValid) {
            toast.info("Продукт добавлен в базу данных");
            const id = nanoid();
            data._id = id;
            data.img = createImg(data.subCategoryName) || "";
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
                Панель создания нового продукта
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
                                Создать
                            </button>
                        )}
                        {!isValid && (
                            <div className="productChange__button button button_disabled">
                                Создать
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

export default ProductCreatePage;
