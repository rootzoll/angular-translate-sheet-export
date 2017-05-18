# Angular Translate Google Sheet Export

A Google Sheets script that will take a sheet in a specific format and return JSON i18N data to be used for the "Angular Translate" framework (Angular 1.x) - see https://github.com/angular-translate/angular-translate

We use it in our konfetti project to work with our translators together in a easy way. We invite them to the Google Sheet, they can add their translations in a familiar environment and we use the script to export the translation and paste them into our konfetti project: https://github.com/rootzoll/konfetti-app

## Installing

1. Import the sheet `template.xlsx` to Google Docs and open it.
2. Go to **Tools -> Script Editor**
3. Copy `Code.js`, make your edits if needed, and **Save**.

## Usage

1. Go to **I18N Export** and select your **Get JSON Data**.
2. Copy JSON text and use https://jsonformatter.org to format it,
3. For every language take the content object and copy into the matching file in konfetti project diretory `www/locale`


## License: MIT

Created by COBE http://cobeisfresh.com/ simplified and adapted by Christian Rotzoll

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
