import React from 'react';

import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem';

import { DUMMY_MEALS } from '../../../data/dummy-meals';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  // List of all the meals in DUMMY_MEALS
  const mealsList = DUMMY_MEALS.map(meal => (
    <MealItem 
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;