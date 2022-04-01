
//Scroll to id
const ScrollToView = id => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' })
}





export { ScrollToView }