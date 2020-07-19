'use strict';
const chngImgOurCommand = () => {

    const command = document.querySelector('.command');

    const change = (e) => {
        [e.target.dataset.img, e.target.src] = [e.target.src, e.target.dataset.img];
    };

    command.addEventListener('mouseover', (event) => {
        if(event.target.matches('.command__photo')) {
            change(event);
        }
    });

    command.addEventListener('mouseout', (event) => {
        if(event.target.matches('.command__photo')) {
            change(event);
        }
    });
};

export default chngImgOurCommand;