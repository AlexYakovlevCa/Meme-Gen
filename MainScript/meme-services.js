var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Somthing",
      size: 50,
      align: "center",
      color: "red",
      pos: {
        x: 250,
        y: 50,
      },
    },
    {
      txt: "Somthing",
      size: 50,
      align: "center",
      color: "red",
      pos: {
        x: 250,
        y: 400,
      },
    },
  ],
};

function renderMeme(Objimg, elImg) {
  var isSelect = false
  drawImgSuper(elImg);
  gMeme.selectedImgId = Objimg.id;
  gMeme.lines.forEach((line,idx) => {
    drawText(line);
    if(gMeme.selectedLineIdx===idx){
      
      drawRect(line);

    }
  });
}

function saveAndRestoreExample() {
  gCtx.font = "50px Arial";
  gCtx.strokeStyle = "green";
  gCtx.strokeText("Saving the context", 10, 50);
  gCtx.save();
  // gCtx.font = '30px david';
  // gCtx.strokeStyle = 'black';
  // gCtx.strokeText('Switching to something else', 10, 100);
  // // gCtx.restore();
  // gCtx.strokeText('Back to previous', 10, 150);
}
function drawText(line) {
  // gCtx.font = '48px serif';
  // gCtx.fillText(txt, x, y);
  gCtx.textBaseline = "middle";
  gCtx.textAlign = line.align;
  gCtx.lineWidth = 2;
  gCtx.fillStyle = "blue";
  console.log(line.size);
  gCtx.font = line.size + "px" + " serif";
  gCtx.strokeStyle = line.color;
  gCtx.strokeText(line.txt, +line.pos.x, +line.pos.y);
}
function drawImgSuper(elImg) {
  var img = new Image();
  img.src = elImg.src;
  document.querySelector(".gallery-container").style.display = "none";
  document.querySelector(".canvas-modal").style.display = "grid";
  // resizeCanvas() dosent WORKKKKKKKKKK ///////////////////////////////////////////
  // img.onload = () => {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  // };
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
  console.log(line.pos.x, line.pos.y, textWidth, textHight);
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