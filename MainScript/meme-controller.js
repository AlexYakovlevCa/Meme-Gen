"use strict";
var gCurrImg;
var gElCanvas;
var gCtx;
var CanvasForDownload;
var renderHelper = 1


function initPage() {
  gElCanvas = document.querySelector("canvas");
  gCtx = gElCanvas.getContext("2d");
  
  renderImgs();
  addEventListeners();
}


function addEventListeners() {
  addOtherListeners();
  addMouseListeners();
  addTouchListeners();
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
  
function onGalleryClick(){
  displayGallery()
}
function onClickedImg(img) {
  
  let imgForMeme = getImgById(img.id)
  // console.log(imgForMeme)
  document.querySelector(".gallery-container").style.display = "none";
  document.querySelector(".about-me.middle-layout").style.display = "none";
  document.querySelector(".canvas-modal").style.display = "flex";
  resizeCanvas() 
  renderMeme(imgForMeme,img)
  
  window.addEventListener('resize',()=>{
    renderHelper++
    if(renderHelper%5===0){
      console.log('did',renderHelper)
      resizeCanvas()
      gMeme.lines.forEach((meme,idx)=>{
          meme.pos.x = DynamicSize/2
        
         if(idx===1){
          meme.pos.y = DynamicSize-meme.size
        }
        else if(idx>1){
          meme.pos.y=DynamicSize/2
        }
      })
      renderMeme(imgForMeme,img)
    }
    /*    pos: {
        x: getSizeForCanvas()/2,
        y: 50,
      },
    },
    {
      txt: "Somthing",
      size: 50,
      align: "center",
      color: "red",
      stroke: "black",
      pos: {
        x: getSizeForCanvas()/2,
        y: getSizeForCanvas()-50,
      },
    },
  ],
}; */

  })
  gCurrImg = img
}

function onShareModal(elBtn){
document.querySelector('.share-modal').style.display = 'flex'
}
function onCloseShareModal(elModal){
  
  if (elModal) elModal.style.display = 'none'
  else document.querySelector('.share-modal').style.display= 'none'
}
function downloadThisImg(elLink){
    const data = CanvasForDownload
    elLink.href = data;
    elLink.download = 'my-canvas';
  
}


 