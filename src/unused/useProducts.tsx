import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Loader from "../components/ui/loader";
import { HOCProps, IProduct } from "../models";
import { defaultProductData } from "../settings";
import errorCatcher from "../utils/errorCatcher";

interface IProductsContextProps {
    productsAllData?: IProduct[];
    getProducts?: (name: string) => IProduct[];
    getProduct?: (name: string) => IProduct;
    getProductById?: (name: string) => IProduct;
    getProductsById?: (ids: string[]) => IProduct[];
    isLoadingProducts: boolean;
}

const defaultState = {
    isLoadingProducts: true
};

const ProductsContext =
    React.createContext<IProductsContextProps>(defaultState);

export const useProducts = () => {
    return useContext(ProductsContext);
};

const ProductsProvider = ({ children }: HOCProps) => {
    const [productsAllData, setProductsAllData] = useState<IProduct[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getAllProducts();
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = fetchData();
    }, []);

    async function getAllProducts() {
        // ! Удалить лишнее по завершении разработки
        try {
            // const response = await axios.get<IProduct[]>("products/");
            // setProductsAllData(response.data);
            const response = await axios.get<IProduct[]>("products.json/");
            setProductsAllData(Object.values(response.data));
            setIsLoadingProducts(false);
        } catch (e: unknown) {
            errorCatcher(e);
        }
    }

    function getProducts(name: string) {
        return (
            productsAllData.filter(
                (product) => product.subCategoryName === name
            ) || defaultProductData
        );
    }

    function getProduct(name: string) {
        return (
            productsAllData.find((product) => product.name === name) ||
            defaultProductData
        );
    }

    function getProductById(id: string) {
        return (
            productsAllData.find((product) => product._id === id) ||
            defaultProductData
        );
    }

    function getProductsById(ids: string[]) {
        return productsAllData.filter((product) => ids.includes(product._id));
    }

    return (
        <ProductsContext.Provider
            value={{
                productsAllData,
                getProducts,
                getProduct,
                getProductById,
                getProductsById,
                isLoadingProducts
            }}
        >
            {!isLoadingProducts ? children : <Loader />}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
