'use strict'

    function getToday () {
        let today = new Date(),
            hours = today.getHours(),
            minutes = today.getMinutes(),
            seconds = today.getSeconds();

        // Название дня недели
        function getWeekDay() {
            const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            let date = week[today.getDay()];
            return date;
        }

        function hello() {
            let msg;

            if(hours >= 0 && hours < 4 ) {
                msg = 'Доброй ночи!';
            }
            if (hours >= 4 && hours < 12) {
                msg = 'Доброе утро!';
            }
            if(hours >= 12 && hours < 17) {
                msg = 'Добрый день!'
            }
            if(hours >= 17 && hours < 24) {
                msg = 'Добрый вечер!'
            }

            return msg;
        }

        function addZero(number) {
            if(number < 10)  {
            number = '0'+number;
            } 
            return number;
        }

        function getTime() {
            hours = addZero(hours);
            minutes = addZero(minutes);
            seconds = addZero(seconds);
            let time = `${hours}:${minutes}:${seconds}`;

            return time;
        }

        function getTimeToNewYear() {
            const dateNY = new Date(2021, 0, 1).getTime();
            let  todayMs = today.getTime(); 
            let days = Math.floor((dateNY - todayMs) / 1000 / 60 / 60 / 24);

            return days;
        }

        function getEndForWord() {
            let word = getTimeToNewYear()+'';
            let length = word.length * 1 - 2;
            let end;
            word = word * 1;
            
            if ( (word % (10 ** length)) === 1 ) {
                end = 'день';
                
            }
            if ( (word % (10 ** length) >= 2) && (word % (10 ** length) <= 4) ) {
                end = 'дня';
            }
            if ( (word % (10 ** length) >= 5) && (word % (10 ** length) <= 9) || (word % (10 ** length) === 0) )  {
                end = 'дней';
            }

            return end; 
        }
        
        document.querySelector('body').innerHTML = `<p>${hello()}</p><p>Сегодня: ${getWeekDay()}.</p><p>Текущее время: ${getTime()} PM</p><p>До Нового года осталось ${getTimeToNewYear()} ${getEndForWord()}.</p>`;
        
    }

getToday();


   

