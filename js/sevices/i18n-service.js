'use strict'

let gCurrLang = 'en';

let gTrans = {
    gallery: {
        en: 'Gallery',
        he: 'גלריה'
    },
    'my-memes': {
        en: 'My Memes',
        he: 'שמורים'
    },
    about: {
        en: 'About',
        he: 'אודות'
    },
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans['en']
    return txt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    })
}

function setLang(lang) {
    gCurrLang = lang;
}