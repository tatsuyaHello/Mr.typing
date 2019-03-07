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
  let target = document.getElementById('target');
  let scoreLabel = document.getElementById('score');
  let missLabel = document.getElementById('miss');
  let timerLabel = document.getElementById('timer');
  let isStarted;
  let timerId;

  let init = () => {
      currentWord = 'click to start';
      currentLocation = 0;
      score = 0;
      miss = 0;
      timer =3;
      target.innerHTML = currentWord;
      scoreLabel.innerHTML = score;
      missLabel.innerHTML = miss;
      timerLabel.innerHTML = timer;
      isStarted = false;
  }

  init();

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
      isStarted = true;
      setTarget();
      updateTimer();
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
