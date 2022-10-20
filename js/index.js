(() => {
    let calendarDayNamber = document.querySelectorAll(".calendar__weeksDay_item");
    let divMonth = document.querySelector(".month");
let date={
    year: new Date().getFullYear(),
    month: new Date().getMonth()
}
fillCalc(date);

// заполнение днями
function fillCalc(date){

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    divMonth.innerHTML = date.year + " " + monthNames[date.month];
    let day=1;
    let firstDayOfWeek = new Date(date.year, date.month, 0 ).getDay();
    if(firstDayOfWeek == 0) firstDayOfWeek = 7;

    let lotDayOfMonth = new Date(date.year, date.month+1, 0).getDate();
        
    for(let i=0; i<49; i++){
        if( firstDayOfWeek <= i  && i< lotDayOfMonth+firstDayOfWeek){
            calendarDayNamber[i].innerHTML = day;

            if((day == new Date().getDate()) && (date.year == new Date().getFullYear()) && (date.month == new Date().getMonth())){
                calendarDayNamber[i].style.backgroundColor = "#34bbd7";
                console.log( (date.month == new Date().getMonth()), date.month, new Date().getMonth())
            } 
            else { 
                calendar_DayNamber[i].style.backgroundColor = "#00FFD5"}
            day++;


        } else calendar_DayNamber[i].innerHTML = "";
    }
}    
    
function stepNext(){
    date.month++;
    if( date.month > 11) {
        date.year++;
        date.month = 0 
    }
    fillCalc(date);
}

function stepBack(){
    date.month--;
    if( date.month < 0) {
        date.year--;
        date.month = 11;
    }
    fillCalc(date);
}
// перелиствование
    let step_next = document.querySelector(".step_next");
    let step_back = document.querySelector(".step_back");

    step_next.onclick = () => { stepNext()}
    step_back.onclick = () => { stepBack()}
})()

