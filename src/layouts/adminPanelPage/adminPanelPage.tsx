import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AdminPage from "../../components/page/adminPage";
import ProductChangePage from "../../components/page/adminPage/productChangePage";
import ProductCreatePage from "../../components/page/adminPage/productCreatePage";
import { useAppSelector } from "../../hooks/reduxHook";
import { getCurrentUser, getUsersLoadingStatus } from "../../store/users";

const AdminPanelPage = () => {
    const history = useHistory();
    const currentUser = useAppSelector(getCurrentUser());
    const isLoading = useAppSelector(getUsersLoadingStatus());
    const { productId } = useParams<{ productId: string }>();

    useEffect(() => {
        if (
            !isLoading &&
            (!currentUser || currentUser.id !== "vmxyQSIfXBgDWOy6P8sx0ZmCsZI2")
        ) {
            history.push("/my-shop/");
        }
    }, []);

    return (
        <>
            {productId ? (
                productId === "create" ? (
                    <ProductCreatePage />
                ) : (
                    <ProductChangePage productId={productId} />
                )
            ) : (
                <AdminPage />
            )}
        </>
    );
};

export default AdminPanelPage;
