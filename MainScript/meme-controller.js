"use strict";
var gCurrImg;
var gElCanvas;
var gCtx;
var CanvasForDownload;
var isSelected = false;

function initPage() {
  gElCanvas = document.querySelector("canvas");
  gCtx = gElCanvas.getContext("2d");
  renderFilters()
  renderInputFilterOpts()
  renderImgs(false);
  addEventListeners();
}

function addEventListeners() {
  addMouseListeners();
  addTouchListeners();
  addKeyBoardListeners()
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append("img", imgDataUrl);

  fetch("//ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log("Got back live url:", url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}

function onGalleryClick() {
  document.querySelector('body').classList.remove('menu-open')
  displayGallery();
  // clearCanvas()
}
function onClickedImg(img) {
  let imgForMeme = getImgById(img.id);
  document.querySelector(".gallery-container").style.display = "none";
  document.querySelector(".about-me.middle-layout").style.display = "none";
  document.querySelector(".nav.middle-layout").style.display = "none";
  document.querySelector(".canvas-modal").style.display = "flex";

  setTimeout(()=>{
  resizeCanvas();

    renderMeme(imgForMeme, img);

  },0)

  window.addEventListener("resize", () => {
    resizeCanvas();
    gMeme.lines.forEach((meme, idx) => {
      meme.pos.x = DynamicSize / 2;

      if (idx === 1) {
        meme.pos.y = DynamicSize - meme.size;
      } else if (idx > 1) {
        meme.pos.y = DynamicSize / 2;
      }
    });
    renderMeme(imgForMeme, img);
  });
  gCurrImg = img;
}

function onShareModal(elBtn) {
  document.querySelector(".share-modal").style.display = "flex";
}
function onCloseShareModal(elModal) {
  if (elModal) elModal.style.display = "none";
  else document.querySelector(".share-modal").style.display = "none";
}
function downloadThisImg(elLink) {
  const data = CanvasForDownload;
  elLink.href = data;
  elLink.download = "my-canvas";
}
function OnEmoteClick(emote){
  addEmote(emote)
}
function onFilterSearch(isItem,filterElment,ev) {
  if(ev)ev.preventDefault()
  
  const filterInput = document.querySelector('.search-field')
  if(isItem){
    let value = filterElment.innerText
    gKeywordSearchCountMap[value] = gKeywordSearchCountMap[value]? gKeywordSearchCountMap[value]+1:1  

    filterElment.style.fontSize = `${gKeywordSearchCountMap[value]+16}px`  
  }
  
  var filter =  isItem? filterElment.innerText:filterInput.value
  
  if(filter.length)renderImgs(filter.toLowerCase())

}

function toggleMenu(){
  document.querySelector('body').classList.toggle('menu-open')
}