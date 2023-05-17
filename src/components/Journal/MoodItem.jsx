import React from 'react';

// styles
import styles from './MoodItem.module.css';

export default function MoodItem({ mood, onClick, isSelected }) {
  const { mood_id, mood_descript } = mood;

  const moodClasses = isSelected
    ? styles[`mood_on_${mood_id}`]
    : styles['mood_off'];

  return (
    <li
      className={`${styles.mood}  ${moodClasses}`}
      onClick={() => onClick(mood_id)}
    >
      <p className={styles.descript}>{mood_descript}</p>
    </li>
  );
}
