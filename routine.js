let data = null;
//let currentScreen = 'welcome';
//let currentScreen = 'bodyline';
let currentScreen = 'strength';
let exerciseNumber,
    seconds,
    currentSets = [],
    currentExercise,
    doneSound = new Audio('sound/243020__plasterbrain__game-start.ogg');
doneSound.loop = false;


const defaultTimer = 10;
const defaultReps = [5,5,5];
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

const strength = [
  {
    id: 'pull-up',
    name: 'Pull-up',
    progression: [
      {
        id: 'pull-up-negative',
        name: 'Pull-up Negative'
      },
      {
        id: 'pull-up',
        name: 'Pull-up'
      },
      {
        id: 'l-sit-pull-up',
        name: 'L-Sit Pull-up'
      },
      {
        id: 'bar-pullover',
        name: 'Bar Pullover'
      }
    ]
  },
  {
    id: 'dipping',
    name: 'Dipping',
    progression: [
      {
        id: 'parallel-bar-dips',
        name: 'Parallel Bar Dips'
      },
      {
        id: 'ring-dips',
        name: 'Ring Dips'
      },
      {
        id: 'rings-l-sit-dips',
        name: 'Rings L-Sit Dips'
      }
    ]
  },
  {
    id: 'squat',
    name: 'Squat',
    progression: [
      {
        id: 'assisted-squat',
        name: 'Assisted Squat'
      },
      {
        id: 'squat',
        name: 'Squat'
      },
      {
        id: 'step-up',
        name: 'Step-up'
      },
      {
        id: 'deep-step-up',
        name: 'Deep Step-up'
      }
    ]
  },
  {
    id: 'l-sit',
    name: 'L-Sit',
    progression: [
      {
        id: 'foot-supported-l-sit',
        name: 'Foot Supported L-Sit'
      },
      {
        id: 'one-leg-foot-supported-l-sit',
        name: 'One-Leg Foot Supported L-Sit'
      },
      {
        id: 'tuck-l-sit',
        name: 'Tuck L-Sit'
      },
      {
        id: 'advanced-tuck-l-sit-one-leg-l-sit',
        name: 'Advanced Tuck L-Sit/One-Leg L-Sit'
      },
      {
        id: 'l-sit',
        namer: 'L-Sit'
      }
    ]
  },
  {
    id: 'push-up',
    name: 'Push-up',
    progression: [
      {
        id: 'vertical-push-up',
        name: 'Vertical Push-up'
      },
      {
        id: 'incline-push-up',
        name: 'Incline Push-up'
      },
      {
        id: 'full-push-up',
        name: 'Full Push-up'
      },
      {
        id: 'diamond-push-up',
        name: 'Diamond Push-up'
      },
      {
        id: 'rings-wide-push-up',
        name: 'Rings Wide Push-up'
      },
      {
        id: 'rings-push-up',
        name: 'Rings Push-up'
      },
      {
        id: 'rings-turned-out-push-up',
        name: 'Rings Turned Out Push-up'
      },
      {
        id: 'rto-pseudo-planche-push-up',
        name: 'RTO Pseudo Planche Push-up'
      }
    ]
  },
  {
    id: 'row',
    name: 'Row',
    progression: [
      {
        id: 'vertical-rows',
        name: 'Vertical Rows'
      },
      {
        id: 'incline-rows',
        name: 'Incline Rows'
      },
      {
        id: 'horizontal-rows',
        name: 'Horizontal Rows'
      },
      {
        id: 'wide-rows',
        name: 'Wide Rows'
      },
      {
        id: 'tuck-front-lever',
        name: 'Tuck Front Lever'
      },
      {
        id: 'tuck-ice-cream-maker',
        name: 'Tuck Ice Cream Lever'
      },
      {
        id: 'tuck-fron-lever-row',
        name: 'Tuck Front Lever Row'
      },
      {
        id: 'advance-tuck-fron-lever-tow',
        name: 'Tuck Front Lever Row'
      }
    ]
  }
];

const strengthRoutine = [
  'pull-up',
  'dipping',
  'pull-up',
  'dipping',
  'pull-up',
  'dipping',
  'squat',
  'l-sit',
  'squat',
  'l-sit',
  'squat',
  'l-sit',
  'push-up',
  'row',
  'push-up',
  'row',
  'push-up',
  'row'
];

// Display screen
function displayScreen(screen) {
  $('.screen:not(.' + screen + ')').hide();
  $('.screen.' + screen).show().css('display', 'flex');
  currentScreen = screen;
  if (screen === 'bodyline') {
    setupBodylineExercise();
  } else if (screen === 'strength') {
    setupStrengthExercise();
  }
}

// Setup new bodyline exercise
function setupBodylineExercise(i) {
  if (!i) i = 0;
  exerciseNumber = i;
  let count = bodyline.length;
  if (i < count) {
    $('.bodyline .exercise-name').html(bodyline[i].name);
    currentExercise = bodyline[i].id;
    if (getLastSet(bodyline[i].id)) {
      $('.bodyline .timer-value').html(getLastSet(bodyline[i].id).timeReps);
    } else {
      $('.bodyline .timer-value').html(defaultTimer);
    }
    $('.bodyline .times-up').hide();
    $('.bodyline .completed-message').hide();
    $('.bodyline .timer-up, .bodyline .timer-down, .bodyline .timer-value').show();
    $('.bodyline .completed').removeClass('show');
    $('.bodyline .next-btn').addClass('show');
  } else {
    setupScreen('strength');
  }
}

// Setup new strength exercise
function setupStrengthExercise(i) {
  if (!i) i = 0;
  exerciseNumber = i;
  let count = strengthRoutine.length;
  if (i < count) {
    setupProgression(strengthRoutine[i]);
    let lastSets = getLastSet(strengthRoutine[i]);
    if (lastSets) {
      let lastProgression = getProgression(lastSets.progression);
      let html = 'Last time: ';
      html += lastProgression.name;
      for (var x = 0; x < lastSets.timeReps.length; x++) {
        html += ' <span>' + lastSets.timeReps[x] + '</span>';
      }
      $('.last-sets').html(html);

    }
    $('.strength .exercise-name').html(getExerciseName(strengthRoutine[i]));
    currentExercise = bodyline[i].id;
    if (getLastSet(bodyline[i].id)) {
      $('.strength .timer-value').html(getLastSet(bodyline[i].id));
    } else {
      $('.strength .timer-value').html(defaultTimer);
    }
    //$('.strength .timer').hide();
    $('.strength .completed-message').hide();
    $('.strength .timer-up, .strength .timer-down, .strength .timer-value').show();
    $('.strength .completed').removeClass('show');
    $('.strength .next-btn').addClass('show');
  } else {
    // Done
  }
}

// Populate drop down with progression options
// Pass in exercise id
function setupProgression(id) {
  $('.strength .progression').html('');
  let progression = getProgressions(id);
  let html = '';
  for (var i = 0; i < progression.length; i++) {
    html += '<option value="' + progression[i].id + '">' + progression[i].name + '</option>';
  }
  $('.strength .progression').append(html);
}

// Get exercise from exercise id
function getExerciseName(id) {
  for (var i = 0; i < strength.length; i++) {
    if (id === strength[i].id) {
      return strength[i].name;
    }
  }
}

// Get progressions from exercise id
function getProgressions(id) {
  for (var i = 0; i < strength.length; i++) {
    if (id === strength[i].id) {
      return strength[i].progression;
    }
  }
}

// Get progression from progression id
function getProgression(id) {
  let progression = {};
  for (var i = 0; i < strength.length; i++) {
    $.each(strength[i].progression, function(x){
      if (this.id === id) {
        progression = this;
      }
    });
  }
  return progression;
}

// Save exercise to local storage
/* exercise    = Exercise id
   timeReps    = Time inseconds (int) or sets (arr) eg. [5,4,4]
   completed   = Whether bodyline exercise was completed (bool). Set as true if strength exercise
   progression = Progression id (int)
*/
function saveExercise(exercise, timeReps, completed, progression) {
  let newData = [];
  if (!progression) {
    let progression = 0;
  }
  let exerciseData = {
    date: new Date().getTime(),
    timeReps: timeReps,
    completed: completed,
    progression: progression
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

// Get last set from exercise id
function getLastSet(exercise) {
  let savedData = JSON.parse(localStorage.getItem(exercise));
  if (savedData !== null) {
    return savedData[savedData.length -1];
  } else {
    return false;
  }
}

// Calculate next sets based on previous sets (arr) eg. [5,4,4]
function calculateSets(previousSets) {
  let totalReps = 1;
  const sets = 3;
  let newSets = [];
  for (var i = 0; i < previousSets.length; i++) {
    totalReps = totalReps + previousSets[i];
  }
  let averageReps = Math.floor(totalReps / sets);
  let leftOverReps = totalReps - (sets * averageReps);
  for (var i = 0; i < sets; i++) {
    newSets.push(averageReps);
  }
  for (var i = 0; i < leftOverReps; i++) {
    newSets[i] = newSets[i] + 1;
  }
  return newSets;
}

displayScreen(currentScreen);

/** === Event Listeners === **/

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
