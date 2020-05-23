'use strict';

//アルファベット変換処理
function charConv(a, b, c) {
  let firstChar = '';
  let secondChar = '';
  let thirdChar = '';

  if (1 <= a && a <= 3) {
    firstChar = 'A';    
  } else if(4 <= a && a <= 7){
    firstChar = 'B';
  } else if(8 <= a && a <= 12){    
    firstChar = 'C';
  } else if(13 <= a && a <= 16){
    firstChar = 'D';
  } else {
    firstChar = 'E';
  }

  if (1 <= b && b <= 3) {
    secondChar = 'A';    
  } else if(4 <= b && b <= 7){
    secondChar = 'B';
  } else if(8 <= b && b <= 12){    
    secondChar = 'C';
  } else if(13 <= b && b <= 16){
    secondChar = 'D';
  } else {
    secondChar = 'E';
  }

  if (1 <= c && c <= 3) {
    thirdChar = 'A';    
  } else if(4 <= c && c <= 7){
    thirdChar = 'B';
  } else if(8 <= c && c <= 12){    
    thirdChar = 'C';
  } else if(13 <= c && c <= 16){
    thirdChar = 'D';
  } else {
    thirdChar = 'E';
  }

  //アルファベット順に並び替え
  let rank = [firstChar, secondChar, thirdChar];
  rank.sort();
  return rank[0] + rank[1] + rank[2];
}

//人気値合計
function popSum(a, b, c) {
  return parseInt(a) + parseInt(b) + parseInt(c);
}

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