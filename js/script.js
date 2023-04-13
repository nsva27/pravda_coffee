'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header'),
          navBar = document.querySelector('.header__wrapper'),
          headerLogoImage = document.querySelector('.header__logo-img'),
          mainSection = document.querySelector('.main');
          

    window.addEventListener('resize', hideNavbar);
    window.addEventListener('scroll', hideNavbar);

    function hideNavbar() {
        if (document.documentElement.scrollTop > mainSection.offsetHeight - 100 && navBar.offsetWidth > 930) {
            navBar.classList.add('header__wrapper_short');
            headerLogoImage.setAttribute('src', 'img/logo_white_symbol.png');
            header.classList.add('header_short');
        } else if (document.documentElement.scrollTop > mainSection.offsetHeight - 80 && navBar.offsetWidth < 960){
            navBar.classList.add('header__wrapper_short');
            headerLogoImage.setAttribute('src', 'img/logo_white_symbol.png');
            header.classList.add('header_short');
        } else {
            navBar.classList.remove('header__wrapper_short');
            headerLogoImage.setAttribute('src', 'img/logo_white.png');
            header.classList.remove('header_short');
        } 
    }


});

