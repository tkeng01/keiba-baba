'use strict';

//input入力値取得
const LOCATION_LENGTH = trend.locationChoice.length;
const DISTANCE_LENGTH = trend.distanceChoice.length;

document.getElementById('search').addEventListener('click', () => {
  const day = document.getElementById('dayChoice').value;
  document.getElementById('trendDay').textContent =  day;

  for(let i = 0; i <= LOCATION_LENGTH - 1; i++) {
    if(trend.locationChoice[i].selected == true) {
      document.getElementById('trendField').textContent = trend.locationChoice[i].value;
    }
  }

  const field = document.trend.fieldChoice.value;
  
  for(let j = 0; j <= DISTANCE_LENGTH -1; j++) {
    if(trend.distanceChoice[j].selected == true) {
      console.log(trend.distanceChoice[j].value);
    }
  }
});

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
  return rank[0] + rank[1] +rank[2];
}

//人気値合計
function popSum(a, b, c) {
  return parseInt(a + b + c);
}

//各functionに代入
function trustJudge(a, b, c){
  //変換結果＋使用処理
  console.log(charConv(a, b, c));

  //計算結果＋使用処理
  console.log(popSum(a, b, c));
}

//1-3着馬人気を引数に指定
trustJudge(4,1,14);