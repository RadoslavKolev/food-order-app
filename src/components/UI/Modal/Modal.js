import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

// Dark screen background - if we click, it closes the modal
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideCart} />
};

// The Cart Wrapper
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  );
};

// The element, where the modal should be placed (outside of <div id="root"></div>)
const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {
        ReactDOM.createPortal(
          <Backdrop onHideCart={props.onHideCart} />,
          portalElement
        )
      }
      {
        ReactDOM.createPortal(
          // props.children - everything between the Modal component
          <ModalOverlay>{props.children}</ModalOverlay>,
          portalElement
        )
      }
    </React.Fragment>
  );
};

export default Modal;