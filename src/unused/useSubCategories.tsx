import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Loader from "../components/ui/loader";
import { HOCProps, ISubCategory } from "../models";
import { defaultSubCategoryData } from "../settings";
import errorCatcher from "../utils/errorCatcher";

interface ISubCategoriesContextProps {
    isLoadingSubCategories: boolean;
    subCategoriesAllData?: ISubCategory[];
    getSubCategories?: (name: string) => ISubCategory[];
    getSubCategory?: (name: string) => ISubCategory;
}

const defaultState = {
    isLoadingSubCategories: true
};

const SubCategoriesContext =
    React.createContext<ISubCategoriesContextProps>(defaultState);

export const useSubCategories = () => {
    return useContext(SubCategoriesContext);
};

const SubCategoriesProvider = ({ children }: HOCProps) => {
    const [subCategoriesAllData, setSubCategoriesAllData] = useState<
        ISubCategory[]
    >([]);
    const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getAllSubCategories();
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = fetchData();
    }, []);

    async function getAllSubCategories() {
        // ! Удалить лишнее по завершении разработки
        try {
            // const response = await axios.get<ISubCategory[]>("subCategories/");
            // setSubCategoriesAllData(response.data);
            const response = await axios.get<ISubCategory[]>(
                "subCategories.json/"
            );
            setSubCategoriesAllData(Object.values(response.data));
            setIsLoadingSubCategories(false);
        } catch (e: unknown) {
            errorCatcher(e);
        }
    }

    function getSubCategories(name: string) {
        return (
            subCategoriesAllData.filter(
                (subCategory) => subCategory.categoryName === name
            ) || defaultSubCategoryData
        );
    }

    function getSubCategory(name: string) {
        return (
            subCategoriesAllData.find(
                (subCategory) => subCategory.name === name
            ) || defaultSubCategoryData
        );
    }

    return (
        <SubCategoriesContext.Provider
            value={{
                subCategoriesAllData,
                getSubCategories,
                getSubCategory,
                isLoadingSubCategories
            }}
        >
            {!isLoadingSubCategories ? children : <Loader />}
        </SubCategoriesContext.Provider>
    );
};

export default SubCategoriesProvider;
