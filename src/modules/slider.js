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

export default slider;