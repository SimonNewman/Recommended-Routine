function Workout(routineId) {
  let routine = getRoutine(routineId);

  this.id = routine.id;
  this.name = routine.name;

  this.getLastWorkout = function() {
    let workouts = workoutHistory.workouts.filter(workout => workout.id === this.id);
    if (workouts.length) {
      return workouts.slice(-1)[0];
    }
  };

  this.getNextWorkout = function() {
    let lastWorkout = this.getLastWorkout();
    return lastWorkout;
  };
}