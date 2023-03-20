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
    this.#displayProgress();
  }

  //public methods

  addMeal(meal) {
    this._meals.push(meal);
    this.#displayMeal(meal);
    this._totalCalories += meal.calories;
    this.#renderer();
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
    console.log(this._meals);
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this.#displayWorkout(workout);
    this._totalCalories -= workout.calories;
    this.#renderer();
  }

  removeWorkout(id) {
    const idx = this._workouts.findIndex((workout) => workout.id === id);
    if (idx !== -1) {
      const workout = this._workouts[idx];
      this._workouts.splice(idx, 1);
      this._totalCalories -= workout.idx;
      this.#renderer();
    }
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
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
    this.#caloriesConsumed();
    this.#caloriesBurned();
    this.#displayRemainingCalories();
    this.#displayProgress();
  }
}

class App {
  constructor() {
    this.tracker = new CalorieTrack();
    document
      .getElementById('meal-form')
      .addEventListener('submit', this.#newItem.bind(this, 'meal'));
    document
      .getElementById('workout-form')
      .addEventListener('submit', this.#newItem.bind(this, 'workout'));
    document
      .getElementById('meal-items')
      .addEventListener('click', this.#deleteItem.bind(this, 'meal'));
    document
      .getElementById('workout-items')
      .addEventListener('click', this.#deleteItem.bind(this, 'workout'));
    document
      .getElementById('filter-meals')
      .addEventListener('keyup', this.#filter.bind(this, 'meal'));
    document
      .getElementById('filter-workouts')
      .addEventListener('keyup', this.#filter.bind(this, 'workout'));
    document
      .getElementById('reset')
      .addEventListener('click', this.#reset.bind(this));
  }

  #newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);
    const collapse = document.getElementById(`collapse-${type}`);
    const bootCollpase = new bootstrap.Collapse(collapse, {
      toggle: true,
    });
    if (name.value === '' && calories.value === '') {
      alert('Please fill the field');
      return;
    }

    if (type === 'meal') {
      const item = new Meal(name.value, calories.value);
      this.tracker.addMeal(item);
    } else {
      const item = new Workout(name.value, calories.value);
      this.tracker.addWorkout(item);
    }

    name.value = '';
    calories.value = '';
  }

  #deleteItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      const id = e.target.closest('.card').getAttribute('data-id');
      if (confirm('are your sure?')) {
        type === 'meal'
          ? this.tracker.removeMeal(id)
          : this.tracker.removeWorkout(id);
        const parentEl = e.target.closest('.card');
        parentEl.remove();
      }
    }
  }

  #filter(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  #reset() {
    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';
    document.getElementById('filter-meals').value = '';
    document.getElementById('filter-workouts').value = '';
    this.tracker.reset();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = +calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = +calories;
  }
}

const app = new App();
