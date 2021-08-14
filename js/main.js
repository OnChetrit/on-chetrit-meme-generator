'use strict'

var gIsDragging = false;
var gIsScaling = false;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInit() {
    initCanvas();
    renderImgs();
    // addListeners();
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
    if (document.body.offsetWidth <= 780) onToggleMenu();
}
function onImgClick(ElImg) {
    renderMain('editor');
    let imgId = ElImg.dataset.id;
    createMeme(imgId);
    renderCanvas();
    resetSelections();
    focusInput();
    renderButtonColor();
    renderButtonStrokeColor();
}
function onToggleMenu() {
    console.log('H');
    document.body.classList.toggle('menu-open');
    if (document.body.classList.contains('about-open'))
        document.body.classList.toggle('about-open');

}
function onToggleAboutModal(closeClicked = false) {
    console.log('H');
    document.body.classList.toggle('about-open');
    document.querySelector('.about-modal').classList.toggle('hide');
    console.log(closeClicked);
    if (!closeClicked) {
        if (document.body.offsetWidth <= 780) onToggleMenu();
    }
}

///////////////////////// EDIT CLICKS /////////////////////////
function onSetText(txt) {
    setText(txt);
    renderCanvas();
}
function onRemoveLine() {
    removeLine();
    renderCanvas();
    focusInput();
}
function onAddLine() {
    var canvas = getCanvas();
    addLine(canvas.width, canvas.height);
    renderCanvas();
    focusInput();
    renderButtonColor();
    renderButtonStrokeColor();
}
function onSwitchLine() {
    switchLine();
    renderCanvas();
    focusInput();
    renderButtonColor();
    renderButtonStrokeColor();
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
    renderButtonStrokeColor();
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
function onSetFont(font) {
    setFont(font);
    renderCanvas();
}
function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpg').replace("image/png", "image/octet-stream");
    elLink.href = imgContent;
}
function onSaveMeme() {
    var imgContent = gElCanvas.toDataURL('image/jpg')
    saveMeme(imgContent);
    // toggleSavedModal();
}


///////////////////////// LISTENERS /////////////////////////
function addListeners() {
    addMouseListeners()
    addTouchListeners()
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
    renderCanvas();
    gStartPos = pos
}
function onMove(ev) {
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
