'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.header__wrapper'),
          headerLogo = document.querySelector('.header__logo'),
          mainSection = document.querySelector('.main');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop >= (mainSection.offsetHeight - navBar.offsetHeight)) {
            navBar.style.height = '50px';
            headerLogo.innerHTML = `
            <img  class="header__logo-img_small" src="img/logo_white_symbol.png" alt="pravda coffee">
            `;
        } else {
            navBar.style.height = '100px';
            headerLogo.innerHTML = `
            <img  class="header__logo-img" src="img/logo_white.png" alt="pravda coffee">
            `;
        }
    });
});