var data = {};　//JSON型で初期化
var fs=require('fs');
 
data["name"] = "tarooou";
data["absent_count"] = 0;
data["max_absent"] = 5;
 
json_data = JSON.stringify(data);
//console.log(json_data);

//テキストファイルで出力
/*fs.writeFile('text.txt', "hoge hoge", function(err, result){
if(err) console.log('error',err);
});
*/

//JSON型で出力
fs.writeFile('test.json', JSON.stringify(data,null,'    '),function(err,result){
if(err) console.lot('error',err)
});

fs.readFile('./test.json','utf8',function(err,list){
	if(err) console.log("読み込みエラー",err)
//JSON型に変換して表示
	json_data=JSON.parse(list);
	console.log(json_data.name);
	json_data.name="hanaooo"
	console.log(json_data.name);
});

