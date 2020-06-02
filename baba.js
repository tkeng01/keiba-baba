'use strict';

//本日の日付取得
const GET_NOW = new Date();
const GET_YEAR = GET_NOW.getFullYear()
const GET_MONTH = ('0' + (GET_NOW.getMonth() + 1)).slice(-2);
const GET_DAY = GET_NOW.getDate()
const GET_TODAY = `${GET_YEAR}${GET_MONTH}${GET_DAY}`;

//スプレッドシートjson取得
function callSpread(keibaData) {
  const callSpread = new XMLHttpRequest();
  callSpread.open('GET', 'https://script.google.com/macros/s/AKfycbw9jVHMTWumDtzQ0BObOqLoEUbvWlMm1JUzKDGTbnxiYofugew/exec', true);
  callSpread.responseType = 'json';
  callSpread.send();
  callSpread.onload = function() {
    const keibaDataArr = [];
    for(let j = 0; j <= callSpread.response.length - 1; j++) {
      const KEIBA_YEAR = callSpread.response[j].year;
      const KEIBA_MONTH = ('0' + callSpread.response[j].month).slice(-2);
      const KEIBA_DAY = ('0' + callSpread.response[j].day).slice(-2);
      const jsonData = [];
      jsonData.push(KEIBA_YEAR + KEIBA_MONTH + KEIBA_DAY);
      jsonData.push(callSpread.response[j].location);
      jsonData.push(callSpread.response[j].race);
      jsonData.push(callSpread.response[j].class);
      jsonData.push(callSpread.response[j].field);
      jsonData.push(callSpread.response[j].distance);
      jsonData.push(callSpread.response[j].condition);
      jsonData.push(callSpread.response[j].place);
      jsonData.push(callSpread.response[j].popular);
      jsonData.push(callSpread.response[j].corner4);
      jsonData.push(callSpread.response[j].pci);
      keibaDataArr.push(jsonData);
    }
    keibaData(keibaDataArr);
  }
}

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
    cutDate = `${cutYear}${cutMonth}${cutDay}`;

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

  //2だった場合は正常処理
  if(displayCounter == 2) { 
    callSpread(function(keibaDataArr) {
      let pullOutArr = [];
      const ONE_JSON_LENGTH = 10;
      //json全データをチェック
      keibaDataArr.forEach((dayLocatValue) => {
        if(cutDate.slice(-6) == dayLocatValue[0] && displayLocation == dayLocatValue[1]) {
          document.getElementById('trendDay').textContent = displayDay;
          document.getElementById('trendField').textContent = displayLocation;
          for(let pullInfo = 0; pullInfo <= ONE_JSON_LENGTH; pullInfo++) {
            pullOutArr.push(dayLocatValue[pullInfo]);
          }
        }
      });

      //1Rごと情報を配列に格納
      let splitRaceDate = [];
      for(let splitCount = 0; splitCount <= pullOutArr.length; splitCount++) {
        if(splitCount !== 0 && splitCount % 33 == 0) {
          splitRaceDate.push(pullOutArr.slice((splitCount - 33), splitCount));
        }
      }

      let turfArr = [];
      let dirtArr = [];
      let turfdirtArr = [];
      for(let turf = 0; turf <= splitRaceDate.length - 1; turf++) {
        switch(splitRaceDate[turf][4]) {
          case '芝':
            turfArr.push(splitRaceDate[turf][2] + 'R');
            turfArr.push(splitRaceDate[turf][3]);
            turfArr.push(splitRaceDate[turf][4]);
            turfArr.push(splitRaceDate[turf][5] + 'm');
            turfArr.push(splitRaceDate[turf][6]);
            turfdirtArr.push(splitRaceDate[turf][2] + 'R');
            turfdirtArr.push(splitRaceDate[turf][3]);
            turfdirtArr.push(splitRaceDate[turf][4]);
            turfdirtArr.push(splitRaceDate[turf][5] + 'm');
            turfdirtArr.push(splitRaceDate[turf][6]);
            break;
          case 'ダ':
            dirtArr.push(splitRaceDate[turf][2] + 'R');
            dirtArr.push(splitRaceDate[turf][3]);
            dirtArr.push(splitRaceDate[turf][4]);
            dirtArr.push(splitRaceDate[turf][5] + 'm');
            dirtArr.push(splitRaceDate[turf][6]);
            turfdirtArr.push(splitRaceDate[turf][2] + 'R');
            turfdirtArr.push(splitRaceDate[turf][3]);
            turfdirtArr.push(splitRaceDate[turf][4]);
            turfdirtArr.push(splitRaceDate[turf][5] + 'm');
            turfdirtArr.push(splitRaceDate[turf][6]);
            break;
        }
      }

      //HTML画面出力
      let choiceField = trend.fieldChoice.value;
      let resultHtml = '<ul>';
      switch(choiceField) {
        case 'turfdirt':
          //全レース
          turfdirtArr.forEach((turfdirt) => {
            resultHtml += '<li>' + turfdirt + '</li>';
          })
          break;
        case 'turf':
          // 芝レース
          turfArr.forEach((turf) => {
            resultHtml += '<li>' + turf + '</li>';
          })
          break;
        case 'dirt':
          // ダートレース
          dirtArr.forEach((dirt) => {
            resultHtml += '<li>' + dirt + '</li>';
          })
          break;
      }
      resultHtml += '</ul>';
      document.getElementById('resultHtml').innerHTML = resultHtml;

      //PCI計算
      // console.log(splitRaceDate.length);
      // let calcPci = (parseInt(splitRaceDate[0][10]) + parseInt(splitRaceDate[0][21]) + parseInt(splitRaceDate[0][32])) / 3;
    });
  } else {
    displayCounter = 0;
  }
});

document.getElementById('test').addEventListener('click', () => {
  callSpread(function(keibaDataArr) {
    console.log(keibaDataArr);
    let convArg1 = 0;
    let convArg2 = 0;
    let convArg3 = 0;

    keibaDataArr.forEach((popValue, number) => {
      if(popValue[8]) {
        switch(number % 3) {
          case 0:
            convArg1 = popValue[8];
            break;
          case 1:
            convArg2 = popValue[8];
            break;
          case 2:
            convArg3 = popValue[8];
            break;
        }
        console.log(charConv(convArg1, convArg2, convArg3));
        
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
}); 