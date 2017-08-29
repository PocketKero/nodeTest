const fs = require('fs');
const csv = require('fast-csv');
const jconv = require('jconv');
const xlsx = require('xlsx');
const path = require('path');

module.exports = function(inputPath, outputPath)
{
	const workbook = xlsx.readFile(inputPath); // Excelファイルを読み込む
	const sheetName = workbook.SheetNames[0]; // Excelファイルの最初のシートの名前を取得
	const worksheet = workbook.Sheets[sheetName]; // Excelファイルの最初のシートを読み込む

	const csv = xlsx.utils.sheet_to_csv(worksheet); // ExcelデータをCSV形式で取得

	const buffer = jconv.convert(csv, 'UTF8', 'SJIS'); // UTF-8からShift-JISへ文字コードを変換
	fs.writeFileSync(path.resolve(outputPath, 'entry_sheet.csv'), buffer); // ファイルを書き出し
}
