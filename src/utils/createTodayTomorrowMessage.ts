const createTodayTomorrowMessage = (time: number) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const tomorrowDate = new Date(currentDate.getTime() + 86400000);
    const tomorrowDay = tomorrowDate.getDate();
    const tomorrowMonth = tomorrowDate.getMonth();
    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "декабря"
    ];

    if (currentHour >= time) {
        return `завтра, ${tomorrowDay} ${months[tomorrowMonth]}`;
    }
    return `сегодня, ${currentDay} ${months[currentMonth]}`;
};

export default createTodayTomorrowMessage;
