"use strict";

const theme = document.querySelectorAll('body, .search_bar, .search_bar svg');

function switch_theme() {
    theme.forEach(elem => {
        elem.style.transition = '2s';
    });

    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
    localStorage.setItem('theme', document.body.className);

    theme.forEach(elem => {
        elem.style.transition = '';
    });
}

document.body.className = localStorage.getItem('theme');

let search_active = false;

const click_effect = document.querySelectorAll('.click_effect');
click_effect.forEach(elem => {
    elem.addEventListener('click', function(e) {
        if ( !search_active && elem.classList.contains('search_bar') ) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripple = document.createElement('span');
            ripple.className = 'ripple';

            ripple.style.top = y + 'px';
            ripple.style.left = x + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 500);
        }
    })
})


const search = document.querySelector('.search');

document.querySelector('.search_bar').addEventListener('click', function() {
    search.focus();
    search.style.pointerEvents = 'initial';
    search_active = true;
})

search.onblur = () => {
    if (!search.value) {
        search.style.pointerEvents = 'none';
        search_active = false;
    }
}