// var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var DynamicSize = 440

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Somthing",
      size: 50,
      align: "center",
      color: "red",
      stroke: "black",
      pos: {
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
};
function getSizeForCanvas(){
  return DynamicSize
}

function renderMeme(Objimg, elImg) {
  // var isSelect = false
  drawImgSuper(elImg,Objimg);
  
}

function displayGallery(){
  document.querySelector(".gallery-container").style.display = "grid";
  document.querySelector(".about-me.middle-layout").style.display = "flex";
  document.querySelector(".canvas-modal").style.display = "none";
}

function drawText(line) {
  // gCtx.font = '48px serif';
  // gCtx.fillText(txt, x, y);
  gCtx.textBaseline = "middle";
  gCtx.textAlign = line.align;
  gCtx.lineWidth = 2;
  gCtx.fillStyle = line.color;
  gCtx.font = line.size + "px" + " serif";
  gCtx.strokeStyle = line.stroke;
  console.log(line.pos.x, +line.pos.y)
  gCtx.strokeText(line.txt, +line.pos.x, +line.pos.y);
  gCtx.fillText(line.txt, +line.pos.x, +line.pos.y)
}
function drawImgSuper(elImg,Objimg) {
  var img = new Image();
  img.src = elImg.src;
  
  img.onload = () => {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  gMeme.selectedImgId = Objimg.id;
  
  gMeme.lines.forEach((line,idx) => {
    drawText(line);
    CanvasForDownload = gElCanvas.toDataURL();
    setTimeout(()=>{
      if(gMeme.selectedLineIdx===idx){
        drawRect(line);
  
      }
    },0)
    
  });
  };
}
function MoveTextRight() {
  var line = gMeme.lines[gMeme.selectedLineIdx];
  var textWidth = getCurrMoveValue(line.txt);
  if (line.pos.x + textWidth / 2 <= gElCanvas.width - 5) {
    line.pos.x += 10;
    var currImgObj = getImgById(gMeme.selectedImgId);
    renderMeme(currImgObj, gCurrImg);
  }
}
function MoveTextCenter() {
  var line = gMeme.lines[gMeme.selectedLineIdx];
  line.pos.x = gElCanvas.width / 2;
  var currImgObj = getImgById(gMeme.selectedImgId);

  renderMeme(currImgObj, gCurrImg);
}
function MoveTextLeft() {
  var line = gMeme.lines[gMeme.selectedLineIdx];
  var textWidth = getCurrMoveValue(line.txt);
  console.log(textWidth, line.pos.x);

  if (line.pos.x - textWidth / 2 >= 5) {
    line.pos.x -= 10;
    var currImgObj = getImgById(gMeme.selectedImgId);
    renderMeme(currImgObj, gCurrImg);
  }
}
function MoveTextDown() {
  var line = gMeme.lines[gMeme.selectedLineIdx];
  if (line.pos.y < 475) {
    line.pos.y += 25;
    console.log(line.pos.y);
    var currImgObj = getImgById(gMeme.selectedImgId);
    renderMeme(currImgObj, gCurrImg);
  }
}
function MoveTextUp() {
  var line = gMeme.lines[gMeme.selectedLineIdx];
  if (line.pos.y > 25) {
    line.pos.y -= 25;
    console.log(line.pos.y);
    var currImgObj = getImgById(gMeme.selectedImgId);
    renderMeme(currImgObj, gCurrImg);
  }
}
function ChangeCurrInput(value) {
  var line = gMeme.lines[gMeme.selectedLineIdx];
  line.txt = value;
  var currImgObj = getImgById(gMeme.selectedImgId);
  renderMeme(currImgObj, gCurrImg);
}
function moveSelectedPre() {
  gMeme.selectedLineIdx++;

  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  }
  var currImgObj = getImgById(gMeme.selectedImgId);
  renderMeme(currImgObj, gCurrImg)
  console.log(gMeme.selectedLineIdx);
}
function moveSelectedNext() {
  gMeme.selectedLineIdx--;

  if (gMeme.selectedLineIdx < 0) {
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
  }

  console.log(gMeme.selectedLineIdx);
  var currImgObj = getImgById(gMeme.selectedImgId);
  renderMeme(currImgObj, gCurrImg)
}
function addTxtLine() {
  var newLine = {
    txt: "Somthing",
    size: 50,
    align: "center",
    color: "red",
    stroke: "black",
    pos: {
      x: 250, // center
      y: 225,
    },
  };
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  var currImgObj = getImgById(gMeme.selectedImgId);
  renderMeme(currImgObj, gCurrImg);
}

function delTxtLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  
  if(gMeme.lines.length===0){
     console.log('none left...')
  }
  gMeme.selectedLineIdx=0
  
  var currImgObj = getImgById(gMeme.selectedImgId);
  renderMeme(currImgObj, gCurrImg);
}
function getCurrMoveValue(txt) {
  return gCtx.measureText(txt).width;
}
function drawRect(line) {
  gCtx.beginPath()
  var textWidth = getCurrMoveValue(line.txt);
  var textHight = line.size;
  gCtx.lineWidth = 4;
  gCtx.rect(
    line.pos.x - textWidth / 2 - 10,
    line.pos.y - textHight / 2 - 10,
    textWidth + 20,
    textHight + textHight / 4
  );
  // gCtx.fillStyle = 'none';
  // gCtx.fillRect((line.pos.x-textWidth/2-10),line.pos.y-10,(line.pos.x+textWidth/2), line.pos.y+textHight+10);
  gCtx.strokeStyle = "black";

  gCtx.stroke();
}

function onChangetxtColor(colorValue){
console.log(colorValue)
gMeme.lines[gMeme.selectedLineIdx].color = colorValue
var currImgObj = getImgById(gMeme.selectedImgId);
    renderMeme(currImgObj, gCurrImg);
}
function onChangeStrokeColor(colorValue){
  gMeme.lines[gMeme.selectedLineIdx].stroke = colorValue
  

}
function onIncFont(){
  gMeme.lines[gMeme.selectedLineIdx].size += 1
  var currImgObj = getImgById(gMeme.selectedImgId);
    renderMeme(currImgObj, gCurrImg);
}
function onDecFont(){
  gMeme.lines[gMeme.selectedLineIdx].size -= 1
  var currImgObj = getImgById(gMeme.selectedImgId);
  renderMeme(currImgObj, gCurrImg);
}