'use strict';

import 'nodelist-foreach-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import chngImgOurCommand from './modules/chngImgOurCommand';
import checkInputCalc from './modules/checkInputCalc';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validator from './modules/validator';

    
// Таймер
countTimer();
// Меню
toggleMenu();
// popup
togglePopUp();
// Табы
tabs();
// слайдер
slider();
// Изменение картинки на блоке Наша команда
chngImgOurCommand();
// Ограничение ввода любых символов, кроме цифр, в Калькуляторе стоимости
checkInputCalc();
// Калькулятор стоимости
calc();
// send-ajax-form
sendForm();
// Валидация данных
validator();