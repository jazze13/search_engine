"use strict";


// Переключение темы
document.body.className = localStorage.getItem('theme');

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
document.querySelector('.change_background').addEventListener('click', () => {
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


// Загрузка Файла для бэкграунда
// const fileUpload = document.querySelector('.file_upload');
// const fileUploadLabel = document.querySelector('label[for*=upload]');

// fileUpload.addEventListener('change', e => {
//     console.log(this);
//     if (this.files) {
//         let fileName = e.target.value.split('\\').pop();
//         fileUploadLabel.innerHTML = fileName;
//     }
//     var customBackground = this.files[0];
// })

// document.querySelector('.custom_backgorund__apply').addEventListener('click', () => {
//     document.body.style.backgroundImage = customBackground;
//     closeModals();
// })