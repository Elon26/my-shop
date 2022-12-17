import axios from "axios";
import { useEffect, useState } from "react";
import categories from "../mockData/categories.json";
import subCategories from "../mockData/subCategories.json";
import products from "../mockData/products.json";

const useMockData = () => {
    const statusConst = {
        idle: "Not Started",
        pending: "In Process",
        succesed: "Ready",
        error: "Error Occured"
    };

    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summCount =
        categories.length + subCategories.length + products.length;

    const incrementCount = () => {
        setCount((prev) => prev + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }

        const newProgress = Math.floor((count / summCount) * 100);
        if (newProgress > progress) {
            setProgress(() => newProgress);
        }

        if (newProgress === 100) {
            setStatus(statusConst.succesed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const category of categories) {
                await axios.put(
                    "https://diplom-project-es2612-default-rtdb.asia-southeast1.firebasedatabase.app/" +
                        "categories/" +
                        category._id +
                        ".json",
                    category
                );
                incrementCount();
            }
            for (const subCategory of subCategories) {
                await axios.put(
                    "https://diplom-project-es2612-default-rtdb.asia-southeast1.firebasedatabase.app/" +
                        "subCategories/" +
                        subCategory._id +
                        ".json",
                    subCategory
                );
                incrementCount();
            }
            for (const product of products) {
                await axios.put(
                    "https://diplom-project-es2612-default-rtdb.asia-southeast1.firebasedatabase.app/" +
                        "products/" +
                        product._id +
                        ".json",
                    product
                );
                incrementCount();
            }
        } catch (error) {
            console.log(error);
            setStatus(statusConst.error);
        }
    }

    return { initialize, progress, status };
};

export default useMockData;
