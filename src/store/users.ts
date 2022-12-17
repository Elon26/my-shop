import { REACT_APP_FIREBASE_KEY } from "./../constants";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { isFirebase, SERVER_URL } from "../constants";
import {
    IAccessToken,
    IAxiosResponseData,
    IStringObject,
    IToken
} from "../models";
import {
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData,
    setTokens
} from "../services/localStorageService";
import errorCatcher from "../utils/errorCatcher";
import { AppDispatch, RootState } from "./createStore";

export const httpAuth = axios.create({
    baseURL: SERVER_URL
});

httpAuth.interceptors.request.use(
    async function (config) {
        if (isFirebase) {
            const expiresDate = getTokenExpiresDate();
            const refreshToken = getRefreshToken();
            const url =
                `https://securetoken.googleapis.com/v1/token?key=${REACT_APP_FIREBASE_KEY}`;
            if (refreshToken && Date.now() > Number(expiresDate)) {
                const response =
                    url &&
                    (await axios.post(url, {
                        grant_type: "refresh_token",
                        refresh_token: refreshToken
                    }));
                const data = response && (response.data as IAccessToken);

                data &&
                    setTokens({
                        idToken: data.id_token,
                        refreshToken: data.refresh_token,
                        expiresIn: data.expires_in,
                        localId: data.user_id
                    });
            }
        }

        const accessToken = getAccessToken();
        if (accessToken) {
            config.params = {
                ...config.params,
                auth: accessToken
            } as IStringObject;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

interface IUsersState {
    entities: IStringObject[];
    isLoading: boolean;
    error: string | null;
    auth: IStringObject;
    isLoggedIn: boolean;
}

const initialState: IUsersState = getAccessToken()
    ? {
        entities: [],
        isLoading: true,
        error: null,
        auth: { userId: String(getUserId()) },
        isLoggedIn: true
    }
    : {
        entities: [],
        isLoading: false,
        error: null,
        auth: { userId: "" },
        isLoggedIn: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action: PayloadAction<IStringObject[]>) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        authRequestSuccessed: (state, action: PayloadAction<IStringObject>) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        usersRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        userCreated: (state, action: PayloadAction<IStringObject>) => {
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.auth = { userId: "" };
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccessed,
    userLoggedOut,
    userCreated,
    authRequestFailed,
    authRequested
} = actions;

export const loadUsersList = () => async (dispatch: AppDispatch) => {
    dispatch(usersRequested());
    try {
        const response = await httpAuth.get<IStringObject[]>("users.json/");
        dispatch(usersReceived(Object.values(response.data)));
    } catch (e: unknown) {
        const error = e as AxiosError;
        dispatch(usersRequestFailed(error.message));
        errorCatcher(e);
    }
};

const createUserRequested = createAction("users/createUserRequested");

export const singIn =
    (payload: IStringObject) => async (dispatch: AppDispatch) => {
        const { email, password } = payload;
        const url =
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_FIREBASE_KEY}`;
        dispatch(authRequested());
        try {
            const response =
                url &&
                (await httpAuth.post(url, {
                    email,
                    password,
                    returnSecureToken: true
                }));
            const data = response && (response.data as IToken);
            data && dispatch(authRequestSuccessed({ userId: data.localId }));
            data && setTokens(data);
        } catch (e) {
            errorCatcher(e);
            const error = e as AxiosError;
            const errorResponse = error.response as AxiosResponse;
            const errorResponseData = errorResponse.data as IAxiosResponseData;
            const code = errorResponseData.error.code;
            const message = errorResponseData.error.message;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Указанный email не зарегистрирован"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Пароль указан неверно"
                    };
                    throw errorObject;
                }
            }
            dispatch(authRequestFailed(message));
        }
    };

export const singUp =
    ({ email, password, name }: IStringObject) =>
        async (dispatch: AppDispatch) => {
            dispatch(authRequested());
            const url =
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_FIREBASE_KEY}`;
            try {
                const response =
                    url &&
                    (await httpAuth.post(url, {
                        email,
                        password,
                        returnSecureToken: true
                    }));
                const data = response && (response.data as IToken);
                data && setTokens(data);
                data && dispatch(authRequestSuccessed({ userId: data.localId }));
                const user = data && {
                    id: data.localId,
                    name
                };
                user && dispatch(createUser(user));
            } catch (e) {
                errorCatcher(e);
                const error = e as AxiosError;
                const errorResponse = error.response as AxiosResponse;
                const errorResponseData = errorResponse.data as IAxiosResponseData;
                const code = errorResponseData.error.code;
                const message = errorResponseData.error.message;

                if (code === 400 && message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
                dispatch(authRequestFailed(message));
            }
        };

export const logout = () => (dispatch: AppDispatch) => {
    removeAuthData();
    dispatch(userLoggedOut());
};

function createUser(payload: IStringObject) {
    return async function (dispatch: AppDispatch) {
        dispatch(createUserRequested());
        try {
            const response = await axios.put(
                "users/" + String(payload.id) + ".json",
                payload
            );
            const data = response.data as IStringObject;
            dispatch(userCreated(data));
        } catch (error) {
            errorCatcher(error);
        }
    };
}

export const getAllUsers = () => (state: RootState) => state.users.entities;
export const getCurrentUser = () => (state: RootState) =>
    state.users.entities.find((user) => user.id === state.users.auth.userId);
export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;
export const getUsersLoadingStatus = () => (state: RootState) =>
    state.users.isLoading;

export default usersReducer;
