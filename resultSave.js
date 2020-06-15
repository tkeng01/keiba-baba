'use strict';

// 格納結果
// 1R未勝利・牝ダ18頭1600m良人気：1
// 3
// 54角：4
// 1
// 2位置取り：先	逃	先	Hペース(後方有利)信頼度：低2R未勝利芝16頭1800m良人気：3
// 9
// 14角：12
// 6
// 1位置取り：追	差	逃	Mペース(前後同等)信頼度：低

let resultDisplayInfo = document.getElementsByClassName('displayInfo');
let resultDisplayInfoEnd = document.getElementsByClassName('displayInfoEnd');
let saveDay = '';
let saveField = '';
let info = [];
let end = [];

document.getElementById('resultSave').addEventListener('click', () => {
  saveDay = document.getElementById('trendDay').textContent;
  saveField = document.getElementById('trendField').textContent;

  for(let infoLength = 0; infoLength <= resultDisplayInfo.length - 1; infoLength++) {
    for(let infoEndLength = 0; infoEndLength <= resultDisplayInfoEnd.length - 1; infoEndLength++) {
      info.push(resultDisplayInfo[infoLength].childNodes[0]); 
      info.push(resultDisplayInfo[infoLength].childNodes[1]);  
      end = resultDisplayInfoEnd[infoEndLength].children[0];
      console.log(info);
      console.log(end);
    }
  }
})