function Progression(progression) {
  this.id = progression.id;
  this.name = progression.name;
  this.exercises = [];

  progression.exercises.forEach(id => {
    this.exercises.push(getExercise(id));
  });

  this.view = function() {
    $('.screen.progression #progression-title').html(this.name);
    let html = '';
    this.exercises.forEach((exercise) => {
      html += `<li onclick="viewExercise(${exercise.id})">${exercise.name}</li>`;
    });
    $('.screen.progression .list').html(html);
    displayScreen('progression');
  };
}

// Get progression
function getProgression(id) {
  return progressions.find(progression => progression.id === id);
}

// View progression
function viewProgression(id) {
  let progression = getProgression(id);
  progression.view();
}

// View all progressions
function viewProgressions() {
  let html = '';
  progressions.forEach((progression) => {
    html += `<li onclick="viewProgression(${progression.id})">${progression.name}</li>`;
  });
  $('.screen.progressions .list').html(html);
  displayScreen('progressions');
}