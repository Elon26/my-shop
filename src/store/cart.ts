import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartInLocalStorageItem } from "../models";
import { AppDispatch, RootState } from "./createStore";
import { getCartFromLocalStorage } from "../services/localStorageService";

interface ICartState {
    entities: ICartInLocalStorageItem | null;
}

const initialState: ICartState = {
    entities: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartReceived: (state, action: PayloadAction<ICartInLocalStorageItem>) => {
            state.entities = action.payload;
        },
        cartChanged: (
            state: ICartState,
            action: PayloadAction<ICartInLocalStorageItem | null>
        ): void => {
            state.entities = { ...state.entities, ...action.payload };
        },
        cartItemRemoved: (
            state: ICartState,
            action: PayloadAction<string>
        ): void => {
            const newState = state.entities;
            if (newState) {
                delete newState[action.payload];
                state.entities = newState;
            }
        },
        cartCleared: (
            state: ICartState
        ): void => {
            state.entities = null;
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const { cartReceived, cartChanged, cartItemRemoved, cartCleared } = actions;

export const loadCart = () => (dispatch: AppDispatch) => {
    const userCart = getCartFromLocalStorage("diplomUserCart");
    dispatch(cartReceived(userCart));
};

export const getCart = () => (state: RootState) =>
    state.cart.entities;

export const setCart =
    (payload: ICartInLocalStorageItem | null) =>
        (dispatch: AppDispatch): void => {
            dispatch(cartChanged(payload));
        };

export const removeCartItem =
    (id: string) =>
        (dispatch: AppDispatch): void => {
            dispatch(cartItemRemoved(id));
        };

export const clearCart =
    () => (dispatch: AppDispatch): void => {
        dispatch(cartCleared());
    };

export default cartReducer;
