import React from 'react';

// styles
import styles from './HeaderButton.module.css';

export default function HeaderButton({ text, type, onClick }) {
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
  const btnClasses = `${styles.btn} ${styles[`btn__${btnType}`]}`;

  return (
    <button className={btnClasses} onClick={onClick}>
      {text}
    </button>
  );
}

HeaderButton.defaultProps = {
  type: 'default',
};
