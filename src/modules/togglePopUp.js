'use strict';
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

export default togglePopUp;