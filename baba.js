'use strict';

// --input入力値取得--
const LOCATION_LENGTH = trend.locationChoice.length;
const DISTANCE_LENGTH = trend.distanceChoice.length;
let outputCounter = 0;

//検索ボタン処理
document.getElementById('search').addEventListener('click', () => {
  const day = document.getElementById('dayChoice').value;
  console.log(day);
  if(day !== false) {
    document.getElementById('trendDay').textContent =  day;
  } else {
    alert('日付を選択してください');
  }
  
  for(let i = 0; i <= LOCATION_LENGTH - 1; i++) {
    if(trend.locationChoice[i].selected == true) {
      if(trend.locationChoice[i].value == 'none') {
        alert('競馬場を選択してください');
      } else {
        document.getElementById('trendField').textContent = trend.locationChoice[i].value;
      }
    }
  }

  const field = document.trend.fieldChoice.value
  if(field == false) {
    alert('芝/ダート選択してください');
  }
  
  for(let j = 0; j <= DISTANCE_LENGTH -1; j++) {
    if(trend.distanceChoice[j].selected == true) {
      if(trend.distanceChoice[j].value == 'none') {
        alert('距離を選択してください');
      } else {
        document.getElementById('trendDistance').textContent = trend.distanceChoice[j].value + 'm' + 'での傾向は・・・';
      }
    }
  }
});
// ----------

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

// function spread() {
  //date+race or
  //スプレッドシートの値取得
  //gas関数叩く→1,5,6
  //配列格納
  //return 配列
// }