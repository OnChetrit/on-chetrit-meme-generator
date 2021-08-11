'use strict'

var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInit() {
    initCanvas();
    renderImgs();
    updateTags();
    renderCanvas();
    // rendertags()
    // resizeCanvas();
    // addListeners();
}

///////////////////////// BUTTONS CLICKS /////////////////////////
function onSetLang(lang) {
    setLang(lang);
    if (lang === 'עברית') {
        document.body.classList.add('rtl');
    }
    else {
        document.body.classList.remove('rtl');
    }
    doTrans();
}
function onOpenPage(page) {
    renderMain(page);
}
function onImgClick(ElImg) {
    renderMain('editor');
    // let img = ElImg.dataset.id;
    drawImage(ElImg);
}

///////////////////////// LISTENERS /////////////////////////
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
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
    if (!isCircleClicked(pos)) return
    setCircleDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}
function onMove(ev) {
    const circle = getCircle();
    if (circle.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveCircle(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}
function onUp() {
    setCircleDrag(false)
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
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 600;
    gElCanvas.height = elContainer.offsetHeight - 200;
}