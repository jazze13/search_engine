"use strict";

function switch_theme() {
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
}

let search_active = false;

const click_effect = document.querySelectorAll('.click_effect');
click_effect.forEach(elem => {
    elem.addEventListener('click', function(e) {
        if (!search_active) {
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

search.onblur = function() {
    if (!search.value) {
        search.style.pointerEvents = 'none';
        search_active = false;
    }
}