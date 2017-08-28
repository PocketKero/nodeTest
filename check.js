const fs = require('fs');
const csv = require('csv');
const parse = csv.parse;
const iconv = require('iconv-lite');
const xlsx = require('xlsx');
const csvSync = require('csv-parse/lib/sync');
const async = require('async');
const path = require('path')

module.exports = (uploadDir) => {

	var __dirname;
	var fileName;

	var fileNames = [];

	var nowCount = 0;

	var str = new String("");

	fileNames = fs.readdirSync(path.resolve(uploadDir));

	fileNames = fileNames.filter((fileName) => {
		return fileName !== 'check.js' && fileName !== 'node_modules' && !/^\..+$/.test(fileName)
	})

	async.forever((callback) => { /* 処理1 */
		let data = fs.readFileSync(path.resolve(uploadDir, fileNames[nowCount], 'entry_sheet.csv'));
		let buffer = new Buffer(data, 'binary');
		data = csvSync(iconv.decode(buffer, "SJIS"));
		//console.log('CSVファイルの行数=' + data.length);
		try {
			if (fs.statSync(path.resolve(uploadDir, fileNames[nowCount], 'entry_sheet.csv'))) {
				__dirname = fileNames[nowCount];
				// console.log(__dirname);
				// console.log("エントリーシート検出");
				let str = new String(data[14][1]);
				let fileName = str.substring(0, str.indexOf('.'));
				let fileExt = str.substring(str.indexOf('.'));
				let ext = new String(data[16][1]);
				if (fileName == __dirname && fs.statSync(path.resolve(uploadDir, __dirname, fileName+fileExt)) && fileExt == ext) {
					// console.log("　　あってます");
				} else {
					if (fileName != __dirname) {
						throw new Error("　　ディレクトリ名とエントリーシートに書かれたファイル名が一致しないよ" + "\n　　ディレクトリ名…" + __dirname + "\n　　ファイル名…" + fileName);
					}
					try {
						if (!fs.statSync(path.resolve(uploadDir, __dirname, fileName+fileExt)));
					}
					catch (e) {
						throw new Error("　　エントリーシートの表記と実際のファイルの拡張子が一致しないよ");
					}
					if (fileExt != ext) {
						throw new Error("　　エントリーシート15行目と17行目の拡張子が一致しないよ" + "\n　　15行目の拡張子…" + fileExt + "\n　　17行目の拡張子…" + ext);
					}
				}
			}
		}
		catch (e) {
			throw e
		}

		nowCount++
		// 引数nullのcallbackを呼び出すと、再度「処理1」が呼ばれる
		if (nowCount != fileNames.length) callback(null);
		// callbackにnull以外の値を渡すと「処理2」に移り、ループが終了する
		else callback('end');
	}, (end) => {
		/* 処理2 */
	});

}