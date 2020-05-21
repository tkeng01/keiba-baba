'use strict';

//本日の日付取得
const GET_NOW = new Date();
const GET_YEAR = GET_NOW.getFullYear()
const GET_MONTH = ('0' + (GET_NOW.getMonth() + 1)).slice(-2);
const GET_DAY = GET_NOW.getDate()
const GET_TODAY = `${GET_YEAR}${GET_MONTH}${GET_DAY}`;

// --input入力値取得--
const LOCATION_LENGTH = trend.locationChoice.length;
const DISTANCE_LENGTH = trend.distanceChoice.length;

//検索ボタン処理
document.getElementById('search').addEventListener('click', () => {
  let displayCounter = 0;
  
  let displayDay = document.getElementById('dayChoice').value;
  let cutDate = '';

  if(displayDay == false) {
    alert('日付を選択してください');
  } else {
    const cutYear = displayDay.substr(0, 4);
    const cutMonth = displayDay.substr(5, 2);
    const cutDay = displayDay.substr(8, 2);
    let cutDate = `${cutYear}${cutMonth}${cutDay}`;

    //未来を選んだ処理
    if(GET_TODAY < cutDate) {
      alert('未来を選んでいます');
    } else {
      displayCounter = displayCounter + 1;
    }
  }
  
  let displayLocation = '';
  for(let i = 0; i <= LOCATION_LENGTH - 1; i++) {
    if(trend.locationChoice[i].selected == true) {
      if(trend.locationChoice[i].value == 'none') {
        alert('開催場を選択してください');
      } else {
        displayLocation = trend.locationChoice[i].value;
        displayCounter = displayCounter + 1;
      }
    }
  }
  
  //2だった場合は文字列出力
  if(displayCounter == 2) { 
    document.getElementById('trendDay').textContent = displayDay;
    document.getElementById('trendField').textContent = displayLocation;
  } else {
    displayCounter = 0;
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
  return rank[0] + rank[1] + rank[2];
}

//人気値合計
function popSum(a, b, c) {
  return parseInt(a + b + c);
}

const valueSpread = function() {
  console.log('callbak!')
}

//スプレッドシートjson取得
const callSpread = $.ajax({
  url: 'https://script.google.com/macros/s/AKfycbw9jVHMTWumDtzQ0BObOqLoEUbvWlMm1JUzKDGTbnxiYofugew/exec',
  type: 'get',
});

callSpread.always(valueSpread);

console.log('test');