'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // to hide header navigation menu on scroll
    const header = document.querySelector('.header'),
          navBar = document.querySelector('.header__wrapper'),
          headerLogoImage = document.querySelector('.header__logo-img'),
          headerNav = document.querySelector('nav.header__nav'),
          headerNavItem = document.querySelectorAll('.header__nav-item'),
          mainSection = document.querySelector('.main'),
          menuHeader = document.querySelector('.menu');
          
    hideNavbar();
    window.addEventListener('resize', hideNavbar);
    window.addEventListener('scroll', hideNavbar);

    function changeLogoImage() {
        if (header.classList.contains('header_short')) {
            headerLogoImage.setAttribute('src', 'img/logo_white_symbol.png');
        }  else {
            headerLogoImage.setAttribute('src', 'img/logo_white.png');
        }
    }

    function changeHeaderNavConfig() {
        if (header.classList.contains('header_short')) {
            headerNavItem.forEach(item => {        
                item.classList.add('header__nav-item_short');
                if (item.classList.contains('header__nav-item_checked')) {
                    item.classList.remove('header__nav-item_checked');
                    item.classList.add('header__nav-item_colored');
                }
            });
        } else {
            headerNavItem.forEach(item => {
                item.classList.remove('header__nav-item_short');
                if (item.classList.contains('header__nav-item_colored')) {
                    item.classList.remove('header__nav-item_colored');
                    item.classList.add('header__nav-item_checked');
                }
            });
        }
    }

    /* 20.04.23
    Проблема 1: при обновлении страницы в положении _short, страница не реагирует на изменения.
    Скрипты не исполняются дальше вызова функции changeHeaderNavConfig.
    Проблема 2: обводка вокруг выделеного айтема не становится прозрачной, а уменьшиется в направлении элемента.
    */
    

    function hideNavbar() {
        if (document.documentElement.scrollTop > mainSection.offsetHeight - 100 && navBar.offsetWidth > 930) {
            navBar.classList.add('header__wrapper_short');
            header.classList.add('header_short');
            menuHeader.classList.add('menu_shaddow');
            changeHeaderNavConfig();
            changeLogoImage();
        } else if (document.documentElement.scrollTop > mainSection.offsetHeight - 80 && navBar.offsetWidth < 960){
            navBar.classList.add('header__wrapper_short');
            header.classList.add('header_short');
            menuHeader.classList.add('menu_shaddow');
            changeHeaderNavConfig();
            changeLogoImage();
        } else {
            navBar.classList.remove('header__wrapper_short');
            header.classList.remove('header_short');
            menuHeader.classList.remove('menu_shaddow');
            changeHeaderNavConfig();
            changeLogoImage();
        } 
    }
    // /to hide header navigation menu on scroll

    // to show menu burger
    const burgerMenu = document.createElement('img');
    burgerMenu.setAttribute('class', 'menu-burger');
    burgerMenu.src = '../img/icons/menu_burger.svg';

    window.addEventListener('resize', changeToBurgerMenu);
    
    function changeToBurgerMenu() {
        if (header.offsetWidth <= 769) {
            headerNav.classList.add('hide');
            navBar.prepend(burgerMenu);
        } else {
            headerNav.classList.remove('hide');
            burgerMenu.remove();
        }
    }
    
    // -------------/header---------------

    // to resize menu-items images on hover
    const menuItem = document.querySelectorAll('.menu-item'),
          itemImage = document.querySelectorAll('.menu-item__image');

    function increaseImage(i = 0) {
        itemImage[i].classList.add('menu-item__image_resize');
    }

    function decreaseImage(i = 0) {
        itemImage[i].classList.remove('menu-item__image_resize');
    }

    menuItem.forEach((item, i) => {
        item.addEventListener('mouseover', (event) => {
            const target = event.target;
            if (target) {
                increaseImage(i);
            }
        });
        item.addEventListener('mouseout', (target) => {
            if (target) {
                decreaseImage(i);   
            }
        });
    });
    // /to resize menu-items images on hover

    // to scroll on menu-item by click on menu button
    const menuBtns = document.querySelectorAll('.menu__nav-item'),
          menuListItems = document.querySelectorAll('.menu-list__title');

    // menuBtns[0].addEventListener('click', () => {
    //     window.scrollTo({
    //         top: mainSection.offsetHeight + 50
    //     });
    // });

    menuBtns.forEach((btn) => {
        console.log(btn.getAttribute('data-to'))
        
        btn.addEventListener('click', () => {
            for (let i = 0; i < menuListItems.length; i++) {
                if (btn.getAttribute('data-to') === menuListItems[i].getAttribute('id')) {
                    const rect = menuListItems[i].getBoundingClientRect();
                    window.scrollTo({
                        top: rect.top + document.documentElement.scrollTop - 120
                    });    
                }
            }
        });
    });

  
    
          
    // ---------------/menu list------------------

});


