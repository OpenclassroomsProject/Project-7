import React from 'react';
import PropTypes from 'prop-types';

import { confirmable, createConfirmation } from 'react-confirm';

const Confirmation = ({
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  title = 'Confirmation',
  confirmation,
  show,
  proceed,
  enableEscape = true,
}) => {
  return (
    <div className='static-modal'>
      <div
      // animation={false}
      // show={show}
      // onHide={() => proceed(false)}
      // backdrop={enableEscape ? true : 'static'}
      // keyboard={enableEscape}
      >
        <header>
          <title>{title}</title>
        </header>
        <body>{confirmation}</body>
        <footer>
          <button onClick={() => proceed(false)}>{cancelLabel}</button>
          <button className='button-l' bsStyle='primary' onClick={() => proceed(true)}>
            {okLabel}
          </button>
        </footer>
      </div>
    </div>
  );
};

Confirmation.propTypes = {
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool,
};

export function confirm(
  confirmation,
  proceedLabel = 'OK',
  cancelLabel = 'cancel',
  options = {}
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}
