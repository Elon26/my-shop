import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IProduct } from "../models";
import errorCatcher from "../utils/errorCatcher";
import { AppDispatch, RootState } from "./createStore";

interface IProductsState {
    entities: IProduct[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IProductsState = {
    entities: [],
    isLoading: true,
    error: null
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action: PayloadAction<IProduct[]>) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        productsRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsRequestFailed } = actions;

export const loadProductsList = () => async (dispatch: AppDispatch) => {
    dispatch(productsRequested());
    try {
        const response = await axios.get<IProduct[]>("products.json/");
        dispatch(productsReceived(Object.values(response.data)));
    } catch (e: unknown) {
        const error = e as AxiosError;
        dispatch(productsRequestFailed(error.message));
        errorCatcher(e);
    }
};

export const getAllProducts = () => (state: RootState) =>
    state.products.entities;
export const getProducts = (subCategoryName: string) => (state: RootState) =>
    state.products.entities.filter(
        (product) => product.subCategoryName === subCategoryName
    );
export const getProduct = (name: string) => (state: RootState) =>
    state.products.entities.find((product) => product.name === name);
export const getProductById = (id: string) => (state: RootState) =>
    state.products.entities.find((product) => product._id === id);
export const getProductsById = (ids: string[]) => (state: RootState) =>
    state.products.entities.filter((product) => ids.includes(product._id));
export const getProductsLoadingStatus = () => (state: RootState) =>
    state.categories.isLoading;

export default productsReducer;
