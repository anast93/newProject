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

export default calc;