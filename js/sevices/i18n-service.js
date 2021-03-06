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
    download: {
        en: 'Dowmload',
        he: 'הורדה'
    },
    'enter-text': {
        en: 'Enter Text',
        he: 'הכנס טקסט'
    },
    welcome: {
        en: 'Welcome to my Meme Generator',
        he: 'ברוכים הבאים ליצירת הממים שלי'
    },
    'p1': {
        en: 'This app created and designed by On Chetrit',
        he: 'האפליקציה הזו נכתבה ועוצבה ע"י און שטרית'
    }
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