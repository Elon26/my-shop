import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ICategory } from "../models";
import errorCatcher from "../utils/errorCatcher";
import { AppDispatch, RootState } from "./createStore";

interface ICategoriesState {
    entities: ICategory[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ICategoriesState = {
    entities: [],
    isLoading: true,
    error: null
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceived: (state, action: PayloadAction<ICategory[]>) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        categoriesRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed } =
    actions;

export const loadCategoriesList = () => async (dispatch: AppDispatch) => {
    dispatch(categoriesRequested());
    try {
        const response = await axios.get<ICategory[]>("categories.json/");
        dispatch(categoriesReceived(Object.values(response.data)));
    } catch (e: unknown) {
        const error = e as AxiosError;
        dispatch(categoriesRequestFailed(error.message));
        errorCatcher(e);
    }
};

export const getAllCategories = () => (state: RootState) =>
    state.categories.entities;
export const getCategory = (name: string) => (state: RootState) =>
    state.categories.entities.find((сategory) => сategory.name === name);
export const getCategoriesLoadingStatus = () => (state: RootState) =>
    state.categories.isLoading;

export default categoriesReducer;
