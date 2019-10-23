const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// canvas 픽셀을 설정해야만 캔버스에 선으로 그릴 수 있음
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "White";
// CanvasRenderingContext2D.fillRect(): Draws a filled rectangle at(x, y) position whose size is determined by width and height.
// x, y, width, height
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event) {
  // 캔버스 내부에서만 마우스 x, y 좌표 사용
  const x = event.offsetX;
  const y = event.offsetY;
  // !painting: painting이 false라면 함수를 실행
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

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

// 색상 변경
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// 선 굵기 변경
if (range) {
  range.addEventListener("input", handleRangeChange);
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault(); // 마우스 우클릭 방지
}

// 사진 저장
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image; // href: image link
  link.download = "PaintJS_[EXPORT]"; // download: file name
  link.click();
}

// event 발생 리스트
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 마우스를 캔버스 위에서 움직이는 event 발생
  canvas.addEventListener("mousedown", startPainting); // 마우스를 캔버스 위에서 클릭 상태를 유지하는 event 발생
  canvas.addEventListener("mouseup", stopPainting); // 마우스를 캔버스 위에서 클릭 취소하는 event 발생
  canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스 밖으로 나가는 event 발생
  canvas.addEventListener("click", handleCanvasClick); // 마우스를 캔버스 위에서 한번 클릭하는 event 발생
  canvas.addEventListener("contextmenu", handleCM);
}
