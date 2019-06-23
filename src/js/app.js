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
db.allDocs({include_docs: true, descending: true}, function(err, doc) {
  console.log(doc.rows);
});

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
    console.log(progressions);
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

// Get History
// TODO
/*
let workoutHistory = [];
$.ajax({
  type: 'GET',
  cache: false,
  dataType: 'json',
  url: 'data/history.json',
  success: (result) => {
    workoutHistory = result;
  },
  error: (error) => {

  }
});
*/

// Display screen
function displayScreen(screen) {
  $('.screen:not(.' + screen + ')').hide();
  $('.screen.' + screen).show().css('display', 'flex');
  currentScreen = screen;
}

displayScreen(currentScreen);
