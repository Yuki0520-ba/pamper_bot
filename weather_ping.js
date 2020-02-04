// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';
var https = require('https');


module.exports = (robot) => {
  robot.respond(/PING$/i, (res) => {
    res.send('PONG');
  });
  
  robot.respond(/ADAPTER$/i, (res) => {
    res.send(robot.adapterName);
  });

  robot.respond(/ECHO (.*)$/i, (res) => {
    res.send(res.match[1]);
  });

  robot.respond(/TIME$/i, (res) => {
    res.send(`Server time is: ${new Date()}`);
  });


  /////test/////
  robot.respond(/hoge$/i, (res) => {
    res.send('hoge hoge');
  });

  robot.respond('map', (res) => {
    res.send(`Your location is ${res.json.place} at ${res.json.lat}, ${res.json.lng}`);
  });


  robot.respond(/num (.*)$/i, (res) => {
    var c=new calc();
    var num=c.add(parseInt(res.match[1]));
    console.log("sample",num)
    res.send(String(num));
  });



  //open wether Mapから天気情報を取得してボットに返す
  robot.respond(/おはよう$/i, (res1) => {
    var http = require('http');

    var zip='102-0071,jp';
    
    //var zip=res1.match[1]+',jp';
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

        //res1.send(String(res.name));
        res1.send("今日の天気は　"+String(res.weather[0].description)+"　です!");
        
      });
    }).on('error', function(e) {
      console.log(e.message);
    });
  });
  
  robot.enter((res) => {
    res.send(`Hi! ${res.message.user.name}`);
  });



  

  //open wether Mapから天気情報を取得してボットに返す
  robot.respond(/おやすみ$/i, (res1) => {
    var http = require('http');

    var zip='102-0071,jp';
    
    //var zip=res1.match[1]+',jp';
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
        
        for(var n=0;n<res.cnt;n++){
          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var tomorrow_date=tomorrow.getDate();
          console.log(typeof(tomorrow_date));
        

          
        }


        //res1.send(String(res.name));
        //res1.send("今日の天気は　"+String(res.weather[0].description)+"　です!");
        
      });
    }).on('error', function(e) {
      console.log(e.message);
    });
  });
  
  robot.enter((res) => {
    res.send(`Hi! ${res.message.user.name}`);
  });
  
};




var calc=function(){
  this.add=function(num){
    num+=10;
    return num;
  };
  this.sub=function(num){
    num-=10;
    return num;
  };
};



