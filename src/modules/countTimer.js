function countTimer(deadline) {
    deadline = '20 July 2020 13:39:20';
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
        return {timeRemaining, hours, minutes, seconds};
        }

    function addZero(number) {
        if(number < 10)  {
        number = '0'+number;
        } 
        return number;
    }

    function updateClock() {
        
        let timer = getTimeRemaining();
       

        if (timer.timeRemaining < 0) {

            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            return;

        }

        timerHours.textContent = addZero(timer.hours);
        timerMinutes.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
           
    }

    updateClock();
    if (getTimeRemaining().timeRemaining <= 0) {
        clearInterval(setInterval(updateClock, 1000));
    } else setInterval(updateClock, 1000);
};

export default countTimer;