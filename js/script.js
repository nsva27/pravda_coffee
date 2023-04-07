'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const headerWrapper = document.querySelector('.header__wrapper'),
          logo = document.querySelector('.header__logo'),
          logoImg = document.querySelector('.header__logo-img');
    window.addEventListener('scroll', () => {
        if ( document.documentElement.scrollTop >= 730) {
            headerWrapper.classList.add('header__wrapper-scroll');
            logoImg.src = 'img/logo_white_symbol.png';
            logoImg.style.height = '32px';
            logo.classList.add('header__logo-scroll');
        } else {
            headerWrapper.classList.remove('header__wrapper-scroll');
            logoImg.src = 'img/logo_white.png';
            logoImg.style.height = '76px';
            logo.classList.remove('header__logo-scroll');
        }
    });

});