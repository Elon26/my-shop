import React, { useState, useEffect } from "react";
import "../../../styles/navBar.scss";
import { BsFillGeoAltFill } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import { generateEndingForSingular } from "../../../utils/generateEnding";
import {
    telToHrefChange,
    telToStringChange
} from "../../../utils/telHandlerForHTML";
import createOpenCloseStoreMessage from "../../../utils/createOpenCloseStoreMessage";
import { stores } from "../../../constants";
import { useClickCatcher } from "../../../hooks/useClickCatcher";

const NavBarStores = () => {
    const [openStatus, setOpenStatus] = useState(false);
    const { navBarStoresIsInFocus } = useClickCatcher();

    const handleToggleStoresArea = () => {
        setOpenStatus((prev) => !prev);
    };

    useEffect(() => {
        if (!navBarStoresIsInFocus) {
            setOpenStatus(false);
        }
    }, [navBarStoresIsInFocus]);

    return (
        <div className="NavBarStores">
            <div
                className="NavBarStores__body"
                onClick={handleToggleStoresArea}
            >
                <div className="NavBarStores__icon">
                    <BsFillGeoAltFill />
                </div>
                <div className="NavBarStores__text">Магазины</div>
            </div>
            {openStatus && navBarStoresIsInFocus && (
                <div className="NavBarStores__area">
                    <>
                        <div className="NavBarStores__quantityStores">
                            {stores.length} магазин
                            {generateEndingForSingular(stores.length)} в г.
                            Владивосток
                        </div>
                        <div className="NavBarStores__row">
                            {stores.map((store) => (
                                <div
                                    key={store._id}
                                    className="NavBarStores__store NavBarStore"
                                >
                                    <div className="NavBarStore__body">
                                        <p className="NavBarStore__address">
                                            {store.address}
                                        </p>
                                        <a
                                            className="NavBarStore__phone"
                                            href={telToHrefChange(store.phone)}
                                        >
                                            тел.:{" "}
                                            {telToStringChange(store.phone)}
                                        </a>
                                        <p className="NavBarStore__schedule">
                                            с {store.schedule.from} до{" "}
                                            {store.schedule.to},
                                            <span className="NavBarStore__schedule">
                                                {createOpenCloseStoreMessage(
                                                    store.schedule.from,
                                                    store.schedule.to
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="NavBarStores__closeIcon"
                            onClick={() =>
                                setOpenStatus((prevState) => !prevState)
                            }
                        >
                            <BiX />
                        </div>
                    </>
                </div>
            )}
        </div>
    );
};

export default NavBarStores;
