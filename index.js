const fs = require('fs');
const rewriteCSV = require('./rewriteCSV.js');

const inputPath = process.argv[2];
const filename = process.argv[3];

try
{
	if(fs.statSync(inputPath))
	{
		rewriteCSV(inputPath, filename);
	}
}
catch(e)
{
	throw e;
}

