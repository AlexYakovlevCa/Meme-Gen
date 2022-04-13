"use strict";
var gCurrImg;
var gElCanvas;
var gCtx;

function initPage() {
  gElCanvas = document.querySelector("canvas");
  gCtx = gElCanvas.getContext("2d");
  renderImgs();
  addEventListeners();
  resizeCanvas();
}


function addEventListeners() {
  addOtherListeners();
  addMouseListeners();
  addTouchListeners();
}

// function renderCanvas() {
  //   gCtx.fillStyle = "rgb(160 60 57 / 48%)";
  //   gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
  // }
  
  // function uploadImg() {
    //   const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    //   openModal();
    //   // A function to be called if request succeeds
//   function onSuccess(uploadedImgUrl) {
  //     const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
//     document.querySelector(
  //       ".user-msg"
  //     ).innerText = `Your photo is available here:\n ${uploadedImgUrl}`;
  
  //     document.querySelector(".share-container").innerHTML = `
//           <a class="btn" onclick="closeModal()" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
//              Share   
//           </a>`;
//   }
//   doUploadImg(imgDataUrl, onSuccess);
// }

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
  
  
function onClickedImg(img) {
  
  let imgForMeme = getImgById(img.id)
  // console.log(imgForMeme)
  renderMeme(imgForMeme,img)
  gCurrImg = img

}

