'use strict'

var gIsDragging = false;
var gIsScaling = false;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInit() {
    initCanvas();
    renderImgs();
    // updateTags();
    // renderTags();
    addListeners();
}

///////////////////////// BUTTONS CLICKS /////////////////////////
function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl');
    }
    else {
        document.body.classList.remove('rtl');
    }
    doTrans();
}
function onOpenPage(page) {
    renderMain(page);
    document.body.classList.toggle('menu-open');
}
function onImgClick(ElImg) {
    renderMain('editor');
    let imgId = ElImg.dataset.id;
    createMeme(imgId);
    renderCanvas();
    resetSelections();
}
function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}

///////////////////////// EDIT CLICKS /////////////////////////
function onSetText(txt) {
    // var canvas = getCanvas();
    // var color = getColor();
    // var font = getFont();
    // setText(txt, canvas.width, canvas.height, color, font);
    setText(txt);
    renderCanvas();
}
function onRemoveLine() {
    removeLine();
    renderCanvas();
}
function onAddLine() {
    var canvas = getCanvas();
    addLine(canvas.width, canvas.height);
    renderCanvas();
}
function onSwitchLine() {
    switchLine();
    renderCanvas();
}
function onChangePos(value) {
    ChangePos(value);
    renderCanvas();
}
function onChangeColor(color) {
    changeColor(color);
    renderButtonColor();
    renderCanvas();
}
function onChangeStroke(color) {
    changeStroke(color);
    renderButtonStrokeColor(color);
    renderCanvas();
}
function onSetTextAlign(align) {
    setTextAlign(align);
    renderCanvas();
}
function onChangeFontSize(value) {
    changeFontSize(value);
    renderCanvas();
}
function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent;
}


///////////////////////// LISTENERS /////////////////////////
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     renderCanvas()
    // })
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}
function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}
function onDown(ev) {
    const pos = getEvPos(ev)
    const { isDragging, isScaling } = isDraggingOrScaling(pos);
    gIsDragging = isDragging;
    gIsScaling = isScaling;
    renderCanvas();
    updateMemeTxtInput();
    gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}
function onMove(ev) {
    if (!gIsDragging && !gIsScaling) return;
    const pos = getEvPos(ev);
    if (gIsDragging) {
        moveSelectedByDragging(pos, gStartPos);
        gStartPos = pos;
        renderCanvas();
        return
    }
    scaleSelectedByDragging(pos, gStartPos);
    gStartPos = pos;
    renderCanvas();
}
function onUp() {
    gIsDragging = false;
    gIsScaling = false;
    document.body.style.cursor = 'grab'
}
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    };
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        };
    }
    return pos;
}

///////////////////////// CANVAS /////////////////////////
