const fs = require('fs');
const csv = require('csv');
const parse = csv.parse;
const iconv = require('iconv-lite');
const csvSync = require('csv-parse/lib/sync');
const async = require('async');
const path = require('path')

module.exports = (uploadDir) => {

	const dirNames = fs.readdirSync(path.resolve(uploadDir)).filter((dirName) => {
		return dirName !== 'check.js' && dirName !== 'node_modules' && !/^\..+$/.test(dirName)
	})

	dirNames.forEach((dirName) => {
		let csvData = fs.readFileSync(path.resolve(uploadDir, dirName, 'entry_sheet.csv'));
		let buffer = new Buffer(csvData, 'binary');
		csvData = csvSync(iconv.decode(buffer, "SJIS"));
		//console.log('CSVファイルの行数=' + data.length);
		try {
			fs.statSync(path.resolve(uploadDir, dirName, 'entry_sheet.csv'));
		}
		catch (e) {
			throw e;
		}
			
		// console.log(dirName);
		// console.log("エントリーシート検出");
		const fileExt = path.extname(csvData[14][1]);
		const fileName = path.basename(csvData[14][1], fileExt);
		const ext = csvData[16][1].split('／');	

		if (fileName != dirName) {
			throw new Error("　　ディレクトリ名とエントリーシートに書かれたファイル名が一致しないよ" + "\n　　ディレクトリ名…" + dirName + "\n　　ファイル名…" + fileName);
		}
		try {
			if (!fs.statSync(path.resolve(uploadDir, dirName, fileName+fileExt)));
		}
		catch (e) {
			throw new Error("　　エントリーシートの表記と実際のファイルの拡張子が一致しないよ");
		}
		if (!ext.some((element) => (element == fileExt))) {
			throw new Error("　　エントリーシート15行目と17行目の拡張子が一致しないよ" + "\n　　15行目の拡張子…" + fileExt + "\n　　17行目の拡張子…" + ext);
		}
	});

}