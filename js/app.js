class CalorieTrack {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this.#displayCalorieLimit();
    this.#displayTotalCalories();
    this.#caloriesConsumed();
    this.#caloriesBurned();
    this.#displayRemainingCalories();
  }

  //public methods

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this.#renderer();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this.#renderer();
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
    console.log(mealsCalories);
    document.getElementById('calories-remaining').innerText = mealsCalories;
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

  #renderer() {
    this.#displayTotalCalories();
    this.#caloriesConsumed();
    this.#caloriesBurned();
    this.#displayRemainingCalories();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const track = new CalorieTrack();

const breakfast = new Meal('breakfast', 300);
track.addMeal(breakfast);
const lunch = new Meal('lunch', 200);
track.addMeal(lunch);
const jump = new Workout('jumping jacks', 100);
track.addWorkout(jump);

console.log(track._totalCalories);
