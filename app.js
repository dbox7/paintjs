const canvas = document.getElementById('js-canvas');
const CTX = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('js-range');
const mode = document.getElementById('js-mode');
const clean = document.getElementById('js-clean');
const save = document.getElementById('js-save');

canvas.height = 700;
canvas.width = 700;

CTX.lineWidth = 2.5;
CTX.strokeStyle = '#2c2c2c';
CTX.fillStyle = 'white';
CTX.fillRect(0, 0, canvas.height, canvas.width);

const newColors = Array.from(colors);
newColors.forEach(color => color.addEventListener('click', changeColor));

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    x = event.offsetX;
    y = event.offsetY;
    if (!painting) {
        CTX.beginPath();
        CTX.moveTo(x, y);
    } else {
        CTX.lineTo(x, y);
        CTX.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function chooseColor(event) {
    newColors.forEach(color => color.classList.add('off'));
    event.target.classList.remove('off');
}

function changeColor(event) {
    chooseColor(event);
    const color = event.target.style.backgroundColor;
    CTX.strokeStyle = color;
}

function brushSizeChange(event) {
    const size = event.target.value;
    CTX.lineWidth = size;
}

function handleFill() {
    CTX.fillStyle = CTX.strokeStyle;
    CTX.fillRect(0, 0, canvas.height, canvas.width);
}

function handleClean() {
    CTX.clearRect(0, 0, canvas.height, canvas.width);
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSave() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'Your picture';
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('contextmenu', handleContextMenu);
}

if (range) {
    range.addEventListener('input', brushSizeChange);
}

if (mode) {
    mode.addEventListener('click', handleFill);
}

if (clean) {
    clean.addEventListener('click', handleClean);
}

if (save) {
    save.addEventListener('click', handleSave);
}

