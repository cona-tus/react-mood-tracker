import React from 'react';
import { Link } from 'react-router-dom';

// styles
import styles from './NotFound.module.css';
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

export default function NotFound() {
  return (
    <div className={styles.fallback}>
      <div className={styles.images}>
        <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt='logo' />
        <img src={process.env.PUBLIC_URL + '/assets/note.png'} alt='logo' />
        <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt='logo' />
      </div>
      <h1 className={styles.title}>페이지를 찾을 수 없습니다.</h1>
      <p className={styles.descript}>
        <Link className={styles.link} to='/'>
          여기
        </Link>
        를 눌러 메인 페이지로 돌아가보세요.
      </p>
    </div>
  );
}
