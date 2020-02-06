// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';

const SelfTimer = require('self-timer');

// initialize
let st = new SelfTimer(new Date());
let max_ab_cnt = 4;
let remaining_ab = 4;

module.exports = (robot) => {
  let attend = 5;
  /*--------ココ書き換える------------*/
  let notattend = 2;
  remaining_ab = max_ab_cnt - notattend;

  console.log("start\n")

  //9時台に連絡を寄越す処理
  /*--------ココ書き換える------------*/
  st.at().Hour(17, function () {
    robot.send({
      room: '_231484839_1002438656'
    }, {
      question: '授業でた？'
    });
    
    robot.respond('yesno', (res) => {
      let yn_str = '';
      if (res.json.response === true) {
        res.send(`がんばったね！`);
        attend += 1
      } else {
        notattend += 1
        remaining_ab = max_ab_cnt - notattend;
        

        if (remaining_ab >= 0) {
          if (remaining_ab == 0) res.send(`今日までは大丈夫！次からはがんばろー！`);
          else res.send(`大丈夫！次はがんばろう！\n休めるのはあと` + remaining_ab + `回だよ！`);
        } else res.send(`アチャー😣\nもう落単だよー！\n来年がんばろー！`);
      }
      yn_str += "これで出席回数は" + attend + "回，欠席回数は" + notattend + "回だよ";
      if (notattend == 0) yn_str += '\n休んでないのえらい！さすが' + res.message.user.name + `くんだね！`;
      res.send(yn_str);
      res.send();
    });
  });

  //おはようの処理
  robot.respond(/おはよう$/i, (res) => {
    let ab_m_str = '';
    if (remaining_ab == 1) ab_m_str += 'あと1回しか休めないからね！';
    else if (remaining_ab == 0) ab_m_str += 'もう今日休んだら落単だよ！';
    else if (remaining_ab < 0) ab_m_str += 'もう今日のは落単確定だし休んでも良いんじゃない？';
    else ab_m_str += '休めるのはあと' + remaining_ab + '回だよ！';
    res.send('おはよー！\n'+ab_m_str);
  });

};
