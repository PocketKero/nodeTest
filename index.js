const fs = require('fs');
const path = require('path');
const readXlsx = require('./readXlsx.js');
const xlsxToCSV = require('./xlsxToCSV.js');
const rewriteCSV = require('./rewriteCSV.js');
const check = require('./check.js');

const inputPath = process.argv[2];
const inputData = './fileList.xlsx';

try
{
	fs.statSync(inputPath);
}
catch(e)
{
	throw e;
}

//fs.mkdirSync(path.resolve(inputPath, "upload"));

let data = readXlsx(inputData, 0);
console.log(data);

//xlsxToCSV(inputPath, outputPath);
//rewirteCSV(inputPath);
//check(inputPath);
