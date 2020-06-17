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
      jsonData.push(callSpread.response[j].number);
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
      const ONE_JSON_LENGTH = 11;
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
        if(splitCount !== 0 && splitCount % 36 == 0) {
          splitRaceDate.push(pullOutArr.slice((splitCount - 36), splitCount));
        }
      }

      //変数宣言
      let turfArr = [];
      let dirtArr = [];
      let turfdirtArr = [];
      let positionArr = [];
      let turfPopArr = [];
      let dirtPopArr = [];
      let turfdirtPopArr = [];
      let calcPosition = '';
      let positionEscape = 1;
      let positionFront = '';
      let positionCenter = '';
      let calcPci = '';
      let displayRaceNum = '';
      let displayClass = '';
      let displayTurf = '';
      let displayDistance = '';
      let displayCondition = '';
      let displayTotal = '';
      let displayPopular = '';
      let displayCorner = '';
      let displayPosition = '位置取り：';
      const HEIG_PACE = 48.0;
      const SLOW_PACE = 56.0;
      let displayPci = '';
      let displayTrust = '';
      let convArgArr = [];
      let convArg1 = 0;
      let convArg2 = 0;
      let convArg3 = 0;

      //位置取り計算関数
      function positionCalcFunc() {
        displayPosition = '位置取り：';
        positionArr.forEach((position) => {
          if(position == positionEscape) {
            displayPosition += '逃' + '\t';
          } else if(positionEscape < position && position <= positionFront) {
            displayPosition += '先' + '\t';
          } else if(positionFront < position && position <= positionCenter) {
            displayPosition += '差' + '\t';
          } else {
            displayPosition += '追' + '\t';
          }
        });
      }

      //配列push関数
      function arrPushFunc(arrName) {
        arrName.push('<div class="oneRaceInfo">' + '<ul class="displayInfo">');
        arrName.push('<li>' + displayRaceNum + '</li>');
        arrName.push('<li>' + displayClass + '</li>');
        arrName.push('</ul>');
        arrName.push('<ul class="displayInfo">');
        arrName.push('<li>' + displayTurf + '</li>');
        arrName.push('<li>' + displayTotal + '</li>');
        arrName.push('<li>' + displayDistance + '</li>');
        arrName.push('<li>' + displayCondition + '</li>');
        arrName.push('</ul>');
        arrName.push('<ul class="displayInfo">');
        arrName.push('<li>' + displayPopular + '</li>');
        arrName.push('<li>' + displayCorner + '</li>');
        arrName.push('<li>' + displayPosition + '</li>');
        arrName.push('</ul>');
      }

      //ペース計算関数
      function paceCalcFunc(arrName) {
        if(calcPci <= HEIG_PACE) {
          displayPci = 'Hペース(後方有利)'
        } else if (calcPci <= SLOW_PACE) {
          displayPci = 'Sペース(先行有利)'
        } else {
          displayPci = 'Mペース(前後同等)'
        }
        arrName.push('<ul class="displayInfo">');
        arrName.push('<li>' + displayPci + '</li>');
        arrName.push('</ul>');
      }

      for(let turf = 0; turf <= splitRaceDate.length - 1; turf++) {        
        //値代入
        displayRaceNum = splitRaceDate[turf][2] + 'R';
        displayClass = splitRaceDate[turf][3];
        displayTurf = splitRaceDate[turf][4];
        displayDistance = splitRaceDate[turf][5] + 'm';
        displayCondition = splitRaceDate[turf][6];
        displayTotal = splitRaceDate[turf][11] + '頭';
        displayCorner = '4角：' + splitRaceDate[turf][9] + '\n' + splitRaceDate[turf][21] + '\n' + splitRaceDate[turf][33];
        displayPopular = '人気：' + splitRaceDate[turf][8] + '\n' + splitRaceDate[turf][20] + '\n' + splitRaceDate[turf][32];
        calcPci = ((parseInt(splitRaceDate[turf][10]) + parseInt(splitRaceDate[turf][22]) + parseInt(splitRaceDate[turf][34])) / 3).toFixed(2);
        positionArr = [splitRaceDate[turf][9], splitRaceDate[turf][21], splitRaceDate[turf][33]];
        calcPosition = ((splitRaceDate[turf][11] - 1) / 3).toFixed(0);
        positionFront = parseInt(calcPosition);
        positionCenter = parseInt(calcPosition * 2);

        //人気配列関数
        function popArrFunc() {
          convArg1 = splitRaceDate[turf][8];
          convArg2 = splitRaceDate[turf][20];
          convArg3 = splitRaceDate[turf][32];
          return [convArg1, convArg2, convArg3];
        }

        //信頼度計算関数
        function trustCalcFunc(arrName) {
          function blanchMiddleFunc() {
            arrName.push('<ul class="displayInfoEnd">');
            arrName.push('<li>' + '信頼度：中' + '</li>');
            arrName.push('</ul>' + '</div>');
          }

          function blanchHighFunc() {
            arrName.push('<ul class="displayInfoEnd">');
            arrName.push('<li>' + '信頼度：高' + '</li>');
            arrName.push('</ul>' + '</div>');
          }

          if(charCheck(charConv(...popArrFunc())) == 'blanchFlow') {
            if(charConv(...popArrFunc()) == midlarArr[0]) {  //BBCの場合
              if(popSum(...popArrFunc()) <= 21) {
                blanchMiddleFunc();
              } else {
                blanchHighFunc();
              }
            } else if(charConv(...popArrFunc()) == midlarArr[4]) { //ACEの場合
              if(popSum(...popArrFunc()) <= 30) {
                blanchMiddleFunc();
              } else {
                blanchHighFunc();
              }
            } else { //AEE,ABD,ACCの場合
              if(popSum(...popArrFunc()) <= 22) {
                blanchMiddleFunc();
              } else {
                blanchHighFunc();
              }
            }
          } else {
            arrName.push('<ul class="displayInfoEnd">');
            arrName.push('<li>' + '信頼度：' + charCheck(charConv(...popArrFunc())) + '</li>');
            arrName.push('</ul>' + '</div>');
          }
        }
        
        switch(displayTurf) {
          case '芝':
            positionCalcFunc();
            arrPushFunc(turfArr);
            arrPushFunc(turfdirtArr);
            paceCalcFunc(turfArr);
            paceCalcFunc(turfdirtArr);
            popArrFunc();
            trustCalcFunc(turfArr);
            trustCalcFunc(turfdirtArr);
            break;
          case 'ダ':
            positionCalcFunc();
            arrPushFunc(dirtArr);
            arrPushFunc(turfdirtArr);
            paceCalcFunc(dirtArr);
            paceCalcFunc(turfdirtArr);
            popArrFunc();
            trustCalcFunc(dirtArr);
            trustCalcFunc(turfdirtArr);
            break;
        }
      }

      //HTML画面出力
      let choiceField = trend.fieldChoice.value;
      let resultHtml = '<div>';
      switch(choiceField) {
        case 'turfdirt':
          //全レース
          turfdirtArr.forEach((turfdirt) => {
            resultHtml += turfdirt;
          })
          break;
        case 'turf':
          // 芝レース
          turfArr.forEach((turf) => {
            resultHtml += turf;
          })
          break;
        case 'dirt':
          // ダートレース
          dirtArr.forEach((dirt) => {
            resultHtml += dirt;
          })
          break;
      }
      resultHtml += '</div>';
      document.getElementById('resultHtml').innerHTML = resultHtml;
    });
  } else {
    displayCounter = 0;
  }
});