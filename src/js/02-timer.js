// Используй библиотеку flatpickr для того чтобы позволить пользователю 
//кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса. 
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
//Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.
import Notiflix from 'notiflix';

//select objects on HTML page
const refs = {
    inputDate:document.querySelector('#datetime-picker'),
    btnStart:document.querySelector('[data-start]'),
    outputDays:document.querySelector('[data-days]'),
    outputHours:document.querySelector('[data-hours]'),
    outputMinutes:document.querySelector('[data-minutes]'),
    outputSeconds:document.querySelector('[data-seconds]'),
    timerBoard:document.querySelector('.timer'),
    boardFields:document.querySelectorAll('.field'),
    boardNumberFields: document.querySelectorAll('.value'),
    boardLabelFields: document.querySelectorAll('.label'),
}
// format timer style
timerFormatingStyles ();

//refs.boardField.style.flexDirection = "column";
// is button "start" active
let isBtnActive = false;
// variable will be assign time to event; 
let eventTime = null;
// variable will be assign id of setInterval
let intervalID = null;

// do button "Start" no active
toggleBtnActiveStyle(refs.btnStart, isBtnActive);

// create object that includes option for timer
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if ((selectedDates[0] - Date.now()) > 0){
            eventTime = selectedDates[0];
            isBtnActive = true;
            toggleBtnActiveStyle(refs.btnStart, isBtnActive)       
        } else {
            Notiflix.Notify.info("Please choose a date in the future");
            //window.alert("Please choose a date in the future");
        }
    },
};
// create timer
flatpickr('#datetime-picker', options);

// listener on 'click' for button "Start"
refs.btnStart.addEventListener('click', btnStartListener);

//btnStartListener
//do:   -input no active
//      -button no active
//      -call function onBoard() 
//          which will write time on Board 
function btnStartListener() {
    if (!isBtnActive) {
        return;
    }
    refs.inputDate.setAttribute("disabled", "");
    isBtnActive = false;
    toggleBtnActiveStyle(refs.btnStart, isBtnActive)   
    onBoard();
} 

//toggleBtnActiveStyle
//do:   - change style of active(passive) buttom "Start"
function toggleBtnActiveStyle (object, isActive) {
    if (!isActive) {
        object.style.color = "grey";
        object.style.border = 'none'
    } else {
        object.removeAttribute("style"); 
    }  
}

//onBoard
//do:   - run timer 
function onBoard() {
    writeTimeOnBoard();
    intervalID = setInterval(writeTimeOnBoard, 1000); 
}

//writeTimeOnBoard
//do:   - write timer time on board 
//      - if timer time is over call timeOver()
function writeTimeOnBoard() {
    const leftTime = eventTime-Date.now();
    
    //if time over
    if (leftTime <= 0) {
        timeOver();
        return;
    }

    const {days, hours, minutes, seconds} = convertMs(leftTime); 
    //days
    writeDays(days);
    // hours
    writeHours(hours);
    // minutes
    writeMinutes(minutes);
    //seconds
    writeSeconds(seconds);
}

//timeOver
//do:   - input able
//      - stop timer 
//      - alert ("Time over!");
function timeOver() {
    refs.inputDate.removeAttribute("disabled", "");
    Notiflix.Notify.info("Time over!");
    // window.alert("Time over!");
    clearInterval(intervalID);
}

//writeDays
//do:   - format days data 
function writeDays(days) {
    if (days < 99 ){
        refs.outputDays.textContent = `${days.toString().padStart(2, '0')}`;
    } else {
        refs.outputDays.textContent = `${days}`;
    }    
}

function writeHours(hours) {
    refs.outputHours.textContent = `${hours.toString().padStart(2, '0')}`;
}
function writeMinutes(minutes) {
    refs.outputMinutes.textContent = `${minutes.toString().padStart(2, '0')}`;    
}
function writeSeconds(seconds) {
    refs.outputSeconds.textContent = `${seconds.toString().padStart(2, '0')}`;    
}

//convertMs - external function
//do: convert time format  
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function timerFormatingStyles () {
    refs.timerBoard.style.display ="flex";
    refs.timerBoard.style.minWidth = "80px"
    refs.timerBoard.style.width = "250px"
    refs.boardFields.forEach((item)=> {
            item.style.display ="flex";
        }
    );
    refs.boardFields.forEach((item)=> {
            item.style.flexDirection = "column";
            item.style.flexBasis = "calc((100% / 4)) ";
            // item.style.justifyContent = "flex-end";
        }
    );
    refs.boardNumberFields.forEach((item)=> {
            item.style.fontSize = "2rem";
            item.style.fontWeight = "500";
            item.style.textAlign ="center";
        }
    );
    refs.boardLabelFields.forEach((item)=> {
        // console.log(item);
        item.style.textTransform = "uppercase";
        item.style.fontSize = "0.8rem";
        item.style.fontWeight = "500";
        item.style.textAlign ="center";
    }
);
}
