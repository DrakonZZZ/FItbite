class LocalStorage {
  static calorieLimit(limit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = limit;
    } else {
      calorieLimit = parseInt(localStorage.getItem('calorieLimit'));
    }
    return calorieLimit;
  }

  static setCalorieLimit(limit) {
    localStorage.setItem('calorieLimit', limit);
  }

  static totalCalories(calories = 0) {
    let totalCalories;
    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = calories;
    } else {
      totalCalories = parseInt(localStorage.getItem('totalCalories'));
    }

    return totalCalories;
  }

  static setCalorieTotal(calories) {
    localStorage.setItem('totalCalories', calories);
  }

  static getfood() {
    let food;
    if (localStorage.getItem('Food-items') === null) {
      food = [];
    } else {
      food = JSON.parse(localStorage.getItem('Food-items'));
    }
    return food;
  }

  static setFood(food) {
    const foodItems = LocalStorage.getfood();
    foodItems.push(food);
    localStorage.setItem('Food-items', JSON.stringify(foodItems));
  }

  static delFood(id) {
    const foodItems = LocalStorage.getfood();
    foodItems.forEach((item, idx) => {
      if (item.id === id) {
        foodItems.splice(idx, 1);
      }
    });
    localStorage.setItem('Food-items', JSON.stringify(foodItems));
  }

  static getWorkout() {
    let workout;
    if (localStorage.getItem('Workout-items') === null) {
      workout = [];
    } else {
      workout = JSON.parse(localStorage.getItem('Workout-items'));
    }
    return workout;
  }

  static setWorkout(workout) {
    const workouts = LocalStorage.getWorkout();
    workouts.push(workout);
    localStorage.setItem('Workout-items', JSON.stringify(workouts));
  }

  static delWorkout(id) {
    const workouts = LocalStorage.getWorkout();
    workouts.forEach((item, idx) => {
      if (item.id === id) {
        workouts.splice(idx, 1);
      }
    });
    localStorage.setItem('Workout-items', JSON.stringify(workouts));
  }

  static resetStorage() {
    localStorage.removeItem('Food-items');
    localStorage.removeItem('Workout-items');
    localStorage.removeItem('totalCalories');
  }
}

export default LocalStorage;
