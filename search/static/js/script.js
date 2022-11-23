"use strict";


// установка настроек
let themeStored = localStorage.getItem('theme');
if (themeStored) {
    document.body.className = localStorage.getItem('theme');
}

let backgroundStored = localStorage.getItem('background');
if (backgroundStored) {
    document.body.style.background = `url( ${backgroundStored} ) no-repeat center center / cover`;
}

let blurStored = localStorage.getItem('backgroundBlur');
if (blurStored) {
    document.body.style.backdropFilter = `blur( ${blurStored}px)`;
    document.querySelector('#blur_range').value = blurStored;
}

let opacityStored = localStorage.getItem('backgroundOpacity');
if (opacityStored) {
    document.querySelector('.background_opacity').style.opacity = opacityStored / 100;
    document.querySelector('#bg_opacity_range').value = opacityStored;
}


// Переключение темы
function switch_theme() {
    const theme = document.querySelectorAll('body, .search_bar, .search_bar svg, .background_opacity');
    
    theme.forEach(elem => {
        elem.style.transition = '2s';
    });
    
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
    localStorage.setItem('theme', document.body.className);
    
    setTimeout(() => {
        theme.forEach(elem => {
            elem.style.transition = '';
        });
    }, 2000);
}


let searchActive = false;

// Ripple
const clickEffect = document.querySelectorAll('.click_effect');
clickEffect.forEach(elem => {
    elem.addEventListener('click', function(event) {
        if ( elem.classList.contains('search_bar') && searchActive )
            return;
        
        let x = event.clientX - event.target.offsetLeft;
        let y = event.clientY - event.target.offsetTop;

        let ripple = document.createElement('span');
        ripple.className = 'ripple';

        ripple.style.top = y + 'px';
        ripple.style.left = x + 'px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 500);
    })
})


// Поисковая строка
const search = document.querySelector('.search');

document.querySelector('.search_bar').addEventListener('click', () => {
    search.focus();
    search.style.pointerEvents = 'initial';
    searchActive = true;
})

search.onblur = () => {
    if (!search.value) {
        search.style.pointerEvents = 'none';
        searchActive = false;
    }
}


// Модалки
document.querySelector('.change_background').addEventListener('click', function() {
    document.querySelectorAll('.modals_wrapper, .modal').forEach(elem => {
        elem.style.display = 'flex';
    })
    // document.body.style.overflow = 'hidden';
	lock();

})

function closeModals() {
    document.querySelectorAll('.modals_wrapper, .modal').forEach(elem => {
        elem.style.display = 'none';
    })
    
    // document.body.style.overflow = '';
	unlock();

    let blurStored = localStorage.getItem('backgroundBlur');
    if (blurStored) {
        document.querySelector('#blur_range').value = blurStored;
        document.querySelector('#blur_percent').textContent = blurStored;
    }
    
    let opacityStored = localStorage.getItem('backgroundOpacity');
    if (opacityStored) {
        document.querySelector('#bg_opacity_range').value = opacityStored;
        document.querySelector('#bg_opacity_percent').textContent = opacityStored;
    }
}

function lock() {
    let offset = window.innerWidth - document.body.offsetWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = offset + 'px';
}

function unlock() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

document.querySelector('.close_modal').addEventListener( 'click', () => {
    closeModals();
})

document.querySelector('.modals_wrapper').addEventListener('click', function(event) {
    if ( !event.target.closest('.modal') )
        closeModals();
})



// выбор бэкграунда
const backgrounds = document.querySelectorAll('.background_images__list__element');
backgrounds.forEach(function(elem) {
    elem.addEventListener('click', function() {
        document.querySelectorAll('.element-selected').forEach(e => {
            e.classList.toggle('element-selected');
        })
        this.classList.toggle('element-selected');
    })

})


// слайдеры
const blurRange = document.querySelector('#blur_range');
const blurValue = document.querySelector('#blur_percent');
const opacityRange = document.querySelector('#bg_opacity_range');
const opacityPercent = document.querySelector('#bg_opacity_percent');

setInterval(() => {
    blurValue.textContent = blurRange.value + 'px';
    opacityPercent.textContent = opacityRange.value + '%';
}, 10);


// применить
document.querySelector('.change_backgorund__apply').addEventListener('click', event => {
    const img = document.querySelector('.element-selected img');
    if (img) {
        let imgPath = img.getAttribute('src');
        document.body.style.background = `url( ${imgPath} ) no-repeat center center / cover`;
        localStorage.setItem('background', imgPath);    
    } else if ( document.querySelector('.element-selected') == document.querySelector('.no-img') ) {
        document.body.style.background = '';
        localStorage.setItem('background', '');
    }
    
    document.body.style.backdropFilter = `blur( ${blurRange.value}px)`;
    document.querySelector('.background_opacity').style.opacity = opacityRange.value / 100;

    localStorage.setItem('backgroundBlur', blurRange.value);
    localStorage.setItem('backgroundOpacity', opacityRange.value);

    closeModals();
})


// подсветка выбранного бэкграунда
const bgs = document.querySelectorAll('.background_images__list__element img');
bgs.forEach( function(bg) {
    let bgImg = bg.src.slice( bg.src.match('/static').index );
    if (bgImg == backgroundStored) {
        bg.parentElement.classList.toggle('element-selected');
    }
})

const rangeButtons = document.querySelectorAll('.range_button');


// + и - к рэнджам
rangeButtons.forEach(button => {
    button.addEventListener('click', event => {
        const sign = event.target.textContent;
        switch(sign) {
            case '+':
                event.target.parentElement.querySelector('input').value++;
                break;
            case '-':
                event.target.parentElement.querySelector('input').value--;
                break;
        }
    })
})

