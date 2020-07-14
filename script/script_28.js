
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
        
        // Добавлены 1 обработчик и скрытие меню при нажатии по любому месту документа, кроме меню
        body.addEventListener('click', (event) => {
            const target = event.target;


            if (target.closest('menu ul>li>a') || target.closest('.menu') || target.closest('.close-btn')) {
                handlerMenu();
            }

            if(menu.classList.contains('active-menu') && !target.matches('menu') && !target.closest('.menu') ) {
                handlerMenu();
                //menu.classList.remove('active-menu');
            }
        });

        // Плавная прокрутка при клике на элементы меню и при клике на стрелочку на первом слайде
        scroll = () => {
            menu.addEventListener('click', (event) => {
                const target = event.target;

                if(target.closest('menu ul>li>a')) {
                    event.preventDefault();
                    const id = target.closest('menu ul>li>a').getAttribute('href');
                    document.querySelector(id).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });


            const main = document.querySelector('main');

            // Плавная прокрутка при клике на Стрелочку на 1-ом слайде
            main.addEventListener('click', (event) => {
                const target = event.target; 

                if(target.closest('a>img')) {
                    event.preventDefault();

                    const id = target.closest('a').getAttribute('href');
                    document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                } 
            });
        }
        scroll();
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
    };

    checkInputCalc();

    // Калькулятор стоимости

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');
    
        
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            let typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if(calcCount.value > 1) {
                countValue += (+calcCount.value-1) / 10;
            }
            //console.log(`Коэф. для кол-ва помщений: ${countValue}`);

            if(calcDay.value !== '' && calcDay.value < 5) {
                dayValue = 2;
            } else if(calcDay.value !== '' && calcDay.value < 10) {
                dayValue = 1.5;
            } 
 
            if(typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            } 

            let count = +totalValue.textContent;
            let delta = total - count;
            //console.log(`Значение delta: ${delta}`);

            // Ф-я для анимации цифр 
            const totalAnimation = () => {

                if(delta === 0 || count === total) {
                    cancelAnimationFrame(requestId);
                    return;
                }

                const deltaStr = Math.abs(delta) + '',
                    length = deltaStr.length;
                
                // шаг, с которым происходит изменение числа
                let step = 10 **(length-2);
                //console.log(step);

                // Если разница между рассчитаной стоимостью и значением в поле "Итого" стала меньше или равна шагу, то значению в поле присваивается рассчитанная стоимость.
                if(Math.abs(+totalValue.textContent - total) <= step) {
                    totalValue.textContent = total;
                    cancelAnimationFrame(requestId);
                    return;
                }
                // Иначе, уменьшаем (увеличиваем) значение из поля "Итого" на величину шага


                if (delta < 0) {
                    count -= step;
                    totalValue.textContent = count;
                    requestAnimationFrame(totalAnimation);
                } else if (delta > 0) {
                    count += step;
                    totalValue.textContent = count;
                    requestAnimationFrame(totalAnimation);
                } 
            }

            let requestId = requestAnimationFrame(totalAnimation);
        }
        
        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if(target.matches('input') || target.matches('select')) {
                countSum();
            }
        });
   
    };

    calc(100);

        // send-ajax-form

        const sendForm = () => {
            const errorMessage = 'Что-то пошло не так...',
                preload = '<img src="./images/oval.svg">',
                successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    
            const statusMessage = document.createElement('div');
            statusMessage.style.fontSize = "1.7rem";

            document.addEventListener('submit', (event) => {
                const target = event.target;
                if(target.matches('form')) {
                    event.preventDefault();

                    const form = target.closest('form');

                    if(form.closest('.connect')) {
                        document.querySelector('.connect .btn').style.marginBottom = "10px";
                    }

                    if(form.closest('.popup')) {
                        statusMessage.style.color = "white";
                    }

                    form.appendChild(statusMessage);

                    statusMessage.innerHTML = preload;

                    const formData = new FormData(form);
                    let body = {};
                    formData.forEach((val, key) => {
                        body[key] = val;
                    });

                    form.reset();

                    postData(body)
                    .then(() => statusMessage.textContent = successMessage)
                    .catch((error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
                }
            });

            const postData = (body, outputData, errorData) => {
                return new Promise((resolve, reject) => {
                    const request = new XMLHttpRequest();
                    request.addEventListener('readystatechange', () => {

                    if(request.readyState !== 4) {
                    return;
                    }

                    if(request.status === 200) {
                        const response = request.responseText;
                        resolve(response);
                    } else {
                        reject(request.statusText);
                    }
                    });
                    request.open('POST', './server.php');
                    request.setRequestHeader('Content-Type', 'aplication/json');
            
                    console.log(body);
                    request.send(JSON.stringify(body));
                });
            };
        }
    
        sendForm();

        // Валидация данных
        
        const validator = () => {
            document.addEventListener('input', (event) => {
                const target = event.target,
                    inputText = target.closest('input[name="user_name"], input[name="user_message"]'),
                    inputPhone = target.closest('input[name="user_phone"]');

                if(inputText) {
                    // inputText.setAttribute("pattern", "[А-Яа-яёЁ ]+");
                    // inputText.setAttribute('title', 'Используйте для ввода только символы кириллицы и пробел.');
                    inputText.value = inputText.value.replace(/[^а-яё\s]/gi, '');
                }

                if(inputPhone) {
                    // inputPhone.setAttribute("pattern", "\\+?\\d+");
                    // inputPhone.setAttribute('title', 'Допустимо использовать только знак "+" в начале и цифры.');
                    inputPhone.value = inputPhone.value.replace(/^[^+\d]*(\+|\d)|\D/g, '$1');
                }
            });
        }
        
        validator();
});

