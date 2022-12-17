import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import subCategoriesReducer from "./subCategories";
import usersReducer from "./users";

const rootReduser = combineReducers({
    categories: categoriesReducer,
    subCategories: subCategoriesReducer,
    products: productsReducer,
    users: usersReducer
});

const store = configureStore({
    reducer: rootReduser
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
