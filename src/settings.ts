import { ISort, IStringObject } from "./models";

export const defaultUserData: IStringObject = {
    diplomUserPageSize: "four",
    diplomUserSortParam: "popular"
};

export const defaultCategoryData = {
    _id: "",
    name: "",
    label: "",
    img: ""
};

export const defaultSubCategoryData = {
    _id: "",
    categoryName: "",
    name: "",
    label: "",
    img: ""
};

export const defaultProductData = {
    _id: "",
    categoryName: "",
    subCategoryName: "",
    name: "",
    label: "",
    brand: "",
    quantity: 0,
    oldPrice: 0,
    price: 0,
    rate: 0,
    votes: 0,
    img: ""
};

export const quantityForShowOptions: ISort = {
    four: {
        value: "4",
        objectValue: "four",
        text: "По 4 товарa на странице"
    },
    eight: {
        value: "8",
        objectValue: "eight",
        text: "По 8 товаров на странице"
    },
    twelve: {
        value: "12",
        objectValue: "twelve",
        text: "По 12 товаров на странице"
    }
};

export const sortParams: ISort = {
    popular: {
        value: "popular",
        objectValue: "popular",
        sortPath: "rate",
        sortDirection: "desc",
        text: "Сначала популярные"
    },
    cheap: {
        value: "cheap",
        objectValue: "cheap",
        sortPath: "price",
        sortDirection: "asc",
        text: "Сначала недорогие"
    },
    exspensive: {
        value: "exspensive",
        objectValue: "exspensive",
        sortPath: "price",
        sortDirection: "desc",
        text: "Сначала дорогие"
    }
};
