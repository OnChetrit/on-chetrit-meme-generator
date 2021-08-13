'use strict'

var gSavedMemes = []
const KEY = 'memesDB';


function onImgInput(ev) {
    loadImageFromInput(ev, renderImg);
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('canvas').innerHTML = '';
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img);
        img.src = event.target.result;
    };
    reader.readAsDataURL(ev.target.files[0]);
}
function renderImg(img) {
    gContext.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}



function _saveMemesToStorage() {
    saveToStorage(KEY, gSavedMemes)
}
////////////////////////////////////////////////////////////////
function loadMemes() {
    var memes = getMemesFromStorage()
    if (!memes) return
    gSavedMemes = memes
    return gSavedMemes
}

function getMemesFromStorage() {
    var memes = loadFromStorage(KEY)
    return memes
}