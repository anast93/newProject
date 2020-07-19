'use strict';
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
    const scroll = () => {
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
    };
    scroll();
};

export default toggleMenu;