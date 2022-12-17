import { ICartInLocalStorageItem, IToken } from "./../models";
import { defaultUserData } from "../settings";

export const getDataFromLocalStorage = (name: string) => {
    const data = localStorage.getItem(name) || defaultUserData[name];
    return data;
};

export const updateLocalStorage = (name: string, data: string) => {
    const newData = localStorage.setItem(name, data);
    return newData;
};

export const updateCartInLocalStorage = (
    name: string,
    data: ICartInLocalStorageItem
) => {
    const lastData: ICartInLocalStorageItem =
        (JSON.parse(
            localStorage.getItem(name) || "false"
        ) as ICartInLocalStorageItem) || {};
    const updatedData = { ...lastData, ...data };
    const newData = localStorage.setItem(name, JSON.stringify(updatedData));
    return newData;
};

export const getCartFromLocalStorage = (name: string) => {
    const data =
        (JSON.parse(
            localStorage.getItem(name) || "false"
        ) as ICartInLocalStorageItem) || {};
    return data;
};

export const deleteCartItemFromLocalStorage = (name: string, id: string) => {
    const lastData =
        (JSON.parse(
            localStorage.getItem(name) || "false"
        ) as ICartInLocalStorageItem) || {};
    delete lastData[id];
    const newData = localStorage.setItem(name, JSON.stringify(lastData));
    return newData;
};

export const clearCartFromLocalStorage = (name: string) => {
    localStorage.removeItem(name);
};

const TOKEN_KEY = "diplomJwtId";
const REFRESH_KEY = "diplomJwtRefresh";
const EXPIRES_KEY = "diplomJwtExpires";
const USERID_KEY = "diplomUserLocalId";

export function setTokens({
    expiresIn = 3600,
    idToken,
    localId,
    refreshToken
}: IToken) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, String(expiresDate));
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
