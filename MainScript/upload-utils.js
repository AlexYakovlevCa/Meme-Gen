'use strict'
// *** Upload a picture to the canvas. ***
function uploadImg() {
  const imgDataUrl = CanvasForDownload;
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);

    document.querySelector(
      ".share-me"
    ).href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`;

    console.log(document.querySelector(".share-me"));
  }
  doUploadImg(imgDataUrl, onSuccess);
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
function loadImageFromInput(ev, onImageReady) {
  // document.querySelector(".share-container").innerHTML = "";
  var reader = new FileReader();

  reader.onload = (event) => {
    console.log("onload");
    var img = new Image();
    img.src = event.target.result;
    console.log(img.src, img);
    img.onload = onImageReady.bind(null, img);
  };
  console.log("after");
  reader.readAsDataURL(ev.target.files[0]);
}

function renderImgg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
function onImgInput(ev) {
  loadImageFromInput(ev, renderImgg);
}
