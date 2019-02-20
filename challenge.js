// 1. As a user, i should see the timer increment every second once the page has loaded
// 2. As a user, i can manually increment and decrement the counter as i like
// 3. As a user, i can like an individual number of the counter. I should see the appropriate number of likes associated with that particular number
// 4. As a user I can pause the game, which should disable all buttons except the pause button, which should now show the text 'resume'
// 5. As a user I can leave comments on my gameplay, such as "Wow, what a fun game this is"


// timer countdown
counterEl = document.querySelector('#counter')

countUp = setInterval(getTime,1000);
let timerPauseSwitch = false; likes = {};

function getTime(){
  if (!timerPauseSwitch) {
    counterEl.innerText ++;
  }
}

//increment decrement timer
let buttonsAll = document.querySelectorAll('button')
let buttonPause = buttonsAll[3]
let buttonMinus = buttonsAll[0]
let buttonPlus = buttonsAll[1]
let buttonHeart = buttonsAll[2]
let buttonSubmit = buttonsAll[4]
let buttonDisableable = [buttonMinus, buttonPlus, buttonHeart]
let likesCount = document.querySelector('ul.likes')
let inputComment = document.querySelector('input')
let commentHistory = document.querySelector('#list.comments')


buttonPlus.addEventListener('click',incrementTimer)
function incrementTimer(event){
  counterEl.innerText ++;
}

buttonMinus.addEventListener('click',decrementTimer)
function decrementTimer(event){
  counterEl.innerText --;
}

buttonPause.addEventListener('click',pauseTimer)
function pauseTimer(event){
  if (timerPauseSwitch) {
    timerPauseSwitch = false;
    buttonPause.innerText = 'pause';
    buttonDisableable.forEach((button)=> button.disabled = false)
  }
  else {
    timerPauseSwitch = true;
    buttonPause.innerText = 'resume';
    buttonDisableable.forEach((button)=> button.disabled = true)
  }
}

buttonHeart.addEventListener('click',addLikes)
function addLikes(event){
  if (Object.keys(likes).includes(counterEl.innerText)) {
    likes[counterEl.innerText] ++;
  }
  else {
    likes[counterEl.innerText] = 1;
  }
  renderLikes();
}

function renderLikes(){
  removeLikes();
  for (const key in likes){
    likesCount.innerHTML += `<li>${key} has ${likes[key]} likes</li>`
  }
}

function removeLikes(){
  while (likesCount.firstChild){
    likesCount.removeChild(likesCount.firstChild)
  }
}

buttonSubmit.addEventListener('click',submitComment)
function submitComment(){
  event.preventDefault();
  newComment = document.createElement('h1');
  newComment.innerText = inputComment.value;
  commentHistory.append(newComment);
}
