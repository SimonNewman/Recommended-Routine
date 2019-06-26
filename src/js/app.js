let currentScreen = 'welcome';
//let currentScreen = 'bodyline';
//let currentScreen = 'strength';
let exerciseNumber,
    seconds,
    currentExercise,
    setsCompleted = [],
    //rest = 90,
    rest = 1;

// Sound
const doneSound = new Audio('sound/243020__plasterbrain__game-start.ogg');
doneSound.loop = false;

//const defaultTimer = 10;
const defaultTimer = 1;
const defaultReps = 5;

let db = new PouchDB('workoutLog');
let aWorkout = {
  _id: new Date().toISOString(),
  exercises: [
    {
      id: 3,
      reps: [7,6,5]
    },
    {
      id: 8,
      reps: [5,5,5]
    },
  ],
  completed: true
};
/*
db.put(aWorkout, function callback(err, result) {
  if (!err) {
    console.log('Successfully posted a workout!');
  }
});
*/



function showData() {
  $('.data').html(JSON.stringify(localStorage));
}

function deleteData() {
  let r = confirm("Are you sure you want to delete all data?");
  if (r) {
    localStorage.clear();
  }
}

function slugify(string) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

// Get Exercises
let exercises = [];
$.ajax({
  type: 'GET',
  cache: true,
  dataType: 'json',
  url: 'data/exercises.json',
  success: function(result) {
    result.forEach((exerciseData) => {
      let exercise = new Exercise(exerciseData);
      exercises.push(exercise);
    });
  },
  error: function() {

  }
});

// Get Progressions
let progressions = [];
$.ajax({
  type: 'GET',
  cache: true,
  dataType: 'json',
  url: 'data/progressions.json',
  success: function(result) {
    result.forEach((progressionData) => {
      let progression = new Progression(progressionData);
      progressions.push(progression);
    });
  },
  error: function() {

  }
});

// Get Routines
let routines = [];
$.ajax({
  type: 'GET',
  cache: true,
  dataType: 'json',
  url: 'data/routines.json',
  success: function(result) {
    result.forEach((routineData) => {
      let routine = new Routine(routineData);
      routines.push(routine);
    });
  },
  error: function() {

  }
});

// Get Workouts
let workouts = [];
db.allDocs({
  include_docs: true,
  attachments: true
}).then((result) => {
  result.rows.forEach((log) => {
    workouts.push(log.doc);
  });
}).catch(function (err) {
  console.log(err);
});

// Display screen
function displayScreen(screen) {
  $('.screen:not(.' + screen + ')').hide();
  $('.screen.' + screen).show().css('display', 'flex');
  currentScreen = screen;
}

displayScreen(currentScreen);

/*
// Update workout
db.get('2019-06-23T15:52:57.677Z').then(function(doc) {
  return db.put({
    _id: '2019-06-23T15:52:57.677Z',
    _rev: '5-454d64291a6a9996a414e9ceb8e8ddbc',
    routineId: 1,
    exercises: [
      {
        id: 3,
        sets: [3,4,4]
      },
      {
        id: 8,
        sets: [5,5,5]
      }
    ]
  });
}).then(function(response) {
  // handle response
}).catch(function (err) {
  console.log(err);
});
*/

/*
// Example create
db.put({
  _id: new Date().toJSON(),
  routineId: 1,
  exercises: [
    {
      id: 3,
      sets: [3,2,4]
    },
    {
      id: 8,
      sets: [4,5,5]
    }
  ]
}).then(function (response) {
  // handle response
}).catch(function (err) {
  console.log(err);
});
*/

let startTime, endTime;

function start() {
  startTime = new Date();
}

function end() {
  endTime = new Date();
  let timeDiff = endTime - startTime;
  console.log(timeDiff + " ms");
}