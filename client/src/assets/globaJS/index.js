
//Scroll to id
const ScrollToView = id => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' })
}

//convert to type money
const convertToMoney = num => {
    return new Intl.NumberFormat().format(num);
}

//get message by score 
const getMessageByScore = score => {
    if (score > 9) return "Tuyệt vời";
    if (score > 8) return "Rất tốt";
    if (score > 7) return "Tốt";
    if (score > 6) return "Dễ chịu";
}
//get distance from date 1 to date 2 
const getDistanceByDate = (receiveDate, returnDate) => {
    const distance = new Date(returnDate) - new Date(receiveDate);

    return new Date(distance).getDate();
}

//convert timespan to format "DD MM YYY" || "DOW DD MM YYYY"
//param num to increase or decrease date
const handleDateByFormat = (format, date, num = null) => {

    const d = num ? new Date(new Date(date).setDate(new Date(date).getDate() + num)) : new Date(date);
    const dayOfWeek = d.getDay() === 0 ? "CN" : `T${d.getDay() + 1}`;
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    if (format === 'DOW DD MM YYYY') return `${dayOfWeek} Ngày ${day} Tháng ${month} Năm ${year}`;

    return `Ngày ${day} Tháng ${month} Năm ${year}`;
}


/*Get HOURS */
const getHours = () => {
    let hours = [];
    for (let i = 1; i <= 24; i++) {
        hours.push({ label: i + ":00", value: i });
    }
    return hours;
}


export { ScrollToView, convertToMoney, getMessageByScore, getDistanceByDate, handleDateByFormat, getHours }