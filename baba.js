'use strict';

const LOCATION_LENGTH = trend.locationChoice.length;
const DISTANCE_LENGTH = trend.distanceChoice.length;

document.getElementById('search').addEventListener('click', () => {
  const day = document.getElementById('dayChoice').value;
  console.log(day);

  for(let i = 0; i <= LOCATION_LENGTH - 1; i++) {
    if(trend.locationChoice[i].selected == true) {
      console.log(trend.locationChoice[i].value);
    }
  }

  const field = document.trend.fieldChoice.value;
  console.log(field);
  
  for(let j = 0; j <= DISTANCE_LENGTH -1; j++) {
    if(trend.distanceChoice[j].selected == true) {
      console.log(trend.distanceChoice[j].value);
    }
  }
});