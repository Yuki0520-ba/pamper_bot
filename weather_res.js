// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';
var https = require('https');

//ユーザーの郵便番号を直書きで設定する
var user_adress='102-0071';


module.exports = (robot) => {

  //open wether Mapから今日の天気情報を取得してボットに返す
  robot.respond(/おはよう$/i, (res1) => {
    var http = require('http');

    var zip=user_adress+',jp';
    var units = 'metric';
    var APIKEY = "87e3d13be8431fcf4ccedf1479ff2064";
    var URL = 'http://api.openweathermap.org/data/2.5/weather?zip='+ zip +'&units='+ units +'&lang=ja&'+'&appid='+ APIKEY;
    
    http.get(URL, function(res) {
      var body = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('data', function(chunk) {
        res = JSON.parse(body);
        res1.send("今日の"+String(res.name)+"の天気は　"+String(res.weather[0].description)+"　です!");        
      });
    }).on('error', function(e) {
      console.log(e.message);
    });
  });
  
  

  //open wether Mapから３時間ごとの天気情報を取得
  //9:00時点の天気情報を切り出してbotに返す

  robot.respond(/おやすみ$/i, (res1) => {
    //api叩く
    var http = require('http');
    var zip=user_adress+',jp';
    var units = 'metric';
    var APIKEY = "87e3d13be8431fcf4ccedf1479ff2064";
    var URL = 'http://api.openweathermap.org/data/2.5/forecast?zip='+ zip +'&units='+ units +'&lang=ja&'+'&appid='+ APIKEY;
    
    http.get(URL, function(res) {
      var body = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('data', function(chunk) {
        res = JSON.parse(body);

        //明日の日付を文字列で生成
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var tomorrow_year = tomorrow.getFullYear();
        //月だけ+1する
        var tomorrow_month = 1 + tomorrow.getMonth();
        var tomorrow_date=tomorrow.getDate();

        tomorrow_month = ('0' + tomorrow_month).slice(-2);
        tomorrow_date = ('0' + tomorrow_date).slice(-2);

        var format_str = 'YYYY-MM-DD';
        format_str = format_str.replace(/YYYY/g, tomorrow_year);
        format_str = format_str.replace(/MM/g, tomorrow_month);
        format_str = format_str.replace(/DD/g, tomorrow_date);

        //明日の９時時点の天気を返す
        for(var n=0;n<res.cnt;n++){
          if(res.list[n].dt_txt.match(format_str)){
            if(res.list[n].dt_txt.match("09:00:00"))
              res1.send("明日の朝の天気は "+res.list[n].weather[0].description+" です!");
            }
          }  
        
      });
    }).on('error', function(e) {
      console.log(e.message);
    });
  });
  
};








