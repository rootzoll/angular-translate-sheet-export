# Translate Google Sheet Export

A Google Sheets script that will take a sheet in a specific format and return JSON i18N data to be used for the "Angular Translate" framework (Angular 1.x) - see https://github.com/angular-translate/angular-translate and also Java i18n properties.

We use it in our konfetti project to work with our translators together in a easy way. We invite them to the Google Sheet, they can add their translations in a familiar environment and we use the script to export the translation and paste them into our konfetti App https://github.com/rootzoll/konfetti-app and the Konfetti Server https://github.com/rootzoll/konfetti-api

## Installing

1. Import the sheet `template.xlsx` to Google Docs and open it.
2. Go to **Tools -> Script Editor**
3. Copy `Code.js`, make your edits if needed, and **Save**.
4. Reload Sheet

## Usage with Konfetti Project

1. Go to **I18N Export** and select as **angular-translate JS file**.
2. Copy the content (with CTRL+A) and paste it into the file `/www/locale/i18n-data.js` of Konfetti App
1. Go to **I18N Export** and select as **java properties**.
2. Copy the content (with CTRL+A) and paste it into the matching files of Konfetti Server
3. Done :)

## Video Tutorials showing how to use in Konfetti Project

TRANSLATOR PERSPEKTIVE : Helping on App Translation -> https://youtu.be/_CzJtsV7zA0
PROGRAMMER PERSPEKTIVE: App/Server Translations for Programmers --> https://youtu.be/5lSLC2RUsjc

## How to use it in your own project

Take a look how the https://github.com/rootzoll/konfetti-app is doing it in detail. To summarize: The file `/www/locale/i18n-data.js` will be loaded as normal JS script in the index.html - so all your translation data gets stored in global `window.i18nData` variable. Then in app.js config the app iterates thru all available languages and injects them into the `$translateProvider`.

## License: MIT

Created by COBE http://cobeisfresh.com/ simplified and adapted by Christian Rotzoll for the Konfetti project

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
