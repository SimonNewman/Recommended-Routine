function Workout(routineId) {
  let routine = getRoutine(routineId);

  this.routineId = routine.id;

  this.getWorkouts = function() {
    return workouts.filter(workout => workout.routineId === this.routineId);
  };

  this.getLastWorkout = function() {
    return workouts.find(workout => workout.routineId === this.routineId);
  };

  this.getNextWorkout = function() {
    let lastWorkout = this.getLastWorkout();
    return lastWorkout;
  };
}