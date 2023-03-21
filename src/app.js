import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, Collapse } from 'bootstrap';
import '@fontsource/roboto';
import './css/style.css';

import CalorieTrack from './CalorieTracker';
import { Meal, Workout } from './ItemModule';

class App {
  constructor() {
    this.tracker = new CalorieTrack();
    this.tracker.itemsLoad();
    this.#eventHandlers();
  }

  #newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);
    const collapse = document.getElementById(`collapse-${type}`);
    const bootCollpase = new Collapse(collapse, {
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

  #setLimit(e) {
    e.preventDefault();
    const limitCalorie = document.getElementById('limit');
    if (limitCalorie.value === '') {
      alert('please enter a limit');
      return;
    }
    this.tracker.setLimit(parseInt(limitCalorie.value));
    limitCalorie.value = '';
    const modalEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }

  #eventHandlers() {
    document
      .getElementById('limit-form')
      .addEventListener('submit', this.#setLimit.bind(this));
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
}

const app = new App();
