function Routine(routine) {
  this.id = routine.id;
  this.name = routine.name;
  this.minReps = routine.minReps;
  this.maxReps = routine.maxReps;
  this.routine = [];
  this.progressions = [];

  routine.routine.forEach(progression => {
    this.routine.push(getProgression(progression));
  });

  this.view = function() {
    let html = '';
    $('.screen.routine #routine-title').html(this.name);
    console.log(this.routine);
    $('.screen.routine .list').html(html);
    displayScreen('routine');
  };

  this.getProgressions = function() {
    let routine = [];
    let progressionIds = [ ...new Set(routine.routine)];
    progressionIds.forEach(id => {
      routine.push(getProgression(id));
    });
  };

  this.getNextWorkout = function() {
    let nextWorkout = new Workout(this.id).getNextWorkout();
    return nextWorkout;
  };
}

// Get routine
function getRoutine(id) {
  return routines.find(routine => routine.id === id);
}

// View routine
function viewRoutine(id) {
  let routine = getRoutine(id);
  routine.view();
  console.log(routine.getNextWorkout());
}

// View all routines
function viewRoutines() {
  let html = '';
  routines.forEach((routine) => {
    html += `<li onclick="viewRoutine(${routine.id})">${routine.name}</li>`;
  });
  $('.screen.routines .list').html(html);
  displayScreen('routines');
}
