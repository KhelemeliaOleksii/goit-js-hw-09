//select objects
btnStart = document.querySelector('[data-start]');
btnStop = document.querySelector('[data-stop]');

// is colorizer start
let isStarted = false;

// id for setInterval
let intervalId = null;

// add listener on "start button"
btnStart.addEventListener('click', btnStartOnClickListener);

//add listener on "stop button"
btnStop.addEventListener('click', btnStoptOnClickListener);

// btnStartOnClickListener
//do: - start colorizer with setInterval procedure 
function btnStartOnClickListener() {
    if (isStarted) {
        return;
    }
    isStarted = true;
    changeColor();
    intervalId = setInterval(()=> {
        changeColor();
    }, 1000);    
}

// changeColor
// do:  - change color of body background;
function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor(); 
};

//btnStoptOnClickListener
//do:   - stop interval
//      - change value isStarted = false  
function btnStoptOnClickListener() {
    clearInterval(intervalId);
    isStarted = false;
};

//getRandomHexColor
//out: random color in HEX 
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
