import React from "react";
import "./styles/common.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./layouts/mainPage";
import LoginPage from "./layouts/loginPage";
import CartPage from "./layouts/cartPage";
import NotFoundPage from "./layouts/notFoundPage";
import PaymentPage from "./layouts/paymentPage";
import DeliveryPage from "./layouts/deliveryPage";
import CategoriesPage from "./layouts/categoriesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SERVER_URL } from "./constants";
import ClickCatcherProvider from "./hooks/useClickCatcher";
import RegisterPage from "./layouts/registerPage";
import AdminPanelPage from "./layouts/adminPanelPage";
import NavBar from "./components/ui/navBar";
import WindowDimensionsProvider from "./hooks/useWindowDimensions";
import AppLoader from "./store/appLoader";
import Breadcrumbs from "./components/ui/breadcrumbs";

function App() {
    axios.defaults.baseURL = SERVER_URL;

    return (
        <>
            <AppLoader>
                <WindowDimensionsProvider>
                    <ClickCatcherProvider>
                        <NavBar />
                        <Breadcrumbs />
                        <div className="mainContainer">
                            <Switch>
                                <Redirect
                                    from="/my-shop/categories"
                                    exact
                                    to="/my-shop/"
                                />
                                <Route
                                    path="/my-shop/categories/:category?/:subCategory?/:product?"
                                    component={CategoriesPage}
                                />
                                <Route
                                    path="/my-shop/payment/"
                                    component={PaymentPage}
                                />
                                <Route
                                    path="/my-shop/delivery/"
                                    component={DeliveryPage}
                                />
                                <Route
                                    path="/my-shop/login/"
                                    component={LoginPage}
                                />
                                <Route
                                    path="/my-shop/register/"
                                    component={RegisterPage}
                                />
                                <Route
                                    path="/my-shop/cart/"
                                    component={CartPage}
                                />
                                <Route
                                    path="/my-shop/admin/:productId?"
                                    component={AdminPanelPage}
                                />
                                <Route
                                    path="/my-shop/404/"
                                    component={NotFoundPage}
                                />
                                <Route
                                    path="/my-shop/"
                                    exact
                                    component={MainPage}
                                />
                                <Redirect to="/my-shop/404/" />
                            </Switch>
                        </div>
                    </ClickCatcherProvider>
                </WindowDimensionsProvider>
            </AppLoader>
            <ToastContainer />
        </>
    );
}

export default App;
