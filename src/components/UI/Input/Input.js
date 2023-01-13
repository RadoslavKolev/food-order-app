import React from 'react';

import classes from './Input.module.css'

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* This will set the properties automatically, according to the "input" object */}
      <input {...props.input} />
    </div>
  );
};

export default Input;