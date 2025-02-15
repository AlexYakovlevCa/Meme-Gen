// var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var DynamicSize = 440
var currImgObj
var gKeywordSearchCountMap = {}
var gSavedMemes = []
var gMeme = {}

function renderMeme(Objimg, elImg) {
  currImgObj = Objimg
  drawImgSuper(elImg, Objimg)
}

function displayGallery() {
  document.querySelector('.gallery-container').style.display = 'grid'
  document.querySelector('.about-me.middle-layout').style.display = 'flex'
  document.querySelector('.nav.middle-layout').style.display = 'flex'
  document.querySelector('.canvas-modal').style.display = 'none'
}

function drawText(line) {
  gCtx.beginPath()
  gCtx.textBaseline = 'middle'
  gCtx.textAlign = line.align
  gCtx.lineWidth = 2
  gCtx.fillStyle = line.color
  gCtx.font = line.size + 'px' +' '+ line.font
  gCtx.strokeStyle = line.stroke
  gCtx.strokeText(line.txt, +line.pos.x, +line.pos.y)
  gCtx.fillText(line.txt, +line.pos.x, +line.pos.y)
}

function drawImgSuper(elImg, Objimg) {
  var img = new Image()
  img.src = elImg.src

  img.onload = () => {
    gCtx.beginPath()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    gMeme.selectedImgId = Objimg.id

    gMeme.lines.forEach((line, idx) => {
      if (line.txt) {
        drawText(line)
        var textWidth = getCurrMoveValue(line.txt)
        var textHight = line.size
        line.coord = {
          x: line.pos.x - textWidth / 2 - 10,
          y: line.pos.y - textHight / 2 - 10,
          xEnd: line.pos.x + textWidth / 2,
          yEnd: line.pos.y + textHight / 2 - 10,
        }
      } else if (!line.txt) {
        drawEmote(line)
        line.coord = {
          x: line.pos.x - line.size,
          y: line.pos.y - line.size,
          xEnd: line.pos.x + line.size,
          yEnd: line.pos.y + line.size,
        }
      }

      CanvasForDownload = gElCanvas.toDataURL('image/jpeg')
      gMeme.screenshot = CanvasForDownload
      setTimeout(() => {
        if (gMeme.selectedLineIdx === idx) {
          drawRect(line)
        }
      }, 0)
    })
  }
}
function MoveTextRight() {
  var line = gMeme.lines[gMeme.selectedLineIdx]
  var textWidth = getCurrMoveValue(line.txt)
  if (line.pos.x + textWidth / 2 <= gElCanvas.width - 5) {
    line.pos.x += 10
    renderMeme(currImgObj, gCurrImg)
  }
}
function MoveTextCenter() {
  var line = gMeme.lines[gMeme.selectedLineIdx]
  line.pos.x = gElCanvas.width / 2

  renderMeme(currImgObj, gCurrImg)
}
function MoveTextLeft() {
  var line = gMeme.lines[gMeme.selectedLineIdx]
  var textWidth = getCurrMoveValue(line.txt)

  if (line.pos.x - textWidth / 2 >= 5) {
    line.pos.x -= 10
    renderMeme(currImgObj, gCurrImg)
  }
}
function MoveTextDown() {
  var line = gMeme.lines[gMeme.selectedLineIdx]
  if (line.pos.y < 475) {
    line.pos.y += 25
    renderMeme(currImgObj, gCurrImg)
  }
}
function MoveTextUp() {
  var line = gMeme.lines[gMeme.selectedLineIdx]
  if (line.pos.y > 25) {
    line.pos.y -= 25
    renderMeme(currImgObj, gCurrImg)
  }
}
function ChangeCurrInput(value) {
  var line = gMeme.lines[gMeme.selectedLineIdx]
  if (!line.txt) return
  line.txt = value
  renderMeme(currImgObj, gCurrImg)
}
function moveSelectedPre() {
  gMeme.selectedLineIdx++

  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  }
  renderMeme(currImgObj, gCurrImg)
}
function moveSelectedNext() {
  gMeme.selectedLineIdx--

  if (gMeme.selectedLineIdx < 0) {
    gMeme.selectedLineIdx = gMeme.lines.length - 1
  }

  renderMeme(currImgObj, gCurrImg)
}
function addEmote(elEmote) {
  var newLine = {
    emote: elEmote.src,
    size: 50,
    align: 'center',
    color: 'red',
    stroke: 'black',
    pos: {
      x: gElCanvas.width / 2, // center
      y: gElCanvas.height / 2,
    },
    coord: {
      x: gElCanvas.width / 2,
      y: gElCanvas.width / 2,
      xEnd: 40,
      yEnd: 40,
    },
  }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  gCtx.drawImage(
    elEmote,
    newLine.pos.x,
    newLine.pos.y,
    newLine.size,
    newLine.size
  )
  renderMeme(currImgObj, gCurrImg)
}

function addTxtLine() {
  var newLine = {
    txt: 'Somthing',
    size: 50,
    align: 'center',
    color: 'red',
    stroke: 'black',
    font: 'impact',
    pos: {
      x: gElCanvas.width / 2, // center
      y: gElCanvas.height / 2,
    },
  }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  renderMeme(currImgObj, gCurrImg)
}

function delTxtLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  if (gMeme.lines.length === 0) {
  }
  gMeme.selectedLineIdx = 0

  renderMeme(currImgObj, gCurrImg)
}
function getCurrMoveValue(txt) {
  return gCtx.measureText(txt).width
}
function drawRect(line) {
  gCtx.beginPath()
  gCtx.lineWidth = 4

  var textWidth = line.txt ? getCurrMoveValue(line.txt) : line.size
  var textHight = line.size
  line.txt
    ? gCtx.rect(
        line.pos.x - textWidth / 2 - 10,
        line.pos.y - textHight / 2 - 10,
        textWidth + 20,
        textHight + textHight / 4
      )
    : gCtx.rect(
        // line.pos.x - textWidth*0.2 ,
        // line.pos.y - textHight*0.2,
        // textWidth ,
        // textHight
        line.pos.x,
        line.pos.y,
        line.size,
        line.size
      )

  // gCtx.fillStyle = 'none';
  // gCtx.fillRect((line.pos.x-textWidth/2-10),line.pos.y-10,(line.pos.x+textWidth/2), line.pos.y+textHight+10);
  gCtx.strokeStyle = 'black'

  gCtx.stroke()
}

function onChangetxtColor(colorValue) {
  gMeme.lines[gMeme.selectedLineIdx].color = colorValue
  renderMeme(currImgObj, gCurrImg)
}
function onChangeStrokeColor(colorValue) {
  gMeme.lines[gMeme.selectedLineIdx].stroke = colorValue
}
function changeFontStyle(font){
  gMeme.lines[gMeme.selectedLineIdx].font = font
}
function onIncFont() {
  gMeme.lines[gMeme.selectedLineIdx].size += 1
  renderMeme(currImgObj, gCurrImg)
}
function onDecFont() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 1
  renderMeme(currImgObj, gCurrImg)
}

function drawEmote(line) {
  var img = new Image()
  img.src = line.emote
  gCtx.drawImage(img, line.pos.x, line.pos.y, line.size, line.size)
}

function createMeme() {
  gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    screenshot: 0,
    memeId: makeId(),
    lines: [
      {
        txt: 'Somthing',
        size: 50,
        align: 'center',
        color: 'red',
        stroke: 'black',
        font: 'impact',
        pos: {
          x: DynamicSize / 2,
          y: 50,
        },
      },
      {
        txt: 'Somthing',
        size: 50,
        align: 'center',
        color: 'red',
        stroke: 'black',
        font: 'impact',
        pos: {
          x: DynamicSize / 2,
          y: DynamicSize - 50,
        },
      },
    ],
  }
}

function loadMemesFromStorage() {
  const savedMems = loadFromStorage(KEY)

  if (savedMems) gSavedMemes = savedMems
  else gSavedMemes = []
}
function saveMeme() {
  const savedMemeIdx = gSavedMemes.findIndex(
    (meme) => meme.memeId === gMeme.memeId
  )
  if (savedMemeIdx === -1) gSavedMemes.push(gMeme)
  else gSavedMemes[savedMemeIdx] = gMeme
  saveToStorage(KEY, gSavedMemes)
  loadSavedMemesToGallery()
}

function loadSavedMemesToGallery() {
  const elMemeGallery = document.querySelector('.meme-container')
  loadMemesFromStorage()

  if (!gSavedMemes) return
  var htmlStr = gSavedMemes.map(
    (meme) => `
  <div  class = "saved-meme-img" >
  <img data-id = "${meme.memeId}" src="${meme.screenshot}" onclick="onClickedMemeImg(this)" />
  <button class = "delete-saved-meme" onclick ="onDeleteSavedMeme('${meme.memeId}')"></button>
</div>
  `
  )

  elMemeGallery.innerHTML = htmlStr.join('')
  // elMemeGallery.style.display = "none";
}
