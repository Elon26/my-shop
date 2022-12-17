import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { HOCProps, ICategory } from "../models";
import { defaultCategoryData } from "../settings";
import errorCatcher from "../utils/errorCatcher";

interface ICategoriesContextProps {
    сategoriesAllData?: ICategory[];
    getCategory?: (name: string) => ICategory;
    isLoadingCategories: boolean;
}

const defaultState = {
    isLoadingCategories: true
};

const CategoriesContext =
    React.createContext<ICategoriesContextProps>(defaultState);

export const useCategories = () => {
    return useContext(CategoriesContext);
};

const CategoriesProvider = ({ children }: HOCProps) => {
    const [сategoriesAllData, setCategoriesAllData] = useState<ICategory[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getAllCategories();
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = fetchData();
    }, []);

    async function getAllCategories() {
        // ! Удалить лишнее по завершении разработки
        try {
            // const response = await axios.get<ICategory[]>("categories/");
            // setCategoriesAllData(response.data);
            const response = await axios.get<ICategory[]>("categories.json/");
            setCategoriesAllData(Object.values(response.data));
            setIsLoadingCategories(false);
        } catch (e: unknown) {
            errorCatcher(e);
        }
    }

    function getCategory(name: string) {
        return (
            сategoriesAllData.find((сategory) => сategory.name === name) ||
            defaultCategoryData
        );
    }

    return (
        <CategoriesContext.Provider
            value={{ сategoriesAllData, getCategory, isLoadingCategories }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
