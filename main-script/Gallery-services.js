"use strict";

const FILTERS = 5;
var gImgId = 1;
var gImgs = _createImgs();
var gCuimg = gImgs.length;
var gFilter;
var uniqueFilter;

_createImgs();

function getImagesForDisplay(isFilter) {
  if (isFilter) {
    if(isFilter==='all') return gImgs
    return gImgs.filter((img) => {
      return img.keywords.includes(isFilter);
    });
  }
  return gImgs;
}

function getFiltersForDisplay() {
  var set = new Set();
  gImgs.forEach((img) => {
    img.keywords.forEach((key) => set.add(key));
  });
  uniqueFilter = [...set];

  return [...set].slice(0, FILTERS);
}

function _createImgs() {
  return [
    createImg("img/1.jpg", ["funny", "usa"]),
    createImg("img/2.jpg", ["cute", "pet"]),
    createImg("img/3.jpg", ["cute", "baby", "pet"]),
    createImg("img/4.jpg", ["cute", "pet"]),
    createImg("img/5.jpg", ["funny", "baby"]),
    createImg("img/6.jpg", ["funny", "OgMeme"]),
    createImg("img/7.jpg", ["funny", "baby"]),
    createImg("img/8.jpg", ["funny", "tv"]),
    createImg("img/9.jpg", ["funny", "baby", "evil"]),
    createImg("img/10.jpg", ["funny", "usa"]),
    createImg("img/11.jpg", ["love"]),
    createImg("img/12.jpg", ["funny", "tv"]),
    createImg("img/13.jpg", ["funny", "tv"]),
    createImg("img/14.jpg", ["funny", "tv"]),
    createImg("img/15.jpg", ["funny", "tv"]),
    createImg("img/16.jpg", ["funny", "tv"]),
    createImg("img/17.jpg", ["funny", "mother russia"]),
    createImg("img/18.jpg", ["funny", "tv"]),
  ];
}

function createImg(url, keywords) {
  return {
    id: gImgId++,
    url,
    keywords,
  };
}

function getImgById(selectedImgId) {
  return gImgs.find((img) => img.id === parseInt(selectedImgId));
}

function getElementByClass(classOfEl) {
  return document.querySelector(`${classOfEl}`);
}
function renderFilters() {
  gFilter = getFiltersForDisplay();
  const filterContainer = document.querySelector(".filters-container");
  var strHtml = gFilter.map(
    (filter) =>
      `<a class="filter-item" onclick="onFilterSearch(true,this)">${filter}</a>`
  );
  filterContainer.innerHTML = strHtml.join("");
}
function renderInputFilterOpts() {
  const elSearchOpt = document.querySelector(".searchlist");
  let strHtml = `<option value="All"></option>`
  strHtml += uniqueFilter.map(
    (filter) => `
    <option value="${filter}"></option>
    `
  );
  elSearchOpt.innerHTML = strHtml
}
