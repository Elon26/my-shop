import { REACT_APP_FIREBASE_KEY } from "./../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../components/ui/loader";
import { isFirebase } from "../constants";
import {
    HOCProps,
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

interface ICategoriesContextProps {
    singUp?: (data: IStringObject) => void;
    singIn?: (data: IStringObject) => void;
    logout?: () => void;
    currentUser?: IStringObject;
}

export const httpAuth = axios.create();

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

const AuthContext = React.createContext<ICategoriesContextProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }: HOCProps) => {
    const baseURL =
        "https://diplom-project-es2612-default-rtdb.asia-southeast1.firebasedatabase.app/users/";
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState<IStringObject>({});
    const [isLoading, setIsLoading] = useState(true);

    async function createUser(user: IStringObject) {
        try {
            const response = await axios.put(
                baseURL + String(user.id) + ".json",
                user
            );
            const data = response.data as IStringObject;
            setCurrentUser(data);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function logout() {
        removeAuthData();
        setCurrentUser({});
        history.push("/my-shop/");
    }

    async function singUp({ email, password, name }: IStringObject) {
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

            const user = data && {
                id: data.localId,
                name
            };
            user && createUser(user);
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
        }
    }

    async function singIn({ email, password }: IStringObject) {
        const url =
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_FIREBASE_KEY}`;
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
            await getUserData();
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
        }
    }

    async function getUserData() {
        try {
            const response = await httpAuth.get(
                baseURL + String(getUserId()) + ".json"
            );
            const data = response.data as IStringObject;
            setCurrentUser(data);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (getAccessToken()) {
            const fetchData = async () => {
                await getUserData();
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const result = fetchData();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <AuthContext.Provider value={{ singUp, singIn, logout, currentUser }}>
            {!isLoading ? children : <Loader />}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
