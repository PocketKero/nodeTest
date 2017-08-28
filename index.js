const fs = require('fs');
const check = require('./check.js');

const inputPath = process.argv[2];

try
{
	if(fs.statSync(inputPath))
	{
		check(inputPath);
	}
}
catch(e)
{
	throw e;
}

