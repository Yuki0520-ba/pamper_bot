// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';
/*
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
};
*/

var fs=require('fs');
var json;

fs.readFile('./test.json','utf8',function(err,list){
        if(err) console.log("読み込みエラー",err)
//JSON型に変換して表示
        json=JSON.parse(list);
        //console.log(json_data.name);
});

//発言に応答
module.exports = (robot) => {
  robot.respond(/good$/i, (res) => {
    res.send('おはよう'+json.name);
  });

  robot.respond(/K$/i, (res) => {
    res.send('KKKKK');
  });

  robot.respond(/ECHO (.*)$/i, (res) => {
    res.send(res.match[1]);
  });

  robot.respond(/TIME$/i, (res) => {
    res.send(`Server time is: ${new Date()}`);
  });

  robot.respond(/init profile$/i, (res) => {
//選択肢を提示
	  res.send('ん、プロフィール再設定する？ yes/no');
	    robot.respond(/yes$/i, (res) => {
              res.send('おけい、やるわ！');

  });
            robot.respond(/no$/i, (res) => {
              res.send('なんやねん笑');
  });
  });

};
