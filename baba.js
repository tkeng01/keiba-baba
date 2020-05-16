'use strict';

// --input入力値取得--
const LOCATION_LENGTH = trend.locationChoice.length;
const DISTANCE_LENGTH = trend.distanceChoice.length;

//検索ボタン処理
document.getElementById('search').addEventListener('click', () => {
  const displayDay = document.getElementById('dayChoice').value;
  let displayCounter = 0;

  if(displayDay == false) {
    alert('日付を選択してください');
  } else {
    displayCounter = displayCounter + 1;
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

function callSpread() {
  // date+race or
  // スプレッドシートの値取得
  // gas関数叩く→1,5,6
  // 配列格納
  // return 配列
  // const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=2lXIa7r1o6yftw8699ccBlGpsCakfyEB_pOGb7Wg0Z_ekcNiv9dk_J-IkE-SWo6tYJ0vgdYmEPWhnAQyNCKLUAqMv-g6ATvvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOnPuU-DNnpQZexSiH3fnEVTIeNMKSTfBj4m1K-gs4P_r_ermzAgYtqY7f0POzMpTqV-rV9yhQ38&lib=MLyRgtAJfLXnqDF-I5U33yhgCqzOd43Ir');
  // const test = await res.json();
  // console.log(test);
}
// callSpread();
// const spreadsheet = SpreadsheetApp.getActive();