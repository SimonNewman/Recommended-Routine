let data = null;
//let currentScreen = 'welcome';
let currentScreen = 'bodyline';
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
  let count = bodyline.length;
  if (i < count) {
    $('.exercise-name').html(bodyline[i].name);
    if (getLastSet(bodyline[i].id)) {
      $('.timer-value').html(getLastSet(bodyline[i].id));
    } else {
      $('.timer-value').html(defaultTimer);
    }
  }
}

function saveExercise(exercise, timeReps) {
  let newData = [];
  let exerciseData = {
    date: new Date().getTime(),
    timeReps: timeReps
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

$('.bodyline .done').click(function(){

});
