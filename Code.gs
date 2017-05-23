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
      .addItem('angular-translate JS file', 'exportSheetJS')
      .addItem('java properties', 'exportSheetJava')
      .addToUi();
}

function exportSheetJS() {
  exportSheet("js");
}

function exportSheetJava() {
  exportSheet("java");
}

function exportSheet(style) {
  
  Logger.log("Export Sheet");
  var result = "n/a"; 
  var ss, sheet, rowsData;
  
  try {
    
    ss = SpreadsheetApp.getActiveSpreadsheet();
    
    try {
      
      sheet = ss.getActiveSheet();
      
      try {
        
        rowsData = getRowsData_(sheet, {});

        try {
          
          result = makeString(rowsData, style);
          
        } catch (e) {
          var result = "error on makeString(rowsData, style); "+JSON.stringify(e); 
        }
        
      } catch (e) {
        var result = "error on getRowsData_(sheet, {}); "+JSON.stringify(e); ; 
      }   
      
    
    } catch (e) {
      var result = "error on ss.getActiveSheet(); "+JSON.stringify(e); ; 
    }

    
  } catch (e) {
      var result = "error on SpreadsheetApp.getActiveSpreadsheet() "+JSON.stringify(e); ; 
  }
 
   
  return displayTexts_(result);
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

function makeString(object, style) {
  if (typeof object == "undefined") return "makeString: OBJECT is NULL";
  
  // ## JAVASCRIPT STYLING ##
  
  if (style=="js") {
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
   var credits = getCreditNamesFromRow(object[0].slice(1));
  
   var exportString = '// copy this content (CTRL+A) and place it into file www/locale/i18n-data.js\n';
   exportString = '// MAKE NO PERMANENT CHANGES TO THIS FILE - ALWAYS EDIT Google Sheet AND EXPORT AGAIN\n';
   exportString += 'window.i18nData = {\n"i18n": [\n'+i18nData+'],\n"credits" : "'+credits+'"}';
  
   return exportString;
  } else 
  
  // ## JAVA STYLING ##
    
  if (style=="java") {
   
    var exportString = '// \n';
    exportString = '# COPY (CTRL+A) TO FILES on KONFETTI SERVER src/main/resources/i18n \n';

    for(var i=0; i<object[0].length; i++) {
   
      // add lang meta data
      var langData = "";
      if (i>0) {
        
        // language special version
        langData = "### messages_"+object[2][i]+".properties ###############\n# make sure this file is UTF-8 encoded\n";    
        langData += 'lang.direction='+object[3][i]+'\n';
        for(var j=4; j<object.length; j++) {
          langData += object[j][0]+'='+object[j][i]+'\n';
        }
        
      } else {
        
        // base file
        langData = "### messages.properties ###############\n# make sure this file is UTF-8 encoded\n";
        langData += 'lang.direction=ltr\n';
        for(var j=4; j<object.length; j++) {
          langData += object[j][0]+'='+object[j][1]+'\n';
        }
        
      }
      
      exportString += langData+"\n";
    } 
    
  
    return exportString;
    
  } else {
    return "STYLE NOT KNOWN ("+style+")";
  }
    
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
    if (!isCellEmpty_(data[i][0])) {
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

// make sure no duplicates are in array
function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

// return array of author names - without emails
function getCreditNamesFromCell(cellString) {
	var authors = cellString.split(",");
  for (var g=0; g < authors.length; g++) {
  	authors[g] = authors[g].trim();
    authors[g] = authors[g].split("(")[0].trim();
  }
  return authors;
}

// get unique author names from row data
function getCreditNamesFromRow(cellStringArray) {
  var authors = [];
  for (var k=0; k<cellStringArray.length; k++) {
  	authors = authors.concat(getCreditNamesFromCell(cellStringArray[k]));
  }
  authors = arrayUnique(authors);
	return authors.join(", ");
}
