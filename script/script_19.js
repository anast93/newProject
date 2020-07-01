
// дожидается загрузки DOM-дерева
window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
  
    // Таймер
    function countTimer(deadline) {
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


    }

    countTimer('30 June 2020 13:39:20');


    // Меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        console.log(btnMenu);
        console.log(menu);

        // Появление/скрытие меню
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');

        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu );

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    // popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupCont = document.querySelector('.popup-content'),
            height = document.documentElement.clientHeight;
            console.log(height);

        
        popupBtn.forEach((elem) => {

                elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                    console.log(screen.width);
     
                    if(screen.width < 768) {
                        return;
                    } else {
                        let start = 0;
     
                     function step() {
                         
                         start++;
                         popupCont.style.top = 15*start + 'px';
     
                         if ( 15*start < height/5) {
                         requestAnimationFrame(step);
                         } else {
                             cancelAnimationFrame(requestId);
                         }
                     }
     
                     let requestId = requestAnimationFrame(step);
                    }
                 });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

    };

    togglePopUp();

});