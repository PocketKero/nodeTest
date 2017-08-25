const fs = require('fs')
const csvSync = require('csv-parse/lib/sync');
const iconv = require('iconv-lite');


module.exports = function(inputPath, filename)
{
	let str = "";
	let data = fs.readFileSync(inputPath);
	let inputBuffer = new Buffer(data, 'binary');
	let res = csvSync(iconv.decode(inputBuffer, "SJIS"));
	if(res[14][0] == '電子ファイル名')
	{
		res[14][1] = filename;
		res.forEach(row => str += row.join(',') + '\n');
		let outputBuffer = iconv.encode(str, "SJIS");
		fs.writeFile(inputPath, outputBuffer);
	}
	else
	{
		throw new Error("参照するレコードが違います");
	}
};

