'use strict'

let gMeme;

function createMeme(imgId) {
    var canvas = getCanvas();
    let meme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            width: 0,
            size: 40,
            align: 'center',
            color: '#ffffff',
            strokeColor: '#000000',
            font: 'impact ,comix',
            pos: {
                x: canvas.width / 2,
                y: 40
            },
        }]
    }
    gMeme = meme;
}


function removeLine() {
    let lineIdx = gMeme.selectedLineIdx;
    if (lineIdx >= 0) {
        gMeme.lines.splice(lineIdx, 1);
        if (gMeme.lines.length) {
            gMeme.selectedLineIdx--;
            return;
        }
        const canvas = getCanvas();
        if (lineIdx === 0) addLine(canvas.width, canvas.height);
    }

}
function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function addLine(canvasW, canvasH) {
    gMeme.selectedLineIdx++
    let linesCount = gMeme.lines.length;
    if (linesCount && !gMeme.lines[linesCount - 1].txt) {
        gMeme.selectedLineIdx = linesCount - 1;
        return;
    }
    const newLine = createNewLine(canvasW, canvasH);
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = linesCount++;
}
function createNewLine(canWidth, canHeight) {
    let y = 40;
    const linesCount = gMeme.lines.length;
    if (linesCount === 1) y = canHeight - 40;
    else if (linesCount > 0) y = canHeight / 2;
    let newLine = {
        txt: '',
        width: 0,
        size: 40,
        align: 'center',
        color: '#ffffff',
        strokeColor: '#000000',
        font: 'impact ,comix',
        pos: {
            x: canWidth / 2,
            y
        }
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
    let currTextPosY = gMeme.lines[idx].pos.y
    const canvasH = getCanvas().height;
    if (idx >= 0) {
        if (currTextPosY + value > 30 && currTextPosY + value < canvasH)
            gMeme.lines[idx].pos.y += value;
    }
}
function changeColor(color) {
    const idx = gMeme.selectedLineIdx;
    if (idx < 0) return;
    gMeme.lines[idx].color = color;

}
function changeStroke(color) {
    const idx = gMeme.selectedLineIdx;
    if (idx < 0) return;
    gMeme.lines[idx].strokeColor = color;
}
function setTextAlign(align) {
    const idx = gMeme.selectedLineIdx;
    if (idx === -1) return;
    switch (align) {
        case 'left':
            gMeme.lines[idx].pos.x = 0;
            break;
        case 'right':
            gMeme.lines[idx].pos.x = getCanvas().width;
            break;
        case 'center':
            gMeme.lines[idx].pos.x = getCanvas().width / 2;
            break;
    }
    gMeme.lines[idx].align = align;
}
function changeFontSize(value) {
    const idx = gMeme.selectedLineIdx;
    if (idx === -1) return;
    gMeme.lines[idx].size += value;

}
function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}



function saveMeme(imgContent) {
    let savedMemes = getSavedMemes();
    savedMemes.push(gMeme);
    _saveMemesToStorage
}

function resetSelections() {
    gMeme.selectedLineIdx = 0;
}
///////////////////////// GETS /////////////////////////
function getSelectedLineTxt() {
    if (gMeme.selectedLineIdx > 0) return gMeme.lines[gMeme.selectedLineIdx].txt;
    return '';
}
function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}
function getMeme() {
    return gMeme;
}
