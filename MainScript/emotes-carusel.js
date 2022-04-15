'use strict'
var gEmotes = _createEmotes()
const SIZE = 3
var startIdx = 0

function onCarouselLeft(){
    if(startIdx===0) return
    startIdx--
    renderEmotes()
}
function onCarouselRight(){
    if(startIdx>gEmotes.length-startIdx) return
    startIdx++
    renderEmotes()
}

renderEmotes()
function renderEmotes(){
    const elEmoteContainer = document.querySelector('.emotes-carousel')
    let emotes = getEmotesForDisplay()
    const strHtml = emotes.map((emote)=>`
    <img class"carousel-img" src="emotes/${emote}"onclick="OnEmoteClick(this)"/>
    
    `)
    elEmoteContainer.innerHTML=strHtml.join('')
}


function getEmotesForDisplay(){
return gEmotes.slice(startIdx,SIZE+startIdx)
}
function _createEmotes(){
    let allEmotes = []
    for(let i= 0;i<8;i++){
        let emote = createEmote(i+1)
        allEmotes.push(emote)
    }
    return allEmotes
}

function createEmote(idx){
    return `emote-${idx}.png`
}
//    
//                 <img  src="emotes/emote-1.png" onclick="OnEmoteClick(this)"/>
//                 <img  src="emotes/emote-2.png" onclick="OnEmoteClick(this)"/>