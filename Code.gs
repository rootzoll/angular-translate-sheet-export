/*
localizable-sheet-script
A Google Sheets script that will take a sheet in a specific format and return javascript JSON localization files.
https://github.com/rootzoll/localizable-sheet-script
License: MIT
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// **** MENU OPTION ****

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('I18N Export')
      .addItem('angular-translate JS file', 'exportSheet')
      .addToUi();
}

function exportSheet() {
  
  Logger.log("Export Sheet");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rowsData = getRowsData_(sheet, {});

  var strings = [];
  for (var i = 0; i < 2; i++) {
    strings.push();
  }
  return displayTexts_(makeString(rowsData));
}


// **** UI Elements ****

function makeListBox(app, name, items) {
  var listBox = app.createListBox().setId(name).setName(name);
  listBox.setVisibleItemCount(1);
  var cache = CacheService.getPublicCache();
  var selectedValue = cache.get(name);
  for (var i = 0; i < items.length; i++) {
    listBox.addItem(items[i]);
    if (items[1] == selectedValue) {
      listBox.setSelectedIndex(i);
    }
  }
  return listBox;
}

function displayTexts_(texts) {
  var app = UiApp.createApplication().setTitle('JSON EXPORT');
  app.add(app.createTextArea().setWidth('100%').setHeight('300px').setId('json').setName('json'));
  app.getElementById('json').setText(texts); 
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  ss.show(app);
  return app; 
}

function makeString(object) {
  if (typeof object == "undefined") return "makeString: OBJECT is NULL";
  
  var i18nData = "";
   for(var i=1; i<object[0].length; i++) {
     
     // add lang meta data
     var langData = "";
     if (i>1) langData += ",";
     langData += ' { "locale" : "'+object[2][i]+'",\n "displayname": "'+object[1][i]+'",\n "direction": "'+object[3][i]+'",\n "translations" : {\n';
     
     // add lang translations
     for(var j=4; j<object.length; j++) {
       if (j>4) langData += ",\n";
       langData += '  "'+object[j][0]+'" : "'+object[j][i]+'"';
     }
     
    langData += '  }\n }';
    i18nData += langData;
   } 
  
  // TODO: get all authors (remove doubles and emails)
  var credits = "TODO";
  
  var exportString = '// copy this content (CTRL+A) and place it into file www/locale/i18n-data.js\n';
  exportString = '// MAKE NO PERMANENT CHANGES TO THIS FILE - ALWAYS EDIT Google Sheet AND EXPORT AGAIN\n';
  exportString += 'window.i18nData = {\n"i18n": [\n'+i18nData+'],\n"credits" : "'+credits+'"}';
  
  return exportString;
}

// **** Data Export ****

function getRowsData_(sheet, options) {
  
  // get max available range
  var dataRange = sheet.getRange(2, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  
  // find maxed used cells
  var data = dataRange.getValues();
  var maxRow = 2;
  var maxCol = 1;
 
  // get max col
  while ((maxCol<sheet.getMaxColumns()) && (!isCellEmpty_(data[3][maxCol]))) {
    maxCol++;
  }
  
  // get max rows
  for (var i = 0; i < data.length; ++i) {
    if (!isCellEmpty_(data[i][1])) {
      maxRow = i;
    } else {
      break;
    }
  }  
  
  // get just used range
  var dataRange = sheet.getRange(2, 1, maxRow+1, maxCol);
  return dataRange.getValues();
}

function isCellEmpty_(cellData) {
  return typeof (cellData) == "string" && cellData == "";
}
