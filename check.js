const fs = require('fs');
const csv = require('csv');
const parse = csv.parse;
const iconv = require('iconv-lite');
const xlsx = require('xlsx');
const byline = require('byline');
const csvParse = require('csv-parse/lib/sync');
const CSV = require('comma-separated-values');
const async = require('async');

// csv -> Array[Object]
function parseCSVtoArray(csv) {
  let result = [];
  csv
    .fromString(csv, {headers: true})
    .on('data', function(data) {
      result.push(data);
    })
    .on('end', function() {
      console.log('end');
    });
  return result;
}

var __dirname;
var fileName;

var datas = [];
var fileNames = [];

var parseCount = 0;
var fileCount = 0;
var nowCount = 0;

var str = new String("");

fileNames = fs.readdirSync('.');

for(var i = 0; i < fileNames.length; i++){
	if(fileNames[i] != 'check.js' && fileNames[i] != 'node_modules'){
		fileNames[fileCount++] = fileNames[i];
	}
}

async.forever(
    	(callback) => { /* 処理1 */
        	fs.createReadStream(fileNames[nowCount++] + '/entry_sheet.csv')
			.pipe(parse(function(err, data){
				//console.log('CSVファイルの行数=' + data.length);
				try{
					if(fs.statSync(fileNames[parseCount] + '/entry_sheet.csv')){
						__dirname = fileNames[parseCount];
						parseCount++;
						console.log(__dirname);
						console.log("エントリーシート検出");
						data.forEach(function(element, index, array){
							datas[index] = element;
						});
						var str = new String(datas[14]);
						var extention = str.substring(str.indexOf('.'), str.indexOf(',,'));
						fileName = str.substring(str.indexOf('名')+2, str.indexOf(extention));
						var strExt = new String(datas[16]);
						var ext = strExt.substring(strExt.indexOf('.'), strExt.indexOf(',,'));
						datas = [];
						if(fileName == __dirname && fs.statSync(__dirname + '/' + fileName + extention) && ext == extention){
							console.log("　　あってます");
						}else{
							if(fileName != __dirname){
								console.log("　　ディレクトリ名とエントリーシートに書かれたファイル名が一致しないよ");
								console.log("　　ディレクトリ名…" + __dirname);
								console.log("　　ファイル名…" + fileName);
							}
							try{
								if(!fs.statSync(__dirname + '/' + fileName + extention));
							}
							catch(e){
								console.log("　　エントリーシートの表記と実際のファイルの拡張子が一致しないよ");
							}
							if(ext != extention){
								console.log("　　エントリーシート15行目と17行目の拡張子が一致しないよ");
								console.log("　　15行目の拡張子…" + extention);
								console.log("　　17行目の拡張子…" + ext);
							}
						}
					}
				}
				catch(e){
					console.log("読み取り失敗");
					console.log(e);
				}
			}));
        	// 引数nullのcallbackを呼び出すと、再度「処理1」が呼ばれる
        	if(nowCount != fileCount) callback(null);
        	// callbackにnull以外の値を渡すと「処理2」に移り、ループが終了する
        	else callback('end');
    	},
    	(end) => { /* 処理2 */
    	
    	}
);
