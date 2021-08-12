'use strict'

let gMeme;
let gCurrColor = '#fff';
let gCurrFont = 'impact';

function createMeme(imgId) {
    var canvas = getCanvas();
    let meme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            size: 30,
            align: 'center',
            color: '#fff',
            font: 'impact',
            pos: {
                x: canvas.height / 2,
                y: 40
            },
        }]
    }
    gMeme = meme;
}
function removeMeme() {
    let idx = gMeme.selectedLineIdx;
    if (idx >= 0) {
        gMeme.lines.splice(idx, 1);
        if (gMeme.lines.length) {
            gMeme.selectedLineIdx = gMeme.lines.length - 1;
            return;
        }
        gMeme.selectedLineIdx = -1;
    }
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function addLine(canvasW, canvasH, color, font) {
    gMeme.selectedLineIdx++
    let linesCount = gMeme.lines.length;
    if (linesCount && !gMeme.lines[linesCount - 1].txt) {
        gMeme.selectedLineIdx = linesCount - 1;
        return;
    }
    const newLine = createNewLine(canvasW, canvasH, color, font);
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = linesCount++;
}
function createNewLine(canWidth, canHeight, color, font) {
    let y = 40;
    const linesCount = gMeme.lines.length;
    if (linesCount === 1) y = canHeight - 40;
    else if (linesCount > 0) y = canHeight / 2;
    let newLine = {
        txt: '',
        size: 30,
        align: 'center',
        isStroke: true,
        color,
        font,
        pos: {
            x: canWidth / 2,
            y
        },
    };
    return newLine;
}
function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}
function ChangePos(value) {
    let idx = gMeme.selectedLineIdx;
    value *= 3;
    if (idx >= 0) {
        gMeme.lines[idx].pos.y += value;
        return;
    }
}
function changeColor(color) {
    const idx = gMeme.selectedLineIdx;
    if (idx < 0) return;
    gMeme.lines[idx].color = color;
}

///////////////////////// GETS /////////////////////////
function getSelectedLineTxt() {
    if (gMeme.selectedLineIdx > 0) return gMeme.lines[gMeme.selectedLineIdx].txt;
    return '';
}
function getCurrLine() {
    var currLineIdx = gMeme.selectedLineIdx
    return gMeme.lines[currLineIdx]
}
function getMeme() {
    return gMeme;
}
function getColor() {
    return gCurrColor;
}
function getFont() {
    return gCurrFont;
}
