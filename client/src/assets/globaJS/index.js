
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




export { ScrollToView, convertToMoney, getMessageByScore }