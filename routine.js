"use strict";

function Exercise(exercise) {
  this.id = exercise.id;
  this.name = exercise.name;
  this.type = exercise.type;
  this.weight = exercise.weight;
  this.reps = exercise.reps; // Get history

  this.getHistory = function () {
    var _this = this;

    var history = [];
    var sets = [];
    workouts.forEach(function (workout) {
      sets = workout.exercises.find(function (exercise) {
        return exercise.id === _this.id;
      });
      if (sets != null) history.push(sets);
    });
    return history;
  }; // Get the last sets


  this.getLastSets = function () {
    return this.getHistory()[0];
  }; // View exercise


  this.view = function () {
    $('.screen.exercise #exercise-title').html(this.name);
    var html = "\n      <p>ID: ".concat(this.id, "<br>\n      Type: ").concat(this.type, "<br>\n      Reps: ").concat(this.reps, "</p>\n    ");
    $('.screen.exercise .content').html(html);
    html = '<h3>History</h3>';
    this.getHistory().forEach(function (history) {
      html += '<div>';
      history.sets.forEach(function (reps) {
        html += "<span>".concat(reps, "</span>");
      });
      html += '</div>';
    });
    $('.screen.exercise .list').html(html); //console.log(this.calculateNextSets(3, 5, 8));

    displayScreen('exercise');
  };

  this.calculateNextSets = function (sets, minReps, maxReps) {
    var promotion = false;
    var nextSets = [];
    var nextReps = 0;

    if (this.getLastSets()) {
      nextReps = this.getLastSets().sets.reduce(function (a, b) {
        return a + b;
      }, 0) + 1;
    } else {
      for (var i = 0; i < sets; i++) {
        nextSets.push(minReps);
      }

      return {
        promotion: promotion,
        nextSets: nextSets
      };
    }

    if (nextReps > sets * maxReps) {
      promotion = true;
    }

    var averageReps = Math.floor(nextReps / sets);
    var leftOverReps = nextReps - sets * averageReps;

    for (var _i = 0; _i < sets; _i++) {
      nextSets.push(averageReps);
    }

    for (var _i2 = 0; _i2 < leftOverReps; _i2++) {
      nextSets[_i2] = nextSets[_i2] + 1;
    }

    return {
      promotion: promotion,
      nextSets: nextSets
    };
  };
} // Get exercise


function getExercise(id) {
  return exercises.find(function (exercise) {
    return exercise.id === id;
  });
} // View exercise


function viewExercise(id) {
  var exercise = getExercise(id);
  exercise.view();
} // View all exercises


function viewExercises() {
  var html = '';
  exercises.forEach(function (exercise) {
    html += "<li onclick=\"viewExercise(".concat(exercise.id, ")\">").concat(exercise.name, "</li>");
  });
  $('.screen.exercises .list').html(html);
  displayScreen('exercises');
}
"use strict";

function Log() {}
"use strict";

function Progression(progression) {
  var _this = this;

  this.id = progression.id;
  this.name = progression.name;
  this.exercises = [];
  progression.exercises.forEach(function (id) {
    _this.exercises.push(getExercise(id));
  });

  this.view = function () {
    $('.screen.progression #progression-title').html(this.name);
    var html = '';
    this.exercises.forEach(function (exercise) {
      html += "<li onclick=\"viewExercise(".concat(exercise.id, ")\">").concat(exercise.name, "</li>");
    });
    $('.screen.progression .list').html(html);
    displayScreen('progression');
  };
} // Get progression


function getProgression(id) {
  return progressions.find(function (progression) {
    return progression.id === id;
  });
} // View progression


function viewProgression(id) {
  var progression = getProgression(id);
  progression.view();
} // View all progressions


function viewProgressions() {
  var html = '';
  progressions.forEach(function (progression) {
    html += "<li onclick=\"viewProgression(".concat(progression.id, ")\">").concat(progression.name, "</li>");
  });
  $('.screen.progressions .list').html(html);
  displayScreen('progressions');
}
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Routine(routine) {
  var _this = this;

  this.id = routine.id;
  this.name = routine.name;
  this.minReps = routine.minReps;
  this.maxReps = routine.maxReps;
  this.routine = [];
  this.progressions = [];
  routine.routine.forEach(function (progression) {
    _this.routine.push(getProgression(progression));
  });

  this.view = function () {
    var html = '';
    $('.screen.routine #routine-title').html(this.name);
    $('.screen.routine .list').html(html);
    displayScreen('routine');
  };

  this.getProgressions = function () {
    var routine = [];

    var progressionIds = _toConsumableArray(new Set(routine.routine));

    progressionIds.forEach(function (id) {
      routine.push(getProgression(id));
    });
  };

  this.getExercises = function () {};

  this.getNextWorkout = function () {
    var nextWorkout = new Workout(this.id).getNextWorkout();
    return nextWorkout;
  };
} // Get routine


function getRoutine(id) {
  return routines.find(function (routine) {
    return routine.id === id;
  });
} // View routine


function viewRoutine(id) {
  var routine = getRoutine(id);
  routine.view();
} // View all routines


function viewRoutines() {
  var html = '';
  routines.forEach(function (routine) {
    html += "<li onclick=\"viewRoutine(".concat(routine.id, ")\">").concat(routine.name, "</li>");
  });
  $('.screen.routines .list').html(html);
  displayScreen('routines');
}
"use strict";

function Workout(routineId) {
  var routine = getRoutine(routineId);
  this.routineId = routine.id;

  this.getWorkouts = function () {
    var _this = this;

    return workouts.filter(function (workout) {
      return workout.routineId === _this.routineId;
    });
  };

  this.getLastWorkout = function () {
    var _this2 = this;

    return workouts.find(function (workout) {
      return workout.routineId === _this2.routineId;
    });
  };

  this.getNextWorkout = function () {
    var lastWorkout = this.getLastWorkout();
    return lastWorkout;
  };
}
"use strict";

var currentScreen = 'welcome'; //let currentScreen = 'bodyline';
//let currentScreen = 'strength';

var exerciseNumber,
    seconds,
    currentExercise,
    setsCompleted = [],
    //rest = 90,
rest = 1; // Sound

var doneSound = new Audio('sound/243020__plasterbrain__game-start.ogg');
doneSound.loop = false; //const defaultTimer = 10;

var defaultTimer = 1;
var defaultReps = 5;
var db = new PouchDB('workoutLog');
var aWorkout = {
  _id: new Date().toISOString(),
  exercises: [{
    id: 3,
    reps: [7, 6, 5]
  }, {
    id: 8,
    reps: [5, 5, 5]
  }],
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
  var r = confirm("Are you sure you want to delete all data?");

  if (r) {
    localStorage.clear();
  }
}

function slugify(string) {
  var a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  var b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
  var p = new RegExp(a.split('').join('|'), 'g');
  return string.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(p, function (c) {
    return b.charAt(a.indexOf(c));
  }) // Replace special characters
  .replace(/&/g, '-and-') // Replace & with 'and'
  .replace(/[^\w\-]+/g, '') // Remove all non-word characters
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text
} // Get Exercises


var exercises = [];
$.ajax({
  type: 'GET',
  cache: true,
  dataType: 'json',
  url: 'data/exercises.json',
  success: function success(result) {
    result.forEach(function (exerciseData) {
      var exercise = new Exercise(exerciseData);
      exercises.push(exercise);
    });
  },
  error: function error() {}
}); // Get Progressions

var progressions = [];
$.ajax({
  type: 'GET',
  cache: true,
  dataType: 'json',
  url: 'data/progressions.json',
  success: function success(result) {
    result.forEach(function (progressionData) {
      var progression = new Progression(progressionData);
      progressions.push(progression);
    });
  },
  error: function error() {}
}); // Get Routines

var routines = [];
$.ajax({
  type: 'GET',
  cache: true,
  dataType: 'json',
  url: 'data/routines.json',
  success: function success(result) {
    result.forEach(function (routineData) {
      var routine = new Routine(routineData);
      routines.push(routine);
    });
  },
  error: function error() {}
}); // Get Workouts

var workouts = [];
db.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  result.rows.forEach(function (log) {
    workouts.push(log.doc);
  });
})["catch"](function (err) {
  console.log(err);
}); // Display screen

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

var startTime, endTime;

function start() {
  startTime = new Date();
}

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime;
  console.log(timeDiff + " ms");
}
//# sourceMappingURL=routine.js.map
