import React from 'react';

import classes from './Input.module.css'

// We can't use refs in Custom made components
// That's why we use React.forwardRef() and add "ref" to the input field
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* This will set the properties automatically, according to the "input" object */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;