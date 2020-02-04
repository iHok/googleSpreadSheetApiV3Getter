const changeSelectLists = (inputValue) => {
    document.getElementById("sel1").innerHTML = '<option value="">選択して下さい</option>';
    let retrunJson = gSpreGet(inputValue);
    console.log("retrunJson");
    console.log(gSpreGet(inputValue));
    for (var i = 0; i < retrunJson.feed.entry.length; i++) {
        let op = document.createElement("option");
        op.value = inputValueSplit[5]+"/"+retrunJson.feed.entry[i].link[1].href.split("/")[6];  //value値
        op.text = retrunJson.feed.entry[i].content.$t;   //テキスト値
        document.getElementById("sel1").appendChild(op);
    }
  }
  
  const createTable = (sheetValue) => {
    // 値(数値)から値(value値)を取得
    const str = "https://spreadsheets.google.com/feeds/cells/" + sheetValue + "/public/values?alt=json";
    console.log(str);
    const result = document.getElementById("result");
    document.getElementById("table").innerHTML = '';
    fetch(str)
      .then((response) => response.json())
      .then((json) => {
        //      console.log(Object.keys(json.feed.entry[1].filter(gsx => gsx.test(/gsx/))));
        //      console.log(Object.keys(json.feed.entry[0]).filter(gsx => /gsx\$/.test(gsx)));
        //.filter(gsx => /gsx\$/.test(gsx))
        console.log("json");
        jsonFeedEntryToTable(json.feed.entry);
  
        let tableData = (new Array(Number(json.feed.gs$rowCount.$t))).fill("").map(() => (new Array(Number(json.feed.gs$colCount.$t))).fill(""));
        console.log(tableData);
   
        for (let i = 0; i < json.feed.entry.length; i++) {
          //        table.push();
          //        console.log(json.feed.entry[i]);
  
  
  
          let tr = document.createElement("tr");
          let td = document.createElement("td");
          td.appendChild(document.createTextNode(json.feed.entry[i].content.$t));  //value値
          //            li.text = json.feed.entry[i].content.$t;   //テキスト値
          document.getElementById("table").appendChild(tr).appendChild(td);
        }
  
      });
    }
  
  window.onload = function () {
    changeSelectLists(document.querySelector("#spreadsheetsURL").value);
  };