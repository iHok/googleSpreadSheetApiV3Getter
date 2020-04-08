const gSpreGetSheets = (inputValue) => {
    let inputValueSplit = inputValue.split("/");
    if (inputValueSplit[2] === "docs.google.com" && inputValueSplit[3] === "spreadsheets") {
      return fetch("https://spreadsheets.google.com/feeds/worksheets/" + inputValueSplit[5] + "/public/basic?alt=json")
        .then((response) => {return response.json()})
    } else {
      console.log("this URL is not GoogleSpreadSheets.")
      return false;
    }
}

const gSpreGetCells = (inputValue) => {
    return fetch(inputValue)
      .then((response) => {return response.json()})
}

const changeSelectLists = async (inputValue) => {
  let selectJson = (await gSpreGetSheets(inputValue)).feed.entry;
  let selectBox = document.querySelector("#sel1");
  let selectBoxHTML = `<option value="">選択して下さい</option>`;
  for (var i = 0; i < selectJson.length; i++) {
    selectBoxHTML = selectBoxHTML + `<option value="https://spreadsheets.google.com/feeds/cells/${inputValue.split("/")[5]}/${selectJson[i].link[1].href.split("/")[6]}/public/values?alt=json">${selectJson[i].content.$t}</option>\n`
  }
  selectBox.innerHTML = '';
  selectBox.insertAdjacentHTML('afterbegin', selectBoxHTML);
}

const jsonToArray = (cellsJson) => {
  let cellsArray = new Array(Number(cellsJson[Object.keys(cellsJson).length - 1].row));
  let cellsColMax = Math.max.apply(null,cellsJson.map(e => e.col));
  for (i = 0; i < cellsArray.length ; i++) {
    cellsArray[i] = new Array(cellsColMax);
  }
  cellsJson.forEach(e => {
    cellsArray[e.row-1][e.col-1] = e.$t;    
  });
  return cellsArray; 
}

const createTable = async (sheetValue) => {
  let inputValueSplit = sheetValue.split("/");
  if (inputValueSplit[2] === "spreadsheets.google.com" && inputValueSplit[4] === "cells") {
    let cellsArray = jsonToArray((await gSpreGetCells(sheetValue)).feed.entry.map(e => e.gs$cell));
    let table = document.querySelector("#table");
    let tableHTMLtd = ``;
    let tableHTMLtr = ``;
    for (let i = 0; i < cellsArray.length; i++) {
      tableHTMLtd = ``;
      for (let j = 0; j < cellsArray[i].length; j++) {
        tableHTMLtd = `${tableHTMLtd}<td>${cellsArray[i][j] ? cellsArray[i][j] : ''}</td>`;
      }
      tableHTMLtr = `${tableHTMLtr}\n<tr>${tableHTMLtd}</tr>`
    }
    table.innerHTML = '';
    table.insertAdjacentHTML('afterbegin', tableHTMLtr);
  } else {
    console.log("this URL is not cells of GoogleSpreadSheetsAPIv3.")
    return false;
  }
}

window.onload = function () {
  changeSelectLists(document.querySelector("#spreadsheetsURL").value);
};