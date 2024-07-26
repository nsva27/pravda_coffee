'use strict';

// Выполнить скрипт после загрузки контента DOM-дерева
document.addEventListener('DOMContentLoaded', () => {
  const
    header = document.querySelector('.header'),
    headerWrapper = document.querySelector('.header__wrapper'),
    headerLogoImage = document.querySelector('.header__logo-img'),
    headerNavParent = document.querySelector('.header__nav'),
    headerNavItems = document.querySelectorAll('.header__nav-item'),

    mainSection = document.querySelector('.main'),

    menuSections = document.querySelectorAll('.menu'),
    menuNavBar = document.querySelector('.menu__navbar'),
    menuNavParent = document.querySelector('.menu__nav'),
    menuNavItems = document.querySelectorAll('.menu__nav-item'),

    sectionTitles = document.querySelectorAll('.section-title'),
    sections = document.querySelectorAll('section');

  // Изменить конфигурацию шапки сайта
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
        if (item.classList.contains('header__nav-item_colored')) {
          item.classList.remove('header__nav-item_colored');
          item.classList.add('header__nav-item_checked');
        }
      })
    };
  }

  // Изменить логотип в шапке сайта
  function changeLogoImage() {
    if (header.classList.contains('header_short')) {
      headerLogoImage.setAttribute('src', 'img/logo_white_symbol.png');
    } else {
      headerLogoImage.setAttribute('src', 'img/logo_white.png');
    }
  }

  // Свернуть шапку сайта при скролле до конца блока "main"
  function hideHeader() {
    if (document.documentElement.scrollTop > mainSection.offsetHeight - 100 && headerWrapper.offsetWidth > 930) {
      header.classList.add('header_short');
      headerWrapper.classList.add('header__wrapper_short');
      header.classList.add('header_short');
      changeHeaderNavConfig();
      changeLogoImage();
      menuNavBar.classList.add('menu__navbar_shaddow');
    } else if (document.documentElement.scrollTop > mainSection.offsetHeight - 80 && headerWrapper.offsetWidth < 960) {
      header.classList.add('header_short');
      headerWrapper.classList.add('header__wrapper_short');
      header.classList.add('header_short');
      changeHeaderNavConfig();
      changeLogoImage();
      menuNavBar.classList.add('menu__navbar_shaddow');
    } else {
      header.classList.remove('header_short');
      headerWrapper.classList.remove('header__wrapper_short');
      header.classList.remove('header_short');
      changeHeaderNavConfig();
      changeLogoImage();
      menuNavBar.classList.remove('menu__navbar_shaddow');
    }
  }

  // Запускаем функцию сразу, чтобы при обновлении страницы в проскролленом состоянии шапка сразу свернулась
  hideHeader();

  // Отслеживаем скролл и сворачиваем шапку, если условие удовлетворительное
  window.addEventListener('scroll', hideHeader);

  // Скролл к нужному блоку на сайте при нажатии на соответствующую кнопку
  function scrollToSection(buttons, sections) {
    buttons.forEach(btn => {
      btn.addEventListener('click', (event) => {
        const target = event.target;

        for (let i = 0; i < sections.length; i++) {
          if (btn.getAttribute('data-to') === sections[i].getAttribute('id') && btn === target) {
            const titlePosition = sections[i].getBoundingClientRect().top;

            if (buttons === headerNavItems) {
              window.scrollTo({
                top: titlePosition + document.documentElement.scrollTop - 60
              });
            } else {
              window.scrollTo({
                top: titlePosition + document.documentElement.scrollTop - 100
              });
            }
          }
        }
      });
    });
  }

  scrollToSection(headerNavItems, sectionTitles);

  // Убрать класс активности для всех элементов навигации
  function hideHeaderTabMarker() {
    headerNavItems.forEach(item => {
      item.classList.remove('header__nav-item_short-active');
    });
  }

  function hideMenuTabMarker() {
    menuNavItems.forEach(item => {
      item.classList.remove('menu__nav-item_active');
      item.classList.remove('menu__nav-item_checked-active');
    });
  }

  function showMarker(buttons) {
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('header__nav-item') && target === btn) {
          hideHeaderTabMarker();

          buttons[i].classList.add('header__nav-item_short-active');
          scrollToSection(headerNavItems, sectionTitles);
        } else if (target && target.classList.contains('menu__nav-item') && target === btn) {
          hideMenuTabMarker();

          if (buttons[i].classList.contains('menu__nav-item_checked')) {
            buttons[i].classList.add('menu__nav-item_checked-active');
            scrollToSection(menuNavItems, menuSections);
          } else {
            buttons[i].classList.add('menu__nav-item_active');
            scrollToSection(menuNavItems, menuSections);
          }
        }
      });
    });
  }

  // При клике на логотип убираем все классы активности у пунктов навигации
  headerLogoImage.addEventListener('click', () => {
    hideHeaderTabMarker();
    hideMenuTabMarker();
  });

  // При клике на определенный пункт навигации добавляем ему класс активности, а у остальных убираем
  headerNavParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('header__nav-item_short')) {
      headerNavItems.forEach(item => {
        if (target === item) {
          hideHeaderTabMarker();
          showMarker(headerNavItems);
          scrollToSection(headerNavItems, sectionTitles);
        }
      });
    }
  });

  menuNavParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('menu__nav-item')) {
      menuNavItems.forEach((item, i) => {
        if (target === item) {
          hideMenuTabMarker();
          showMarker(menuNavItems);
          scrollToSection(menuNavItems, menuSections);
        }
      });
    }
  });

  // Добавить класс активности пункту навигации, если мы находимся в рамках блока, соответсвующего ему
  function checkNavItemBuScroll() {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top < header.clientHeight +
        menuNavParent.clientHeight + 20 && sections[i].getBoundingClientRect().bottom > header.clientHeight + menuNavParent.clientHeight + 20) {
        showTabMarker(i);
      } else {
        hideTabMarker();
      }
    }
  }

  // Отслеживаем скролл и добавляем класс активности пункту навигации, если попали в поле определенного блока
  // window.addEventListener('scroll', checkNavItemBuScroll);
});