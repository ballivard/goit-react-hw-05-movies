import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, name, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    className={styles.Button}
    disabled={disabled}
  >
    {name}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;