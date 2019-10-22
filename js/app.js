const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

// canvas 픽셀을 설정해야만 캔버스에 선으로 그릴 수 있음
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // 캔버스 내부에서만 마우스 x, y 좌표 사용
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    console.log("creating path in", x, y);
    ctx.beginPath(); // CanvasRenderingContext2D.beginPath(): Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
    ctx.moveTo(x, y); // CanvasRenderingContext2D.moveTo() Moves the starting point of a new sub-path to the (x, y) coordinates.
  } else {
    console.log("creating line in", x, y);
    ctx.lineTo(x, y); // CanvasRenderingContext2D.lineTo(): Connects the last point in the current sub-path to the specified (x, y) coordinates with a straight line.
    ctx.stroke(); // CanvasRenderingContext2D.stroke(): Strokes the current sub-paths with the current stroke style.
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling == true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
