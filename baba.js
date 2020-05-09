'use strict';

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

// var rank_arr = [a,b,c]

function calc(a,b,c) {
  let str1 = '';

  if (1 <= a && a <= 3) {
    str1 = 'A';    
  } else if(4 <= a && a <= 7){
    str1 = 'B';
  } else if(8 <= a && a <= 12){    
    str1 = 'C';
  } else if(13 <= a && a <= 16){
    str1 = 'D';
  } else {
    str1 = 'E';
  }

  if (1 <= b && b <= 3) {
    str2 = 'A';    
  } else if(4 <= b && b <= 7){
    str2 = 'B';
  } else if(8 <= b && b <= 12){    
    str2 = 'C';
  } else if(13 <= b && b <= 16){
    str2 = 'D';
  } else {
    str2 = 'E';
  }

  if (1 <= c && c <= 3) {
    str3 = 'A';    
  } else if(4 <= c && c <= 7){
    str3 = 'B';
  } else if(8 <= c && c <= 12){    
    str3 = 'C';
  } else if(13 <= c && c <= 16){
    str3 = 'D';
  } else {
    str3 = 'E';
  }
  console.log(str1 + str2 + str3);
  // let rank = str1;
  // return rank;
}

calc(1,4,12);
calc(7,3,17);

// console.log(rank);