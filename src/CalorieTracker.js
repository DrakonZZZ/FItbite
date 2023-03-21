import LocalStorage from './LocalStorage';

class CalorieTrack {
  constructor() {
    this._calorieLimit = LocalStorage.calorieLimit();
    document.getElementById('limit').value = this._calorieLimit;
    this._totalCalories = LocalStorage.totalCalories();
    this._meals = LocalStorage.getfood();
    this._workouts = LocalStorage.getWorkout();
    this.#displayCalorieLimit();
    this.#displayTotalCalories();
    this.#caloriesConsumed();
    this.#caloriesBurned();
    this.#displayRemainingCalories();
    this.#displayProgress();
  }

  //public methods

  addMeal(meal) {
    this._meals.push(meal);
    this.#displayMeal(meal);
    this._totalCalories += meal.calories;
    this.#renderer();
    LocalStorage.setFood(meal);
    LocalStorage.setCalorieTotal(this._totalCalories);
  }

  removeMeal(id) {
    const idx = this._meals.findIndex((meal) => meal.id === id);
    if (idx !== -1) {
      console.log(idx);
      const meal = this._meals[idx];
      this._meals.splice(idx, 1);
      this._totalCalories -= meal.calories;
      this.#renderer();
    }
    LocalStorage.delFood(id);
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this.#displayWorkout(workout);
    this._totalCalories -= workout.calories;
    this.#renderer();
    LocalStorage.setWorkout(workout);
    LocalStorage.setCalorieTotal(this._totalCalories);
  }

  removeWorkout(id) {
    const idx = this._workouts.findIndex((workout) => workout.id === id);
    if (idx !== -1) {
      const workout = this._workouts[idx];
      this._workouts.splice(idx, 1);
      this._totalCalories -= workout.calories;
      this.#renderer();
    }
    LocalStorage.delWorkout(id);
  }

  setLimit(value) {
    this._calorieLimit = value;
    LocalStorage.setCalorieLimit(value);
    this.#renderer();
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this.#renderer();
    LocalStorage.resetStorage();
  }

  itemsLoad() {
    this._meals.forEach((item) => {
      this.#displayMeal(item);
    });
    this._workouts.forEach((item) => {
      this.#displayWorkout(item);
    });
  }

  //private methods
  #displayCalorieLimit() {
    document.getElementById('calories-limit').innerText = this._calorieLimit;
  }

  #displayTotalCalories() {
    const totalCalorieEl = document.getElementById('calories-total');
    totalCalorieEl.innerText = this._totalCalories;
  }

  #displayRemainingCalories() {
    const mealsCalories = this._calorieLimit - this._totalCalories;
    const progress = document.getElementById('progress-calorie');
    const remainingCalories = document.getElementById('calories-remaining');
    remainingCalories.innerText = mealsCalories;
    if (remainingCalories.innerText < 0) {
      remainingCalories.parentElement.parentElement.classList.add('bg-danger');
      remainingCalories.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      progress.classList.remove('bg-success');
      progress.classList.add('bg-danger');
    } else {
      remainingCalories.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      remainingCalories.parentElement.parentElement.classList.add('bg-light');
      progress.classList.remove('bg-danger');
      progress.classList.add('bg-success');
    }
  }

  #caloriesConsumed() {
    const consumedMeals = this._meals.reduce(
      (acc, num) => acc + num.calories,
      0
    );
    document.getElementById('calories-consumed').innerText = consumedMeals;
  }

  #caloriesBurned() {
    const burnedCal = this._workouts.reduce(
      (acc, num) => acc + num.calories,
      0
    );
    document.getElementById('calories-burned').innerText = burnedCal;
  }

  #displayMeal(meal) {
    const mealsEl = document.getElementById('meal-items');
    const newEl = document.createElement('div');
    newEl.className = 'card my-2';
    newEl.setAttribute('data-id', `${meal.id}`);
    newEl.innerHTML = `
      <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${meal.name}</h4>
        <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
          ${meal.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>`;
    mealsEl.appendChild(newEl);
  }

  #displayWorkout(workout) {
    const workoutEl = document.getElementById('workout-items');
    const newEl = document.createElement('div');
    newEl.className = 'card my-2';
    newEl.setAttribute('data-id', `${workout.id}`);
    newEl.innerHTML = `<div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${workout.name}</h4>
        <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
          ${workout.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>`;
    workoutEl.appendChild(newEl);
  }

  #displayProgress() {
    const progress = document.getElementById('progress-calorie');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    progress.style.width = `${percentage}%`;
  }

  #renderer() {
    this.#displayTotalCalories();
    this.#displayCalorieLimit();
    this.#caloriesConsumed();
    this.#caloriesBurned();
    this.#displayRemainingCalories();
    this.#displayProgress();
  }
}

export default CalorieTrack;
