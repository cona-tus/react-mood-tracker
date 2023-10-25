import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JournalItem.module.css';
import { tagList } from '../../util/tag';

export default function JournalItem({ note, journal }) {
  const { journalId, createdAt, content, mood, tag } = journal;
  const navigate = useNavigate();

  const moodClasses = styles[`mood_on_${mood}`];
  const tagItem = tagList.find((item) => item.tag_id === tag);

  return (
    <li
      className={`${styles.journal} ${moodClasses}`}
      onClick={() => navigate(`/edit/${journalId}`, { state: { note } })}
    >
      <div className={styles.info}>
        <span className={styles.tag}>{tagItem.tag_img}</span>
        <span className={styles.date}>{`${createdAt.split('-')[1]}월 ${
          createdAt.split('-')[2]
        }일`}</span>
      </div>
      <p className={styles.content}>{content}</p>
    </li>
  );
}
