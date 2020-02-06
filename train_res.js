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
  //const use_line = '山手線';

  var fs = require('fs');
  var json_data;
  let use_line;
  fs.readFile('./u_info.json', 'utf8', function (err, list) {
    if (err) console.log("読み込みエラー", err);
    //JSON型に変換して表示
    json_data = JSON.parse(list);
    console.log(json_data);

    use_line = json_data.use_line.toString();
  });

  //鉄道遅延情報の取得例
  request.get(options, function (error, response, body) {
    //console.log(error);
    //console.log(response);
    //console.log(body);
    //console.log(body[0].name.toString());

    //電車遅延確認
    robot.respond(/おはよう$/i, (res) => {
      let td_check_str = '';
      for (let i = 0; i < body.length.toString(); i++) {
        if (body[i].name == use_line) td_check_str += use_line + '遅延してる！';
      }
      if (td_check_str.length == 0) {
        td_check_str += use_line + 'の遅延はないよ！';
      }
      res.send(td_check_str);
    });
  });
};
