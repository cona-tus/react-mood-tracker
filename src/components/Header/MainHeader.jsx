import React from 'react';

// styles
import styles from './MainHeader.module.css';

export default function MainHeader({ headText, leftChild, rightChild }) {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  return (
    <header className={styles['main-header']}>
      <div className={styles['head-btn__left']}>{leftChild}</div>
      <div className={styles['head-text']}>
        <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt='logo' />
        <h1 className={styles.title}>{headText}</h1>
      </div>
      <div className={styles['head-btn__right']}>{rightChild}</div>
    </header>
  );
}
