// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';
/*==電車遅延================================================*/

module.exports = (robot) => {
  //鉄道遅延JSONの取得設定
  let request = require('request');
  const options = {
    url: 'https://tetsudo.rti-giken.jp/free/delay.json',
    method: 'GET',
    json: true
  }
  
  //デモ用：使用路線は直書きで設定する
  const use_line = '八高線';
  
  //鉄道遅延情報の取得例
  request.get(options, function (error, response, body) {
    console.log(error);
    console.log(response);
    console.log(body);
    console.log(body[0].name.toString());

    //電車遅延確認
    robot.respond(/おはよう$/i, (res) => {
      let td_check_str = '';
      for (let i = 0; i < body.length.toString(); i++) {
        if (body[i].name == use_line) td_check_str += use_line + '遅延しています';
      }
      if (td_check_str.length == 0) {
        td_check_str += use_line + 'の遅延はありません';
      }
      res.send(td_check_str);
    });
  });
};
