import React from 'react';

// styles
import styles from './TagItem.module.css';

export default function TagItem({ tag, onClick, isSelected }) {
  const { tag_id, tag_img, tag_name } = tag;

  const tagClasses = isSelected ? styles['tag_on'] : styles['tag_off'];

  return (
    <li
      className={`${styles.tag}  ${tagClasses}`}
      onClick={() => onClick(tag_id)}
    >
      <p className={styles.name}>
        <span className={styles.icon}>{tag_img}</span>
        {tag_name}
      </p>
    </li>
  );
}
