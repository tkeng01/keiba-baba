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

//スプレッドシートjson取得
function callSpread(arr) {
  const callSpread = new XMLHttpRequest();
  callSpread.open('GET', 'https://script.google.com/macros/s/AKfycbw9jVHMTWumDtzQ0BObOqLoEUbvWlMm1JUzKDGTbnxiYofugew/exec', true);
  callSpread.responseType = 'json';
  callSpread.send();
  callSpread.onload = function() {
    const popArr = [];
    for(let j = 0; j <= callSpread.response.length - 1; j++) {
      popArr.push(callSpread.response[j].pop);
    }
   
    const splitPopArr = [];
    let k = 0;
    while(k < popArr.length) {
      if(k % 3 == 0) {
        splitPopArr.push(popArr.slice(k, k + 3));  
      }
      k ++;
    }
    arr(splitPopArr);
  }
}

document.getElementById('test').addEventListener('click', () => {
  callSpread(function (splitPopArr) {
    let convArg1 = 0;
    let convArg2 = 0;
    let convArg3 = 0;
  
    for(let arrCount = 0; arrCount <= splitPopArr.length - 1; arrCount++) {
      splitPopArr[arrCount].forEach((placeValue, index) => {
        if(index == 0) {
          convArg1 = placeValue;
        } else if (index == 1) {
          convArg2 = placeValue;
        } else {
          convArg3 = placeValue;
        }
      });
      console.log(charConv(convArg1, convArg2, convArg3));
      console.log(popSum(convArg1, convArg2, convArg3));

      if(charCheck(charConv(convArg1, convArg2, convArg3)) == 'blanchFlow') {
        if(charConv(convArg1, convArg2, convArg3) == midlarArr[0]) {
          //BBC処理
          if(popSum(6, 5, 10) <= 21) {
            console.log('中荒れ');
          } else {
            console.log('大荒れ');
          }
        } else if(charConv(convArg1, convArg2, convArg3) == midlarArr[4]) {
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
        console.log(charCheck(charConv(convArg1, convArg2, convArg3)));
      }
    }
  });
});