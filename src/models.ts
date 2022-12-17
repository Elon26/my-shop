export interface IStringObject {
    [key: string]: string;
}

export interface INumberObject {
    [key: string]: number;
}

export interface HOCProps {
    children: React.ReactNode;
}

export interface IStores {
    id: string;
    address: string;
    phone: number;
    schedule: {
        from: string;
        to: string;
    };
}

export interface ICategory {
    _id: string;
    name: string;
    label: string;
    img: string;
}

export interface ISubCategory {
    _id: string;
    categoryName: string;
    name: string;
    label: string;
    img: string;
}

export interface IProduct {
    _id: string;
    categoryName: string;
    subCategoryName: string;
    name: string;
    label: string;
    brand: string;
    quantity: number;
    oldPrice: number;
    price: number;
    rate: number;
    votes: number;
    img: string;
}

export interface IProductInCart {
    _id: string;
    categoryName: string;
    subCategoryName: string;
    name: string;
    label: string;
    brand: string;
    quantity: number;
    oldPrice: number;
    price: number;
    rate: number;
    votes: number;
    img: string;
    quantityToBuy: number;
}

export interface ISort {
    [key: string]: {
        value: string;
        objectValue: string;
        sortPath?: string;
        sortDirection?: "asc" | "desc";
        text: string;
    };
}

export interface ICartInLocalStorageItem {
    [key: string]: {
        id: string;
        quantityToBuy: number;
    };
}

export interface IValidateSettings {
    [key: string]: {
        [key: string]: {
            message: string;
        };
    };
}

export interface IToken {
    expiresIn: number;
    idToken: string;
    localId: string;
    refreshToken: string;
}

export interface IAccessToken {
    expires_in: number;
    id_token: string;
    user_id: string;
    refresh_token: string;
}

export interface IAxiosResponseData {
    error: {
        message: string;
        code: number;
        errors: {
            domain: string;
            message: string;
            reason: string;
        };
    };
}

export interface IAuthData {
    payload: {
        email: string;
        password: string;
    };
}
