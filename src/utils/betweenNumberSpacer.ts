const betweenNumberSpacer = (number: number) => {
    const firstNumbers = Math.floor(number / 1000000);
    const afterFirstNumber = number % 1000000;
    const middleNumbers = Math.floor(afterFirstNumber / 1000);
    const lastNumbers = number % 1000;
    let string = "";

    if (firstNumbers) {
        string = `${firstNumbers} `;
    }

    if (firstNumbers || middleNumbers) {
        if (firstNumbers) {
            if (middleNumbers < 100) {
                string += "0";
                if (middleNumbers < 10) {
                    string += "0";
                }
            }
            string += `${middleNumbers} `;
        } else {
            string = `${middleNumbers} `;
        }

        if (lastNumbers < 100) {
            string += "0";
            if (lastNumbers < 10) {
                string += "0";
            }
        }
        string += `${lastNumbers}`;
    } else {
        string = `${lastNumbers}`;
    }

    return string;
};

export default betweenNumberSpacer;
