import React, { useContext, useState } from "react";
import { HOCProps } from "../models";

interface IClickCatcherContextProps {
    searchIsInFocus?: boolean;
    currentUserAreaIsInFocus?: boolean;
    navBarStoresIsInFocus?: boolean;
}

const ClickCatcherContext = React.createContext<IClickCatcherContextProps>({});

export const useClickCatcher = () => {
    return useContext(ClickCatcherContext);
};

const ClickCatcherProvider = ({ children }: HOCProps) => {
    const [searchIsInFocus, setSearchIsInFocus] = useState(false);
    const [currentUserAreaIsInFocus, setCurrentUserAreaIsInFocus] =
        useState(false);
    const [navBarStoresIsInFocus, setNavBarStoresIsInFocus] = useState(false);

    const clickCatcher = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof Element) {
            if (e.target.closest(".search__field")) {
                setSearchIsInFocus(true);
            } else {
                setSearchIsInFocus(false);
            }

            if (e.target.closest(".topNavBar__loginItem")) {
                setCurrentUserAreaIsInFocus(true);
            } else {
                setCurrentUserAreaIsInFocus(false);
            }

            if (
                e.target.closest(".NavBarStores__area") ||
                e.target.closest(".NavBarStores__body")
            ) {
                setNavBarStoresIsInFocus(true);
            } else {
                setNavBarStoresIsInFocus(false);
            }
        }
    };

    return (
        <ClickCatcherContext.Provider
            value={{
                searchIsInFocus,
                currentUserAreaIsInFocus,
                navBarStoresIsInFocus
            }}
        >
            <div className="clickCatcher" onClick={clickCatcher}>
                {children}
            </div>
        </ClickCatcherContext.Provider>
    );
};

export default ClickCatcherProvider;
