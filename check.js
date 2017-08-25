const fs = require('fs');
const csv = require('csv');
const parse = csv.parse;
const iconv = require('iconv-lite');
const xlsx = require('xlsx');
const csvParse = require('csv-parse/lib/sync');
const async = require('async');
const path = require('path')

module.exports = (uploadDir) => {

	var __dirname;
	var fileName;

	var datas = [];
	var fileNames = [];

	var nowCount = 0;

	var str = new String("");

	fileNames = fs.readdirSync(path.resolve(uploadDir));

	fileNames = fileNames.filter((fileName) => {
		return fileName !== 'check.js' && fileName !== 'node_modules' && !/^\..+$/.test(fileName)
	})

	async.forever((callback) => { /* 処理1 */
		fs.createReadStream(path.resolve(uploadDir, fileNames[nowCount], 'entry_sheet.csv'))
			.pipe(iconv.decodeStream('SJIS'))
			.pipe(iconv.encodeStream('UTF-8'))
			.pipe(parse(function (err, data) {
				//console.log('CSVファイルの行数=' + data.length);
				try {
					if (fs.statSync(path.resolve(uploadDir, fileNames[nowCount], 'entry_sheet.csv'))) {
						__dirname = fileNames[nowCount];
						// console.log(__dirname);
						// console.log("エントリーシート検出");
						data.forEach(function (element, index, array) {
							datas[index] = element;
						});
						var str = new String(datas[14]);
						console.log(str)
						var extention = str.substring(str.indexOf('.'), str.indexOf(',,'));
						fileName = str.substring(str.indexOf('名') + 2, str.indexOf(extention));
						var strExt = new String(datas[16]);
						var ext = strExt.substring(strExt.indexOf('.'), strExt.indexOf(',,'));
						datas = [];
						if (fileName == __dirname && fs.statSync(__dirname + '/' + fileName + extention) && ext == extention) {
							// console.log("　　あってます");
						} else {
							if (fileName != __dirname) {
								throw new Error("　　ディレクトリ名とエントリーシートに書かれたファイル名が一致しないよ" + "\n　　ディレクトリ名…" + __dirname + "\n　　ファイル名…" + fileName);
							}
							try {
								if (!fs.statSync(__dirname + '/' + fileName + extention));
							}
							catch (e) {
								throw new Error("　　エントリーシートの表記と実際のファイルの拡張子が一致しないよ");
							}
							if (ext != extention) {
								throw new Error("　　エントリーシート15行目と17行目の拡張子が一致しないよ" + "\n　　15行目の拡張子…" + extention + "\n　　17行目の拡張子…" + ext);
							}
						}
					}
				}
				catch (e) {
					throw e
				}
			}));

		nowCount++
		// 引数nullのcallbackを呼び出すと、再度「処理1」が呼ばれる
		if (nowCount != fileNames.length) callback(null);
		// callbackにnull以外の値を渡すと「処理2」に移り、ループが終了する
		else callback('end');
	}, (end) => {
		/* 処理2 */
	});
}