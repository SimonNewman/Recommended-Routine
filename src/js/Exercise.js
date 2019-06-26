function Exercise(exercise) {
  this.id     = exercise.id;
  this.name   = exercise.name;
  this.type   = exercise.type;
  this.weight = exercise.weight;
  this.reps   = exercise.reps;

  // Get history
  this.getHistory = function() {
    let history = [];
    let sets = [];
    workouts.forEach(workout => {
      sets = workout.exercises.find(exercise => exercise.id === this.id);
      if (sets != null) history.push(sets);
    });
    return history;
  };

  // Get the last sets
  this.getLastSets = function() {
    return this.getHistory()[0];
  };

  // View exercise
  this.view = function() {
    $('.screen.exercise #exercise-title').html(this.name);
    let html = `
      <p>ID: ${this.id}<br>
      Type: ${this.type}<br>
      Reps: ${this.reps}</p>
    `;
    $('.screen.exercise .content').html(html);
    html = '<h3>History</h3>';
    this.getHistory().forEach(history => {
      html += '<div>';
      history.sets.forEach(reps => {
        html += `<span>${reps}</span>`;
      });
      html += '</div>';
    });
    $('.screen.exercise .list').html(html);

    //console.log(this.calculateNextSets(3, 5, 8));
    displayScreen('exercise');
  };

  this.calculateNextSets = function(sets, minReps, maxReps) {
    let promotion = false;
    let nextSets = [];
    let nextReps = 0;
    if (this.getLastSets()) {
      nextReps = this.getLastSets().sets.reduce((a, b) => a + b, 0) + 1;
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
