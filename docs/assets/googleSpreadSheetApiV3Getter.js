const gSpreGet = (inputValue) => {
    let inputValueSplit = inputValue.split("/");
    if (inputValueSplit[2] === "docs.google.com" && inputValueSplit[3] === "spreadsheets") {
        var url = "https://spreadsheets.google.com/feeds/worksheets/" + inputValueSplit[5] + "/public/basic?alt=json";
        console.log(url);
      return fetch(url)
        .then((response) => {return response.json()})
     } else {
      console.log("スプレッドシートのURLではありません")
      return false;
    }
}