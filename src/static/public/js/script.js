const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const countersValue = document.querySelectorAll('.skills__progress-value'),
    lines = document.querySelectorAll('.skills__progress-line');

countersValue.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});

const contactsBtn = document.querySelector('.contacts__btn');

