'use strict'

// RENDERING
var gElCanvas;
var gCtx;
var gCurrRatio = 1;

function initCanvas() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
}
///////////////////////// CANVAS FUNCS /////////////////////////
function renderCanvas() {
    var meme = getMeme();
    var img = new Image();
    var currImg = getImgById(meme.selectedImgId);
    img.src = currImg.url;
    img.onload = function () {
        // clearCanvas();
        gCurrRatio = img.width / img.height;
        resizeCanvas();
        setInputText();
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        meme.lines.forEach(line => {
            drawText(line);
            showSelectedBorder(line)
        });
    }
}
function resizeCanvas() {
    const elEditorContainer = document.querySelector('.canvas-container-container');
    const elCanvasContainer = document.querySelector('.canvas-container');
    const canvasContainerW = elCanvasContainer.offsetHeight * gCurrRatio;
    elEditorContainer.style.heigth = canvasContainerW + 'px';
    gElCanvas.height = elCanvasContainer.offsetHeight;
    gElCanvas.width = canvasContainerW;
}
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function setInputText() {
    var meme = getMeme()
    document.querySelector('.meme-text').value = meme.lines[meme.selectedLineIdx].txt
}
function drawText(line) {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);


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
function updateMemeTxtInput() {
    document.querySelector('.meme-text').value = getSelectedLineTxt();
}
function renderButtonColor() {
    document.querySelector('.color-change').style.backgroundColor = getCurrLine().color;
}
function renderButtonStrokeColor(color) {
    document.querySelector('.stroke').style.backgroundColor = color;

}

///////////////////////// GETS /////////////////////////
function getCtx() {
    return gCtx;
}
function getCanvas() {
    return gElCanvas;
}
// function renderTags() {
//     const tagsCount = getTags();
//     let strHtml = Object.keys(tagsCount).map((tag) => `<option value="${tag}"></option>`)
//         .join('');
//     document.querySelector('#search-tags').innerHTML = strHtml;
// }