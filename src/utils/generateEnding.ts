export const generateEndingForSingular = (number: number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "ов";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "а";
    if (lastOne === 1) return "";
    return "ов";
};

export const generateEndingForPlural = (number: number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "ы";
    if (lastOne === 1) return "у";
    return "";
};
