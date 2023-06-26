import React, { useState } from "react";
import "../../styles/storesPage.scss";
import { stores } from "../../constants";
import { telToHrefChange, telToStringChange } from "../../utils/telHandlerForHTML";
import createOpenCloseStoreMessage from "../../utils/createOpenCloseStoreMessage";

const StoresPage = () => {
    const [selectedStore, setSelectedStore] = useState(0);

    return (
        <div className="stores">
            <h1 className="stores__title">Наши магазины</h1>
            <section className="stores__section">
                <div className="NavBarStores__row stores__row">
                    {stores.map((store, index) => (
                        <div
                            key={store._id}
                            className={"NavBarStores__store NavBarStore stores__item" + (index === selectedStore ? " selected" : "")}
                            onClick={() => setSelectedStore(index)}
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
                <div className="stores__map">
                    {selectedStore === 0 && <div style={{ position: "relative", overflow: "hidden" }}><a href="https://yandex.ru/maps/75/vladivostok/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Владивосток</a><a href="https://yandex.ru/maps/75/vladivostok/house/amurskaya_ulitsa_26/ZUoHaA9pT0EEWUJuYGJwcnpjYwA=/?from=mapframe&ll=131.891415%2C43.135589&utm_medium=mapframe&utm_source=maps&z=17.4" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}>Амурская улица, 16 на карте Владивостока — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=131.891415%2C43.135589&mode=whatshere&whatshere%5Bpoint%5D=131.896494%2C43.136080&whatshere%5Bzoom%5D=17&z=17.4" width="100%" height="400" frameBorder="1" style={{ position: "relative" }}></iframe></div>}
                    {selectedStore === 1 && <div style={{ position: "relative", overflow: "hidden" }}><a href="https://yandex.ru/maps/75/vladivostok/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Владивосток</a><a href="https://yandex.ru/maps/75/vladivostok/house/okeanskiy_prospekt_18/ZUoHaA9oTkUEVUJuYGJwcHVjYQg=/?from=mapframe&indoorLevel=1&ll=131.887039%2C43.119050&utm_medium=mapframe&utm_source=maps&z=17.14" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}>Амурская улица, 16 на карте Владивостока — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/?from=mapframe&indoorLevel=1&ll=131.887039%2C43.119050&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Nzc4NTk3MxJs0KDQvtGB0YHQuNGPLCDQn9GA0LjQvNC-0YDRgdC60LjQuSDQutGA0LDQuSwg0JLQu9Cw0LTQuNCy0L7RgdGC0L7Quiwg0J7QutC10LDQvdGB0LrQuNC5INC_0YDQvtGB0L_QtdC60YIsIDE4IgoNFeMDQxXoeSxC&z=17.14" width="100%" height="400" frameBorder="1" style={{ position: "relative" }}></iframe></div>}
                    {selectedStore === 2 && <div style={{ position: "relative", overflow: "hidden" }}><a href="https://yandex.ru/maps/75/vladivostok/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Владивосток</a><a href="https://yandex.ru/maps/75/vladivostok/house/russkaya_ulitsa_92/ZUoHaA5jQU0PXUJuYGJwd3tgYwE=/?from=mapframe&ll=131.938881%2C43.167379&utm_medium=mapframe&utm_source=maps&z=17.14" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}>Амурская улица, 16 на карте Владивостока — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=131.938881%2C43.167379&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo0ODYxMzQxNzI2EmLQoNC-0YHRgdC40Y8sINCf0YDQuNC80L7RgNGB0LrQuNC5INC60YDQsNC5LCDQktC70LDQtNC40LLQvtGB0YLQvtC6LCDQoNGD0YHRgdC60LDRjyDRg9C70LjRhtCwLCA5MiIKDVvwA0MVZassQg%2C%2C&z=17.14" width="100%" height="400" frameBorder="1" style={{ position: "relative" }}></iframe></div>}
                </div>
            </section >
        </div >
    );
};

export default StoresPage;
