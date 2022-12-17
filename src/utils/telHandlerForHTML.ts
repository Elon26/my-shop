export const telToHrefChange = (tel: number) =>
    "tel:+7" + tel.toString().slice(1);

export const telToStringChange = (tel: number) => {
    const str = tel.toString();
    return (
        "8 (" +
        str.slice(1, 4) +
        ") " +
        str.slice(4, 7) +
        "-" +
        str.slice(7, 9) +
        "-" +
        str.slice(9)
    );
};
