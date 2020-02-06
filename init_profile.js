'use strict';

//JSON型で初期化
var fs = require('fs');
var json_data;

fs.readFile('./u_info.json','utf8',function(err,list){
	if(err) console.log("読み込みエラー",err);
//JSON型に変換して表示
	json_data=JSON.parse(list);
	console.log(json_data);
});


//JSON型で出力
// fs.writeFile('./u_info.json', JSON.stringify(data,null,'    '),function(err,result){
// if(err) console.log('error',err)
// });

module.exports = (robot) => {
	//robot.enter((res) => {
	robot.join((res) => {
		res.send(`はじめまして!こんにちは！`);
		res.send(`住所の郵便番号をおしえてね!(例：123-4567)`);
		robot.respond(/(.*)/, (res) => {
			if(res.message.text.match(/-/)){
				res.send(res.match[1]+"だね！");
				json_data["zipcode"] = res.match[1];
        fs.writeFile('./u_info.json', JSON.stringify(json_data,null,'    '),function(err,result){
        if(err) console.log('error',err);
        });
				res.send(`利用路線をおしえてね!(例：総武線)`);
				robot.respond(/(.*)/, (res) => {
					if(res.message.text.match(/線/)){
						res.send(res.match[1]+"だね！");
						json_data["use_line"] = res.match[1];
            // fs.writeFile('./u_info.json', json_data,function(err,result){
            // if(err) console.log('error',err);
            // });
            fs.writeFile('./u_info.json', JSON.stringify(json_data,null,'    '),function(err,result){
            if(err) console.log('error',err);
            });
					}
				});
			}
      //JSON型で出力

      //JSONファイルの読み込み
      fs.readFile('./u_info.json','utf8',function(err,list){
      	if(err) console.log("読み込みエラー",err);
      //JSON型に変換して表示
      	json_data=JSON.parse(list);
      	console.log(json_data);
      });
		});
	});
}

//console.log(json_data);

//テキストファイルで出力
/*fs.writeFile('text.txt', "hoge hoge", function(err, result){
if(err) console.log('error',err);
});
*/
//
