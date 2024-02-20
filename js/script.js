'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // To hide header navigation menu on scroll
  // Функционал: Скрыть меню навигации при скролле

  // Получаем элементы шапки сайта: родитель, обертка, логотип, навигация и тд.
  const header = document.querySelector('.header'),
        navBar = document.querySelector('.header__wrapper'),
        headerLogoImage = document.querySelector('.header__logo-img'),
        headerNav = document.querySelector('nav.header__nav'),
        headerNavItems = document.querySelectorAll('.header__nav-item'),
        mainSection = document.querySelector('.main'),
        menuHeader = document.querySelector('.menu');
        // menuListItems = document.querySelectorAll('.menu-list__item');
        
  // hideNavbar();
  // window.addEventListener('resize', hideNavbar);
  window.addEventListener('scroll', hideNavbar);

  // To change logo image on navbar resizing
  // Функция для смены логотипа при уменьшении размера шапки сайта
  function changeLogoImage() {
    if (header.classList.contains('header_short')) {
      headerLogoImage.setAttribute('src', 'img/logo_white_symbol.png');
    } else {
      headerLogoImage.setAttribute('src', 'img/logo_white.png');
    }
  }

  // Функция, которая изменяет внешний вид пунктов навигации при смене размеров окна браузера
  function changeHeaderNavConfig() {
    if (header.classList.contains('header_short')) {
      headerNavItems.forEach(item => {        
        item.classList.add('header__nav-item_short');
        if (item.classList.contains('header__nav-item_checked')) {
          item.classList.remove('header__nav-item_checked');
          item.classList.add('header__nav-item_colored');
        }
      });
    } else {
      headerNavItems.forEach(item => {
        item.classList.remove('header__nav-item_short');
        // item.classList.remove('header__nav-item_short-active');
        if (item.classList.contains('header__nav-item_colored')) {
          item.classList.remove('header__nav-item_colored');
          item.classList.add('header__nav-item_checked');
        }
      });
    }
  }

  function hideNavbar() {
    if (document.documentElement.scrollTop > mainSection.offsetHeight - 100 && navBar.offsetWidth > 930) {
      header.classList.add('header_short');
      navBar.classList.add('header__wrapper_short');
      menuHeader.classList.add('menu_shaddow');
      // item.classList.remove('header__nav-item_short-active');
      changeHeaderNavConfig();
      changeLogoImage();
    } else if (document.documentElement.scrollTop > mainSection.offsetHeight - 80 && navBar.offsetWidth < 960) {
      header.classList.add('header_short');
      navBar.classList.add('header__wrapper_short');
      menuHeader.classList.add('menu_shaddow');
      changeHeaderNavConfig();
      changeLogoImage();
    } else {
      header.classList.remove('header_short');
      navBar.classList.remove('header__wrapper_short');
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
  
  // Заменить навигацию в шапке на бургер меню, если размер шапки меньше 770px
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

  // To scroll on items by click on nav/menu buttons
  // Функционал: скролл к элементам навигации и меню при нажатии на соответствующие кнопки

  // 1) Получаем кнопки навигации/меню и элементы, к которым они ведут
  const navBtns = document.querySelectorAll('.header__nav-item'),
        navItems = document.querySelectorAll('.section-title'),
        menuBtns = document.querySelectorAll('.menu__nav-item'),
        menuListItems = document.querySelectorAll('.menu-list__item');

  function scrollToSection(buttons, section) {
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        for (let i = 0; i < section.length; i++) {
          if (btn.getAttribute('data-to') === section[i].getAttribute('id') && btn === e.target) {
            const position = section[i].getBoundingClientRect();
            window.scrollTo({
              top: position.top + document.documentElement.scrollTop - 60
            });
            btn.classList.add('header__nav-item_short-active');
          }
        }
      });
    });
  }

  scrollToSection(navBtns, navItems);

  // *Задача: чтобы элемент меню был выделен, пока мы находимся в соответсвующей области секции навигации

  const menuNavBar = document.querySelector('.menu');
  console.log(menuNavBar);

  /* menuBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      const target = event.target;
      for (let i = 0; i < menuListItems.length; i++) {
        if (target.getAttribute('data-to') == menuListItems[i].getAttribute('id')) {
          removeCheckedStateOfMenuItem();
          target.classList.add('menu__nav-item_active');
          scrollToSection(menuBtns, menuListItems);
        }
      }
    });
  }); */

  // window.addEventListener('scroll', checkMenuItemByScroll);

  /* menuBtns.forEach(btn => {
      btn.addEventListener('click', checkMenuItem);
  }) */

  // Функция, которая выделяет пункт меню, в поле которого мы находимся при скроле.
  function checkMenuItemByScroll() {
    for (let i = 0; i < menuListItems.length; i++) {
      if (menuListItems[i].getBoundingClientRect().top < navBar.clientHeight + menuNavBar.clientHeight + 100 && menuListItems[i].getBoundingClientRect().bottom > navBar.clientHeight + menuNavBar.clientHeight + 100) {
        menuBtns[i].classList.add('menu__nav-item_active');
      } else {
        menuBtns[i].classList.remove('menu__nav-item_active');
      }
    }
  }

  // Функционал переключения кнопок между собой при нажатии на них.
  const navTabsParent = document.querySelector('nav.header__nav'),
        menuTabsParent = document.querySelector('nav.menu__nav');

  // Переключение кнопок "навигации".
  function hideNavTabMarker() {
    navBtns.forEach(btn => {
      btn.classList.remove('header__nav-item_short-active');
    });
  }

  function showNavTabMarker(i = 0) {
    if (navBtns[i].classList.contains('header__nav-item_short')) {
      navBtns[i].classList.add('header__nav-item_short-active');
    }
  }

  hideNavTabMarker();

  navTabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('header__nav-item_short')) {
      navBtns.forEach((btn, i) => {
        if (target == btn) {
          hideNavTabMarker();
          showNavTabMarker(i);
        }
      });
    }
  });

  // Переключение кнопок "меню".
  function hideTabMarker() {
    menuBtns.forEach(btn => {
      btn.classList.remove('menu__nav-item_active');
      btn.classList.remove('menu__nav-item_checked-active');
    });
  }

  function showTabMarker(i = 0) {
    if (menuBtns[i].classList.contains('menu__nav-item_checked')) {
      menuBtns[i].classList.add('menu__nav-item_checked-active');
    } else {
      menuBtns[i].classList.add('menu__nav-item_active');
    } 
  }

  hideTabMarker();

  menuTabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('menu__nav-item')) {
      menuBtns.forEach((btn, i) => {
        if (target == btn) {
          hideTabMarker();
          showTabMarker(i);
        }
      });
    }
  });
        

  function changeMenuSectionByPush() {  
    for (let i = 0; i < menuListItems.length; i++) {
      menuBtns[i].addEventListener('click', (event) => {
        const target = event.target;
        if (target.getAttribute('data-to') == menuListItems[i].getAttribute('id')) {
          window.scrollTo({
          top: menuListItems[i].getBoundingClientRect().top + document.documentElement.scrollTop - 80
          });
          checkMenuItemByScroll();
        } 
      });  
    }
  }

  changeMenuSectionByPush();

  // ---------------/menu list------------------
});