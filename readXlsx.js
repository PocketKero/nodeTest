const xlsx = require('xlsx');

module.exports = function(inputData, filter)
{
	const xlsxData = xlsx.readFileSync(inputData);
	const sheetNames = xlsxData.SheetNames;
	const worksheet = xlsxData.Sheets[sheetNames[0]]; //一番最初のシートを読み込む

	//正しいデータ・シートか確認。違ったらエラーを返す
	if(worksheet['P1'].w !== 'MCC分野（大分類）')
	{
		throw new Error("異なるファイルを読み込んでいます");
	}

	return worksheet; //ワークシートの情報を返す
}
