const checkInputCalc = () => {

    const calcBlock = document.querySelector('.calc-block');

    calcBlock.addEventListener('input', (event) => {
        if(event.target.matches('input')) {
            event.target.value = event.target.value.replace(/\D/g, '');
        }
        
    });
};

export default checkInputCalc;