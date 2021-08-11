'use strict'

let gMeme;
var gElCanvas;
var gCtx;

function initCanvas() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
}
function drawImage(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function createMeme(imgId) {
    let meme = {
        selectedImgId: imgId,
        selectedLineIdx: -1,
        lines: []
    }
    gMeme = meme;
}
function deleteMeme() {
    gMeme = null;
}
function getMeme() {
    return gMeme;
}
function getCtx() {
    return gCtx;
}
function getCanvas() {
    return gElCanvas;
}
    // function uploadMemeOnCanvas() {
    //     const meme = getMeme();
    //     let img = new Image();
    //     let memeImg = getImgById(meme.memeId);
    //     img.onload = () => {
    //         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    //     }
    //     img.src = memeImg.url
    // }