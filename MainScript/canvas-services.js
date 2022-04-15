"use strict";
const gTouchEvs = ["touchstart", "touchmove", "touchend"];

let isSelect = false;
let gStartPos;
function addMouseListeners() {
  gElCanvas.addEventListener("mousemove", onMove);
  gElCanvas.addEventListener("mousedown", onDown);
  gElCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener("touchmove", onMove);
  gElCanvas.addEventListener("touchstart", onDown);
  gElCanvas.addEventListener("touchend", onUp);
}
function addKeyBoardListeners() {
  window.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey) {
      switch (ev.key) {
        case "ArrowDown":
          moveSelectedNext();
          break;
        case "ArrowUp":
          moveSelectedPre();
          break;
      }
      return;
    }
    switch (ev.key) {
      case "ArrowDown":
        MoveTextDown();
        break;
      case "ArrowUp":
        MoveTextUp();
        break;
      case "ArrowRight":
        MoveTextRight();
        break;
      case "ArrowLeft":
        MoveTextLeft();
        break;
      case "Backspace":
        delTxtLine();
        break;
      case "Delete":
        delTxtLine();
        break;
      case "+":
        addTxtLine();
        break;
    }
  });
}

function resizeCanvas() {
  gElCanvas.width = 0;
  gElCanvas.height = 0;
  const elContainer = document.querySelector(".canvas-conrainer");
  DynamicSize = elContainer.offsetWidth;
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetWidth;
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onDown(ev) {
  ev.target.style.cursor = "grabbing";
  let pos = getEvPos(ev);
  var selectedIdx = gMeme.lines.findIndex((line) => {
    // where clicked  {x start img<x> x end img}  {x start img<x> x end img}
    return (
      pos.x > line.coord.x &&
      pos.x < line.coord.xEnd &&
      pos.y > line.coord.y &&
      pos.y < line.coord.yEnd
    );
  });
  if (selectedIdx !== -1) {
    gMeme.selectedLineIdx = selectedIdx;
    isSelect = true;
    var currImgObj = getImgById(gMeme.selectedImgId);
    renderMeme(currImgObj, gCurrImg);
    gStartPos = pos; //// click in 100 100 = start next click will initiate in the move function
  }
}

function onMove(ev) {
  if (!isSelect) return;
  /// 106 103 For Example
  var pos = getEvPos(ev);
  const dx = pos.x - gStartPos.x;
  const dy = pos.y - gStartPos.y;
  moveLineOnClick(dx, dy);
  gStartPos = pos;
  var currImgObj = getImgById(gMeme.selectedImgId);
  renderMeme(currImgObj, gCurrImg);
}
function onUp(ev) {
  gElCanvas.style.cursor = "grab";
  isSelect = false;
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
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    };
  }
  return pos;
}
function moveLineOnClick(x, y) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += x;
  gMeme.lines[gMeme.selectedLineIdx].pos.y += y;
}
