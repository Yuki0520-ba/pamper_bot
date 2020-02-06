//JSON型で初期化
var data = {};
var fs=require('fs');
 
data["zipcode"] = "000-0000";
data["use_line"] = "hoge";
data["class1_abs_count"] = 0;
data["class2_abs_count"] = 0;
data["class3_abs_count"] = 0;
data["class1_att_count"] = 0;
data["class2_att_count"] = 0;
data["class3_att_count"] = 0;
data["max_absent"] = 4;

 
json_data = JSON.stringify(data);
//console.log(json_data);

//テキストファイルで出力
/*fs.writeFile('text.txt', "hoge hoge", function(err, result){
if(err) console.log('error',err);
});
*/

//JSON型で出力
fs.writeFile('./u_info.json', JSON.stringify(data,null,'    '),function(err,result){
if(err) console.log('error',err)
});

//JSONファイルの読み込み
fs.readFile('./u_info.json','utf8',function(err,list){
	if(err) console.log("読み込みエラー",err)
//JSON型に変換して表示
	json_data=JSON.parse(list);
	console.log(json_data.zipcode);
});

