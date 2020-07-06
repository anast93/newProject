
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

        const menu = document.querySelector('menu'),
            body = document.querySelector('body');

        // Появление/скрытие меню
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        
        body.addEventListener('click', (event) => {
            const target = event.target;

            // То, что было в 20-м
            if (target.closest('menu') || target.closest('.menu')) {
                console.log(target.closest('menu'));
                handlerMenu();
            } 


            // if (menu.classList.contains('active-menu') && !target.closest('menu')) {
            //     menu.classList.add('active-menu');
            // }
            
            // if (!menu.classList.contains('active-menu')) {
            //     if (target.closest('.menu')) {
            //         menu.classList.add('active-menu');
            //     }
            // } else if (target.classList.contains('close-btn') || !target.closest('menu') || target.closest('.active-menu').matches('a')) {
            //     console.log(target.closest('.active-menu'));
            //     menu.classList.remove('active-menu');
            // }
            

        });
    };

    toggleMenu();

    // popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupCont = document.querySelector('.popup-content'),
            height = document.documentElement.clientHeight;

        
        popupBtn.forEach((elem) => {

                elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                    console.log(screen.width);
     
                    if(screen.width < 768) {
                        return;
                    } else {
                        let start = 0;
     
                     const step = () => {
                         
                         start++;
                         popupCont.style.top = 15*start + 'px';
     
                         if ( 15*start < height/5) {
                         requestAnimationFrame(step);
                         } else {
                             cancelAnimationFrame(requestId);
                         }
                     };
     
                     let requestId = requestAnimationFrame(step);
                    }
                 });
        });


        popup.addEventListener('click', (event) => {
            let target = event.target;
            // closest ищет ближайший родитель по селектору, сам элемент тоже включается в поиск
            // target = null, если кликнули не по popup-у и вернет сам элемент, если кликнули по нему

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                popup.style.display = 'none';
                }
            }
        }); 
    };

    togglePopUp();

    // Табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            // вернет null, если не найдет селектор. Поднимается только вверх.
            // Если найдет селектор, то вернет этот элемент.
                target = target.closest('.service-header-tab');

            while(target !== tabHeader) {

                if (target) {
                    tab.forEach((item, i) => {
                       if (item === target) {
                           toggleTabContent(i);
                       }
                   });
                   return;
                }
                target = target.parentNode;              
            }
        });
    };

    tabs();

    // слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dotsUl = slider.querySelector('.portfolio-dots');

            for (let i = 0; i < slide.length; i++) {
                const dotLi = document.createElement('li');
                dotLi.classList.add('dot');
    
                dotsUl.append(dotLi);

            }
            
            const dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);

        };

        const autoPlaySlide = () => {

            prevSlide(dot, currentSlide, 'dot-active');
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            
            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(dot, currentSlide, 'dot-active');
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);

        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('#arrow-right, #arrow-left, .dot' )) {
                return;
            }

            prevSlide(dot, currentSlide, 'dot-active');
            prevSlide(slide, currentSlide, 'portfolio-item-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if(target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if(currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(dot, currentSlide, 'dot-active');
            nextSlide(slide, currentSlide, 'portfolio-item-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });
        
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(2000);



    };

    slider();

    // Изменение картинки на блоке Наша команда

    const chngImgOurCommand = () => {

        const command = document.querySelector('.command');

        command.addEventListener('mouseover', (event) => {
            if(event.target.matches('.command__photo')) {
                event.target.src = event.target.dataset.img;
            }
        });

        const photoList = document.querySelectorAll('.command__photo');

        // Массив с прежними картинками
        const arrSrc = [];
        photoList.forEach((item) => {
            arrSrc.push(item.src);
        });

        // NodeList приводим к массиву, иначе не работают методы для массива
        const photoArray = Array.from(photoList);

        command.addEventListener('mouseout', (event) => {
            if(event.target.matches('.command__photo')) {
                const index = photoArray.indexOf(event.target);
                //console.log(index);
                event.target.src = arrSrc[index];
            }
        });


    };

    chngImgOurCommand();

    // Ограничение ввода любых символов, кроме цифр,в Калькуляторе стоимости
    const checkInputCalc = () => {

        const calcBlock = document.querySelector('.calc-block');

        calcBlock.addEventListener('input', (event) => {
            if(event.target.matches('input')) {
                event.target.value = event.target.value.replace(/\D/g, '');
            }
            
        });
    }

    checkInputCalc();
});