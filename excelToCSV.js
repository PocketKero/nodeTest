const fs = require('fs')
const csv = require('fast-csv')
const jconv = require( 'jconv' )
const xlsx = require('xlsx')
const utils = xlsx.util

// csv -> Array[Object]
function parseCSVtoArray(csv) {
  let result = []
  csv
    .fromString(csv, {headers: true})
    .on('data', function(data) {
      result.push(data)
    })
    .on('end', function() {
      console.log('end')
    })
  return result
}

var importPath = "../../H26収集コンテンツ_ファイル一覧（管理番号No）20170728.xlsx";

var workbook = xlsx.readFile(importPath) // Excelファイルを読み込む
var sheetName = workbook.SheetNames[0] // Excelファイルの最初のシートの名前を取得
var worksheet = workbook.Sheets[sheetName] // Excelファイルの最初のシートを読み込む

var csv = xlsx.utils.sheet_to_csv(worksheet) // ExcelデータをCSV形式で取得
let array = yield parseCSVtoArray(csv) // データを使いやすくするために配列に変換

for (let arr of array ) {
  console.log(arr['hoge'])

  // 処理 …
}
