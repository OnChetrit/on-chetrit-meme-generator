'use strict'

// RENDERING

function renderCanvas() {
    gCtx.save()
    gCtx.fillStyle = "#fff"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    // renderCircle()
    gCtx.restore()
}
function renderImgs() {
    const images = getImgs();
    let strHtmls = images.map(image => {
        return `<img data-id=${image.id} onclick="onImgClick(this)" class="meme"
        src=${image.url}>`
    });
    document.querySelector('.images-menu').innerHTML = strHtmls.join('');
}
function renderMain(page) {
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.editor-container').classList.add('hide');
    document.querySelector('.memes-container').classList.add('hide');

    document.querySelector(`.${page}-container`).classList.remove('hide');
}