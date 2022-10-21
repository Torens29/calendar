
createCalendarHTML();
fillCalc(new Date());

function createCalendarHTML(){
    let menu = document.createElement('div');
    menu.className='menu';
    menu.insertAdjacentHTML("afterbegin", `
        <div class="step_back"></div>
        <div class="month"></div>
        <div class="year"></div>
        <div class="step_next"></div>
        <div class="numMonth"></div> 
    `)


    let calendar = document.createElement('div');
    calendar.className = 'calendar';
    calendar.insertAdjacentHTML('afterbegin', `
            <div class="calendar__weeksDay_name">пн</div>
            <div class="calendar__weeksDay_name">вт</div>
            <div class="calendar__weeksDay_name">ср</div>
            <div class="calendar__weeksDay_name">чт</div>
            <div class="calendar__weeksDay_name">пт</div>
            <div class="calendar__weeksDay_name">сб</div>
            <div class="calendar__weeksDay_name">вс</div>
    `);

    for(let i=0; i<49; i++){
        let item= document.createElement("div")
        item.className = "calendar__weeksDay_item";
        calendar.appendChild(item);
    }


    document.body.appendChild(menu);
    document.body.appendChild(calendar);
}

// заполнение днями
function fillCalc(date){
    let calendarDayNamber = document.querySelectorAll(".calendar__weeksDay_item");
    let divMonth = document.querySelector(".month");
    let divYear = document.querySelector(".year");
    let numMonth = document.querySelector(".numMonth");
    numMonth.innerHTML = date.getMonth();

    let formatterMonth = new Intl.DateTimeFormat("en", {
        
        // year: "numeric",
        month: "long",
    });
      
    let formatterYear = new Intl.DateTimeFormat("en", {
        
        year: "numeric",
        
    });

    console.log( formatterMonth.format(date) ,formatterYear.format(date)); 

    divMonth.innerHTML = formatterMonth.format(date);
    divYear.innerHTML = formatterYear.format(date);

    let day=1;
    let firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 0 ).getDay();
    if(firstDayOfWeek == 0) firstDayOfWeek = 7;

    let lotDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
        
    for(let i=0; i<49; i++){
        if( firstDayOfWeek <= i  && i< lotDayOfMonth+firstDayOfWeek){
            calendarDayNamber[i].innerHTML = day;

            if((day == new Date().getDate()) && (date.getFullYear() == new Date().getFullYear()) && (date.getMonth() == new Date().getMonth())){
                calendarDayNamber[i].classList.add("color_lBlue"); // "#34bbd7";
                console.log( (date.getMonth() == new Date().getMonth()), date.getMonth(), new Date().getMonth())
            } 
            else { 
                calendarDayNamber[i].classList.add("color_turquoise") 
                calendarDayNamber[i].classList.remove("color_lBlue")    
            }    // "#00FFD5"}
            day++;


        } else calendarDayNamber[i].innerHTML = "";
    }


   
}    
    

function stepNext(){
    let numMonth = document.querySelector(".numMonth").innerHTML;
    let year = document.querySelector(".year").innerHTML;
   
    numMonth++;
    // let year;
    if( numMonth > 11) {
        year++;
        numMonth = 0 
        
    } fillCalc(new Date( year, numMonth));
    
}

function stepBack(){
    let numMonth = document.querySelector(".numMonth").innerHTML;
    let year = document.querySelector(".year").innerHTML;

    numMonth--;
    if( numMonth < 0) {
        year--;
        numMonth = 11;
    } fillCalc(new Date( year, numMonth))
    
}
// перелиствование
    let btnStepNext = document.querySelector(".step_next");
    let btnStepBack = document.querySelector(".step_back");

    btnStepNext.addEventListener('click', stepNext)
    btnStepBack.addEventListener('click', stepBack)


