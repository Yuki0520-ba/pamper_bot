// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time



//'use strict';
//
//module.exports = (robot) => {
//  robot.respond(/PING$/i, (res) => {
//    res.send('PONG!!');
//    res.send({
//	stamp_set: '3',
//	stamp_index: '1152921507291203198',
//	text: 'おはよう'  // (Option) テキスト付きスタンプの場合のみ
//});
//  });
//
//  robot.respond(/ADAPTER$/i, (res) => {
//    res.send(robot.adapterName);
//  });
//
//  robot.respond(/ECHO (.*)$/i, (res) => {
//    res.send(res.match[1]);
//  });
//
//  robot.respond(/TIME$/i, (res) => {
//    res.send(`Server time is: ${new Date()}`);
//  });
//};
