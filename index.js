const fs = require('fs');
const xlsxToCSV = require('./xlsxToCSV.js');
const rewriteCSV = require('./rewriteCSV.js');
const check = require('./check.js');

const inputPath = process.argv[2];
const outputPath = process.argv[3];

try
{
	fs.statSync(inputPath);
}
catch(e)
{
	throw e;
}

xlsxToCSV(inputPath, outputPath);
//rewirteCSV(inputPath);
//check(inputPath);
