'use strict';

//文字列配列
const steadyArr = ['AAA'];
const popArr = ['AAB', 'ABB'];
const smallArr = ['AAC', 'BBB', 'ABC'];
const middleArr = ['AAD', 'ABE', 'BCC', 'ACD'];
const midlarArr = ['BBC', 'AAE', 'ABD', 'ACC', 'ACE'];
const largeArr = ['BBD', 'BBE', 'BCD', 'CCC', 'ADD', 'BCE', 'ADE', 'CCD', 'BDD', 'AEE', 'BDE', 'CCE', 'CDD', 'BEE', 'CDE', 'DDD', 'CEE', 'DDE'];

function charCheck(char) {
  let roughRank = '';
  switch(true) {
    case steadyArr.includes(char):
      roughRank = '本命';
      break;
    case popArr.includes(char):
      roughRank = '人気サイド';
      break;
    case smallArr.includes(char):
      roughRank = '小荒れ';
      break;
    case middleArr.includes(char):
      roughRank = '中荒れ';
      break;
    case midlarArr.includes(char):
      roughRank = 'blanchFlow';
      break;
    case largeArr.includes(char):
      roughRank = '大荒れ';
      break;
  }
  return roughRank;
}

//charConv改良前
console.log(charCheck(charConv(6, 5, 10)));

if(charCheck(charConv(6, 5, 10)) == 'blanchFlow') {
  console.log('分岐処理');
}
