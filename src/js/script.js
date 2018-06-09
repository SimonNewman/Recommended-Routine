let data = null;
//let currentScreen = 'welcome';
let currentScreen = 'bodyline';
let exerciseNumber,
    seconds;
let doneSound = new Audio('sound/243020__plasterbrain__game-start.ogg');
doneSound.loop = false;

let currentExercise;
const defaultTimer = 10;
const apiUrl = 'https://www.jsonstore.io/9d567715b95df4d04c185c008ad8699c3e362940430a2ca7494aaefad073403e';
const bodyline = [
  {
    id: 'plank',
    name: 'Plank'
  },
  {
    id: 'side-plank-left',
    name: 'Side Plank Left'
  },
  {
    id: 'side-plank-right',
    name: 'Side Plank Right'
  },
  {
    id: 'reverse-plank',
    name: 'Reverse Plank'
  },
  {
    id: 'hollow-hold',
    name: 'Hollow Hold'
  },
  {
    id: 'arch-hold',
    name: 'Arch Hold'
  }
];

displayScreen(currentScreen);

function displayScreen(screen) {
  $('.screen:not(.' + screen + ')').hide();
  $('.screen.' + screen).show().css('display', 'flex');
  currentScreen = screen;
  setupScreen(screen);
}

function setupScreen(screen) {
  if (screen === 'bodyline') {
    setupBodylineExercise();
  }
}

function setupBodylineExercise(i) {
  if (!i) i = 0;
  exerciseNumber = i;
  let count = bodyline.length;
  if (i < count) {
    $('.exercise-name').html(bodyline[i].name);
    currentExercise = bodyline[i].id;
    if (getLastSet(bodyline[i].id)) {
      $('.timer-value').html(getLastSet(bodyline[i].id));
    } else {
      $('.timer-value').html(defaultTimer);
    }
    $('.times-up').hide();
    $('.bodyline .completed-message').hide();
    $('.bodyline .timer-up, .bodyline .timer-down, .bodyline .timer-value').show();
    $('.bodyline .completed').removeClass('show');
    $('.bodyline .next-btn').addClass('show');
  } else {
    setupScreen
  }
}

function saveExercise(exercise, timeReps, completed) {
  let newData = [];
  let exerciseData = {
    date: new Date().getTime(),
    timeReps: timeReps,
    completed: completed
  };
  let savedData = JSON.parse(localStorage.getItem(exercise));
  if (savedData !== null) {
    newData = savedData;
    newData.push(exerciseData);
  } else {
    newData.push(exerciseData);
  }
  localStorage.setItem(exercise, JSON.stringify(newData));
}

function getLastSet(exercise) {
  let savedData = JSON.parse(localStorage.getItem(exercise));
  if (savedData !== null) {
    return savedData[savedData.length -1].timeReps;
  } else {
    return false;
  }
}

$('.timer-down').click(function(){
  let currentTimer = $(this).next('.timer-value').html();
  if (currentTimer > 0) {
    $(this).next('.timer-value').html(parseInt(currentTimer) - 1);
  }
});

$('.timer-up').click(function(){
  let currentTimer = $(this).prev('.timer-value').html();
  $(this).prev('.timer-value').html(parseInt(currentTimer) + 1);
});

$('.bodyline .next-btn').click(function(){
  $(this).removeClass('show');
  $('.bodyline .timer-up, .bodyline .timer-down').hide();
  seconds = parseInt($('.bodyline .timer-value').html());
  let secondsLeft = seconds;
  let timer = setInterval(function(){
    if (secondsLeft > 1) {
      secondsLeft--;
      $('.bodyline .timer-value').html(secondsLeft);
    } else {
      $('.bodyline .completed-message').show();
      $('.bodyline .completed').addClass('show');
      doneSound.play();
      $('.bodyline .timer-value').hide();
      $('.bodyline .times-up').show();
      clearInterval(timer);
    }
  },
  1000);
});

$('.bodyline .yes-btn').click(function(){
  saveExercise(currentExercise, seconds, true);
  setupBodylineExercise(++exerciseNumber);
});

$('.bodyline .no-btn').click(function(){
  saveExercise(currentExercise, seconds, false);
  setupBodylineExercise(++exerciseNumber);
});
