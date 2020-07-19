'use strict';
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
            form.reset();

            postData(formData)
            .then((response) => {
                if(response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
                console.log(...formData);
                
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
        }
    });

    const postData = (form) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'form/multipart'
            },
            body: form
        });
    };
};

export default sendForm;