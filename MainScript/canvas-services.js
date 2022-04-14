"use strict";
let isClick = false
function addMouseListeners() {
  //     const elUploadBtn = elBody.querySelector('.upload-btn').addEventListener('click',uploadImg)
  //     const eldownloadBtn = elBody.querySelector('.download-btn')
  //   const elWidthValue = elBody.querySelector("input[name = width]");
  //   const elsaveBtn = elBody
  //     .querySelector(".save-btn")
  //     .addEventListener("click", saveCanvas);
  //   const elClearBtn = elBody
  //     .querySelector(".clear-btn")
  //     .addEventListener("click", onClearCanvas);
  //   elWidthValue.addEventListener("mousemove", onChangeWidthValue);
  gElCanvas.addEventListener("mousemove", onMove);
  gElCanvas.addEventListener("mousedown", onDown);
  gElCanvas.addEventListener("mouseup", onUp);
}
function addOtherListeners() {
  //   const elColorValue = elBody.querySelector("input[name = color]");
  //   elColorValue.addEventListener("change", onChangeColorValue);
  //   const elTypeValue = elBody.querySelector("input[name = type]");
  //   elTypeValue.addEventListener("change", onChangeTypeValue);
}
function addTouchListeners() {
//   const elWidthValue = elBody.querySelector("input[name = width]");
//   elWidthValue.addEventListener("touchmove", onChangeWidthValue);

  gElCanvas.addEventListener("touchmove", onMove);
  gElCanvas.addEventListener("touchstart", onDown);
  gElCanvas.addEventListener("touchend", onUp);
}

function resizeCanvas() {
  gElCanvas.width = 0
  gElCanvas.height = 0
  const elContainer = document.querySelector(".canvas-conrainer");
  console.log(elContainer.offsetWidth,DynamicSize )
  DynamicSize = elContainer.offsetWidth
  gElCanvas.width = elContainer.offsetWidth 
  gElCanvas.height = elContainer.offsetWidth 
  console.log(elContainer.offsetWidth)
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  console.log("cleard!");
  // initPage();
}

function onDown(ev) {
  // let pos = getEvPos(ev)
  console.log(ev.offsetX, window.innerWidth);
//   gLastJump = getEvPos(ev);
  isClick = true;
//   document.body.style.cursor = "grabbing";
}

function onMove(ev) {
  // if() return
//   let pos = getEvPos(ev);
// console.log('moveee',ev.target)
  if (
    isClick & (ev.offsetX > 5) &&
    ev.offsetX < gElCanvas.width - 5 &&
    ev.offsetY > 5 &&
    ev.offsetY < gElCanvas.width - 5
  ) {
    // const distance = getDistance(pos);
    // draw(ev, distance);
    // gLastJump = getEvPos(ev);
  } else isClick = false;
}
function onUp(ev) {
  isClick = false;
}

