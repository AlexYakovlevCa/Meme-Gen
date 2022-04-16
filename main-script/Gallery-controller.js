"use strict";



function renderImgs(filter) {
console.log(filter)
  var imgs = filter?getImagesForDisplay(filter):getImagesForDisplay()
  var elGallContainer = document.querySelector(".gallery-container");
  const strHtml = imgs.map(
    (img) => `
<div class = "img-for-display" >
<img id ="${img.id}" class="img-num-${img.id}"src="imgs/${img.id}.jpg" onclick="onClickedImg(this)" />
</div>
`
  );
  elGallContainer.innerHTML = strHtml.join("");
}

function onDeleteSavedMeme (id){
const deleteMemeIdx = gSavedMemes.findIndex(
  (meme) => meme.memeId === id
);
gSavedMemes.splice(deleteMemeIdx,1)
saveToStorage(KEY, gSavedMemes)
loadSavedMemesToGallery()
}