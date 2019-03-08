'use strict';
{
  let words = [
    'Java',
    'Javascript',
    'Ruby',
    'Python',
    'Swift',
    'Kotlin',
    'Solidity',
    'Go'
  ];
  let currentWord;
  let currentLocation
  let score;
  let miss;
  let timer;
  let countTimer;
  let target = document.getElementById('target');
  let scoreLabel = document.getElementById('score');
  let missLabel = document.getElementById('miss');
  let timerLabel = document.getElementById('timer');
  let isStarted;
  let isCountFinished;
  let timerId;
  let countTimerId;

  let init = () => {
      currentWord = 'click to start';
      currentLocation = 0;
      score = 0;
      miss = 0;
      timer = 5;
      countTimer = 3;
      target.innerHTML = currentWord;
      scoreLabel.innerHTML = score;
      missLabel.innerHTML = miss;
      timerLabel.innerHTML = timer;
      isStarted = false;
      isCountFinished = false;
  }

  init();

  let startTimer = () => {
    if(!isCountFinished){
      setTimeout(() => {
        countTimerId = target.innerHTML = countTimer;
        if(countTimer === 1){
          clearTimeout(countTimerId);
          isCountFinished = true;
          return;
        }
        countTimer--;
        startTimer();
      }, 1000);
    }
  }

  let updateTimer = () => {
    setTimeout(() => {
      timer--;
      timerId = timerLabel.innerHTML = timer;
      if(timer <= 0){
        let accuracy = (score + miss) === 0 ? '0.00' : ((score /(score + miss)) * 100).toFixed(2);
        alert(score + 'letters, ' + miss + ' miss, ' + accuracy + '% accuracy');
        clearTimeout(timerId);
        init();
        return;
      }
      updateTimer();
    }, 1000);
  }

  let setTarget = () => {
    currentWord = words[Math.floor(Math.random() * words.length)];
    target.innerHTML = currentWord;
    currentLocation = 0;
  }

  window.addEventListener('click', () => {
    if(!isStarted){
      startTimer();
      setTimeout(() => {
        isStarted = true;
        setTarget();
        updateTimer();
      }, 4000);
    }
  });



  window.addEventListener('keyup', (e) => {
    if(!isStarted){
      return;
    }
    if(String.fromCharCode(e.keyCode) === currentWord[currentLocation].toUpperCase()){
      currentLocation++;
      let placeholder = '';
      for(let i=0;i<currentLocation;i++){
        placeholder += '_';
      }
      target.innerHTML = placeholder + currentWord.substring(currentLocation);
      score++;
      scoreLabel.innerHTML = score;
      if(currentLocation === currentWord.length){
        setTarget();
      }
    }else{
      miss++;
      missLabel.innerHTML = miss;
    }
  });
}
