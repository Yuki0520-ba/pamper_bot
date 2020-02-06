// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';


module.exports = (robot) => {  
  robot.respond(/ヘルプ$/i, (res) => {
    res.send('寝るときは「おやすみ」って送ってね！\n次の日の天気をお知らせするよ！');
    res.send('起きたときは「おはよう」って送ってね！\n電車の運行状況、天気、授業の出席情報をお知らせするよ！');
  });
  
};