import {
    generateEndingForSingular,
    generateEndingForPlural
} from "./generateEnding";

const createOpenCloseStoreMessage = (from: string, to: string) => {
    const fromHour = Number(from.slice(0, 2));
    const fromMinute = Number(from.slice(3));
    const toHour = Number(to.slice(0, 2));
    const toMinute = Number(to.slice(3));
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    const beforeOpenStatus =
        currentHour < fromHour ||
        (currentHour === fromHour && currentMinute < fromMinute);
    const afterCloseStatus =
        currentHour > toHour ||
        (currentHour === toHour && currentMinute > toMinute);

    let hoursToOpenClose = 0;
    let minuteToOpenClose = 0;

    if (!beforeOpenStatus && !afterCloseStatus) {
        if (toMinute >= currentMinute) {
            hoursToOpenClose = toHour - currentHour;
            minuteToOpenClose = toMinute - currentMinute;
        } else {
            hoursToOpenClose = toHour - currentHour - 1;
            minuteToOpenClose = toMinute + 60 - currentMinute;
        }
    }

    if (afterCloseStatus || beforeOpenStatus) {
        if (currentHour < fromHour) {
            if (fromMinute >= currentMinute) {
                hoursToOpenClose = fromHour - currentHour;
                minuteToOpenClose = fromMinute - currentMinute;
            } else {
                hoursToOpenClose = fromHour - currentHour - 1;
                minuteToOpenClose = fromMinute + 60 - currentMinute;
            }
        } else {
            if (fromMinute >= currentMinute) {
                hoursToOpenClose = fromHour + (24 - currentHour);
                minuteToOpenClose = fromMinute - currentMinute;
            } else {
                hoursToOpenClose = fromHour + 24 - currentHour - 1;
                minuteToOpenClose = fromMinute + 60 - currentMinute;
            }
        }
    }

    if (beforeOpenStatus && !afterCloseStatus) {
        if (fromMinute >= currentMinute) {
            hoursToOpenClose = fromHour - currentHour;
            minuteToOpenClose = fromMinute - currentMinute;
        } else {
            hoursToOpenClose = fromHour - currentHour - 1;
            minuteToOpenClose = fromMinute + 60 - currentMinute;
        }
    }

    const message =
        (beforeOpenStatus || afterCloseStatus
            ? " откроется через "
            : " закроется через ") +
        (hoursToOpenClose
            ? String(hoursToOpenClose) +
              " час" +
              generateEndingForSingular(hoursToOpenClose) +
              ", "
            : "") +
        String(minuteToOpenClose) +
        " минут" +
        generateEndingForPlural(minuteToOpenClose) +
        ".";

    return message;
};

export default createOpenCloseStoreMessage;
