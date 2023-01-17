import React, { useRef, useState } from 'react';
import Input from '../../UI/Input/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    // Prevents refreshing the page when submitting
    event.preventDefault();

    // Gets the entered amount via "useRef()"
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; // Cast to number

    // Validation
    if (
      enteredAmount.trim().length === 0 || 
      enteredAmountNumber < 1 || 
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* "ref" property doesn't work on custom made components. It uses "forwardRef" */}
      <Input 
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;