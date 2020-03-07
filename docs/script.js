const gSpreGetSheets = (inputValue) => {
    let inputValueSplit = inputValue.split("/");
    if (inputValueSplit[2] === "docs.google.com" && inputValueSplit[3] === "spreadsheets") {
        var url = "https://spreadsheets.google.com/feeds/worksheets/" + inputValueSplit[5] + "/public/basic?alt=json";
        console.log(url);
      return fetch(url)
        .then((response) => {return response.json()})
     } else {
      console.log("this is not URL of GoogleSpreadSheets.")
      return false;
    }
}

const gSpreGetCells = (inputValue) => {
  let inputValueSplit = inputValue.split("/");
  console.log("inputValue");
  console.log(inputValue);
  var url = "https://spreadsheets.google.com/feeds/cells/" + inputValue + "/public/values?alt=json";
  console.log(url);
  return fetch(url)
    .then((response) => {return response.json()})
}