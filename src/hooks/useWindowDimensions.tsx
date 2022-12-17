import React, { useContext, useEffect, useState } from "react";
import { HOCProps } from "../models";

interface IWindowDimensionsProps {
    windowWidth?: number;
}

const windowDimensionsContext = React.createContext<IWindowDimensionsProps>({});

export const useWindowDimensions = () => {
    return useContext(windowDimensionsContext);
};

const WindowDimensionsProvider = ({ children }: HOCProps) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () =>
            setwindowWidth(window.innerWidth)
        );
    }, []);

    return (
        <windowDimensionsContext.Provider value={{ windowWidth }}>
            {children}
        </windowDimensionsContext.Provider>
    );
};

export default WindowDimensionsProvider;
