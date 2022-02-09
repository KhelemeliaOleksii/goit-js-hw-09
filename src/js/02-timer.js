// Используй библиотеку flatpickr для того чтобы позволить пользователю 
//кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса. 
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
//Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.
import Notiflix from 'notiflix';

// timer
// Repeta's video 
// time from 1:42:30

class reverseTimer {
    constructor(timeFormat, infoHandlerLibruary) {
        // variable will be assign time to event; 
        this.eventTime = null;
        // time left to event
        this.leftTime = 0;
        // variable will be assign id of setInterval
        this.intervalID = null;
        // interval delay
        this.delay = 1000;
        //procedure set time format;
        this.timeFormat = timeFormat;
        //procedure set infoServise 
        this.infoServise = infoHandlerLibruary;

        this.timeFormat.timerFormatingStyles();
    }
    checkTime() {
        this.leftTime = this.eventTime - Date.now();
        return this.leftTime > 0 ? true : false;
    }
    start(time) {
        this.eventTime = time;
        this.intervalID = setInterval(() => {

            const isValidDate = this.checkTime();

            if (!isValidDate) {
                clearInterval(this.intervalID);
                console.log("Interval have been cleared");
                this.timeOver();
                this.leftTime = 0;
            } else {
                //onsole.log(this.leftTime);
                // this.timeFormat.writeTimeOnBoard.bind(this,this.leftTime);
                this.timeFormat.writeTimeOnBoard(this.leftTime);
            }
        }, this.delay)
    }
    timeOver() {
        this.infoServise("TIME OVER!");
        return "Time over!";
    }
}

//select objects on HTML page
const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    outputDays: document.querySelector('[data-days]'),
    outputHours: document.querySelector('[data-hours]'),
    outputMinutes: document.querySelector('[data-minutes]'),
    outputSeconds: document.querySelector('[data-seconds]'),
    timerBoard: document.querySelector('.timer'),
    boardFields: document.querySelectorAll('.field'),
    boardNumberFields: document.querySelectorAll('.value'),
    boardLabelFields: document.querySelectorAll('.label'),

    timerFormatingStyles() {
        refs.timerBoard.style.display = "flex";
        refs.timerBoard.style.minWidth = "80px"
        refs.timerBoard.style.width = "250px"
        refs.boardFields.forEach((item) => {
            item.style.display = "flex";
        }
        );
        refs.boardFields.forEach((item) => {
            item.style.flexDirection = "column";
            item.style.flexBasis = "calc((100% / 4)) ";
            // item.style.justifyContent = "flex-end";
        }
        );
        refs.boardNumberFields.forEach((item) => {
            item.style.fontSize = "2rem";
            item.style.fontWeight = "500";
            item.style.textAlign = "center";
        }
        );
        refs.boardLabelFields.forEach((item) => {
            item.style.textTransform = "uppercase";
            item.style.fontSize = "0.8rem";
            item.style.fontWeight = "500";
            item.style.textAlign = "center";
        }
        );
    },

    //writeTimeOnBoard
    //do:   - write timer time on board 
    //      - if timer time is over call timeOver()
    writeTimeOnBoard(leftTime) {
        const { days, hours, minutes, seconds } = this.convertMs(leftTime);
        //console.log(leftTime);
        //days
        this.writeDays(days);
        // hours
        this.writeHours(hours);
        // minutes
        this.writeMinutes(minutes);
        //seconds
        this.writeSeconds(seconds);
        return 1;
    },
    //writeDays
    //do:   - format days data 
    writeDays(days) {
        if (days < 99) {
            //refs.outputDays.textContent = `${days.toString().padStart(2, '0')}`;
            this.outputDays.textContent = `${days.toString().padStart(2, '0')}`;
        } else {
            // refs.outputDays.textContent = `${days}`;
            this.outputDays.textContent = `${days}`;
        }
    },
    writeHours(hours) {
        //refs.outputHours.textContent = `${hours.toString().padStart(2, '0')}`;
        this.outputHours.textContent = `${hours.toString().padStart(2, '0')}`;
        // console.log(refs.outputHours.textContent);
    },
    writeMinutes(minutes) {
        //refs.outputMinutes.textContent = `${minutes.toString().padStart(2, '0')}`;
        this.outputMinutes.textContent = `${minutes.toString().padStart(2, '0')}`;
    },
    writeSeconds(seconds) {
        // refs.outputSeconds.textContent = `${seconds.toString().padStart(2, '0')}`;
        this.outputSeconds.textContent = `${seconds.toString().padStart(2, '0')}`;
    },
    //convertMs - external function
    //do: convert time format  
    convertMs(ms) {
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
}
// format timer style
//timerFormatingStyles();

const deadLine = (Date.now() + 10999);
//console.log(deadLine);

// is button "start" active
let isBtnActive = false;
// variable will be assign time to event; 
let eventTime = null;
// // variable will be assign id of setInterval
// let intervalID = null;

// do button "Start" no active
toggleBtnActiveStyle(refs.btnStart, isBtnActive);

//////////////
/////////////////////////////////////
//create object that includes option for timer
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if ((selectedDates[0] - Date.now()) > 0) {
            eventTime = selectedDates[0];
            isBtnActive = true;
            //console.log(eventTime);
            toggleBtnActiveStyle(refs.btnStart, isBtnActive)
        } else {
            Notiflix.Notify.info("Please choose a date in the future");
        }
    },
};
// set deadline 
flatpickr('#datetime-picker', options);
////////////////////////////////////////
/////////////////////
// console.log(eventTime);

const testReverseTimer = new reverseTimer(refs, Notiflix.Notify.info);


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
    testReverseTimer.start(eventTime);
}

//toggleBtnActiveStyle
//do:   - change style of active(passive) buttom "Start"
function toggleBtnActiveStyle(object, isActive) {
    if (!isActive) {
        object.style.color = "grey";
        object.style.border = 'none'
    } else {
        object.removeAttribute("style");
    }
}

