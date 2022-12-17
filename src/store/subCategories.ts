import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ISubCategory } from "../models";
import errorCatcher from "../utils/errorCatcher";
import { AppDispatch, RootState } from "./createStore";

interface ISubCategoriesState {
    entities: ISubCategory[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ISubCategoriesState = {
    entities: [],
    isLoading: true,
    error: null
};

const subCategoriesSlice = createSlice({
    name: "subCategories",
    initialState,
    reducers: {
        subCategoriesRequested: (state) => {
            state.isLoading = true;
        },
        subCategoriesReceived: (
            state,
            action: PayloadAction<ISubCategory[]>
        ) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        subCategoriesRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: subCategoriesReducer, actions } = subCategoriesSlice;
const {
    subCategoriesRequested,
    subCategoriesReceived,
    subCategoriesRequestFailed
} = actions;

export const loadSubCategoriesList = () => async (dispatch: AppDispatch) => {
    dispatch(subCategoriesRequested());
    try {
        const response = await axios.get<ISubCategory[]>("subCategories.json/");
        dispatch(subCategoriesReceived(Object.values(response.data)));
    } catch (e: unknown) {
        const error = e as AxiosError;
        dispatch(subCategoriesRequestFailed(error.message));
        errorCatcher(e);
    }
};

export const getAllSubCategories = () => (state: RootState) =>
    state.subCategories.entities;
export const getSubCategories = (categoryName: string) => (state: RootState) =>
    state.subCategories.entities.filter(
        (subCategory) => subCategory.categoryName === categoryName
    );
export const getSubCategory = (name: string) => (state: RootState) =>
    state.subCategories.entities.find(
        (subCategory) => subCategory.name === name
    );
export const getSubCategoriesLoadingStatus = () => (state: RootState) =>
    state.categories.isLoading;

export default subCategoriesReducer;
