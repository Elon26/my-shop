import React, { useEffect, useState } from "react";
import Loader from "../components/ui/loader";
import { useAppDispatch } from "../hooks/reduxHook";
import { HOCProps } from "../models";
import { loadCategoriesList } from "./categories";
import { loadProductsList } from "./products";
import { loadSubCategoriesList } from "./subCategories";
import { loadUsersList } from "./users";
import { loadCart } from "./cart";

const AppLoader = ({ children }: HOCProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await Promise.all([
                dispatch(loadCategoriesList()),
                dispatch(loadSubCategoriesList()),
                dispatch(loadProductsList()),
                dispatch(loadUsersList()),
                dispatch(loadCart())
            ]);
            setIsLoading(false);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = fetchData();
    }, []);

    if (isLoading) return <Loader />;

    return <>{children}</>;
};

export default AppLoader;
