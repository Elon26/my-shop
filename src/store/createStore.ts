import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import subCategoriesReducer from "./subCategories";
import usersReducer from "./users";
import cartReducer from "./cart";

const rootReduser = combineReducers({
    categories: categoriesReducer,
    subCategories: subCategoriesReducer,
    products: productsReducer,
    users: usersReducer,
    cart: cartReducer
});

const store = configureStore({
    reducer: rootReduser
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
