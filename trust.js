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
if(charCheck(charConv(6, 5, 10)) == 'blanchFlow') {
  if(charConv(6, 5, 10) == midlarArr[0]) {
    //BBC処理
    if(popSum(6, 5, 10) <= 21) {
      console.log('中荒れ');
    } else {
      console.log('大荒れ');
    }
  } else if(charConv(6, 5, 10) == midlarArr[4]) {
    //ACE処理
    if(popSum(6, 5, 10) <= 30) {
      console.log('中荒れ');
    } else {
      console.log('大荒れ');
    }
  } else {
    //AEE,ABD,ACC処理
    if(popSum(6, 5, 10) <= 22) {
      console.log('中荒れ');
    } else {
      console.log('大荒れ');
    }
  }
} else {
  console.log(charCheck(charConv(6, 5, 10)));
}