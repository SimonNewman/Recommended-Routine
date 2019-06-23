function Exercise(exercise) {
  this.id = exercise.id;
  this.name = exercise.name;
  this.type = exercise.type;
  this.weight = exercise.weight;
  this.reps = exercise.reps;

  /*
  this.getHistory = function() {
    return workoutHistory.reps.filter(workout => workout.exercise === this.id);
  };
  */

  this.lastSets = function() {
    let lastSets = workoutHistory.reps.find(workout => workout.exercise === this.id);
    if (lastSets) {
      return lastSets;
    } else {
      return false;
    }
  };

  this.view = function() {
    $('.screen.exercise #exercise-title').html(this.name);
    let html = `
      <p>Type: ${exercise.type}<br>
      Reps: ${exercise.reps}</p>
    `;
    $('.screen.exercise .content').html(html);
    /*
    html = '';
    this.getHistory().forEach(sets => {
      html += sets.reps;
    });
    $('.screen.exercise .list').html(html);
    */
    displayScreen('exercise');
  };

  this.calculateNextSets = function(sets, minReps, maxReps) {
    let promotion = false;
    let nextSets = [];
    let nextReps = 0;
    if (this.lastSets()) {
      nextReps = this.lastSets().reps.reduce((a, b) => a + b, 0) + 1;
    } else {
      for (let i = 0; i < sets; i++) {
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

    let averageReps = Math.floor(nextReps / sets);
    let leftOverReps = nextReps - (sets * averageReps);
    for (let i = 0; i < sets; i++) {
      nextSets.push(averageReps);
    }
    for (let i = 0; i < leftOverReps; i++) {
      nextSets[i] = nextSets[i] + 1;
    }

    return {
      promotion: promotion,
      nextSets: nextSets
    };
  };
}

// Get exercise
function getExercise(id) {
  return exercises.find(exercise => exercise.id === id);
}

// View exercise
function viewExercise(id) {
  let exercise = getExercise(id);
  exercise.view();
}

// View all exercises
function viewExercises() {
  let html = '';
  exercises.forEach((exercise) => {
    html += `<li onclick="viewExercise(${exercise.id})">${exercise.name}</li>`;
  });
  $('.screen.exercises .list').html(html);
  displayScreen('exercises');
}
