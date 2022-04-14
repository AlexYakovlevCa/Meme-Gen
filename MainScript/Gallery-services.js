'use strict'

var gImgId = 1
var gImgs = _createImgs()
var gCuimg = gImgs.length
var gFilter

_createImgs()

function getImagesForDisplay(){
    return gImgs
}



function getFiltersForDisplay(){
     
    //  var filters =gImgs.map(img=>{
    //     return [...img.keywords.forEach(imgs => {
    //         return [...img]
    //     })]
    // })
    var set = new Set()
    gImgs.forEach(img =>{
        // set.add(...img.keywords) 
        img.keywords.forEach(key=>set.add(key)) 
    })

    // var uniqueFilters = new Set(...filters)
    return set
}

function _createImgs(){

    return[
        createImg("img/1.jpg",["funny", "usa"]),
        createImg("img/2.jpg",["cute", "pet"]),
        createImg("img/3.jpg",["cute", "baby", "pet"]),
        createImg("img/4.jpg",["cute", "pet"]),
        createImg("img/5.jpg",["funny", "baby"]),
        createImg("img/6.jpg",["funny", "OgMeme"]),
        createImg("img/7.jpg",["funny", "baby"]),
        createImg("img/8.jpg",["funny", "Tv"]),
        createImg("img/9.jpg",["funny", "baby",'evil']),
        createImg("img/10.jpg",["funny", "usa"]),
        createImg("img/11.jpg",["love"]),
        createImg("img/12.jpg",["funny", "Tv"]),
        createImg("img/13.jpg",["funny", "Tv"]),
        createImg("img/14.jpg",["funny", "Tv"]),
        createImg("img/15.jpg",["funny", "Tv"]),
        createImg("img/16.jpg",["funny", "Tv"]),
        createImg("img/17.jpg",["funny", "Mother Russia"]),
        createImg("img/18.jpg",["funny", "Tv"])
    ]
}

function createImg(url,keywords){
    return{
        id:gImgId++,
        url,
        keywords

    }
}

function getImgById(selectedImgId){

return gImgs.find(img=>img.id ===parseInt(selectedImgId))
}

function getElementByClass(classOfEl){
return document.querySelector(`${classOfEl}`)
}
