"use strict";


// Переключение темы
let themeStored = localStorage.getItem('theme');
if (themeStored)
    document.body.className = localStorage.getItem('theme');

let backgroundStored = localStorage.getItem('background');
if (backgroundStored)
    document.body.style.background = `url( ${backgroundStored} ) no-repeat center center / cover`;

let blurStored = localStorage.getItem('backgroundBlur');
if (blurStored) {
    document.body.style.backdropFilter = `blur( ${blurStored}px)`;
    document.querySelector('#blur_range').value = blurStored;
}

if ( checkBackground() ) {
    let dimStored = localStorage.getItem('backgroundDim');
    if (dimStored)
        document.body.style.backgroundColor = `rgba(0, 0, 0, ${dimStored / 100})`;
    document.querySelector('#dim_range').value = dimStored;
}


function switch_theme() {
    const theme = document.querySelectorAll('body, .search_bar, .search_bar svg');
    
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
    elem.addEventListener('click', function(e) {
        if ( elem.classList.contains('search_bar') && searchActive )
            return;
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        console.log('x, y:', x, y);
        console.log('clientx, target:', e.clientX, e.target.offsetLeft)

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
})

function closeModals() {
    document.querySelectorAll('.modals_wrapper, .modal').forEach(elem => {
        elem.style.display = 'none';
    })
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
    elem.addEventListener('click', function(event) {
        document.querySelectorAll('.element-selected').forEach(e => {
            e.classList.toggle('element-selected');
        })
        this.classList.toggle('element-selected');
    })

})


// слайдеры
const blurRange = document.querySelector('#blur_range');
const blurValue = document.querySelector('#blur_percent');
const dimRange = document.querySelector('#dim_range');
const dimPercent = document.querySelector('#dim_percent');

setInterval(() => {
    blurValue.textContent = blurRange.value;
    dimPercent.textContent = dimRange.value + '%';
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
    if ( checkBackground() )
        document.body.style.backgroundColor = `rgba(0, 0, 0, ${dimRange.value / 100})`;

    localStorage.setItem('backgroundBlur', blurRange.value);
    localStorage.setItem('backgroundDim', dimRange.value);

    closeModals();
})


function checkBackground() {
    if (document.body.style.backgroundImage) return true;
    else return false;
}


// постоянная подсветка выбранного бэкграунда
const bgs = document.querySelectorAll('.background_images__list__element img');
bgs.forEach( function(bg) {
    let bgImg = bg.src.slice( bg.src.match('/static').index );
    if (bgImg == backgroundStored) {
        bg.parentElement.classList.toggle('element-selected');
        return;
    }
})