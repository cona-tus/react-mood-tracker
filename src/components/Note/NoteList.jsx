import React, { useContext } from 'react';
import { NoteStateContext } from '../../App';
import NoteItem from './NoteItem';
import { FaCalendarCheck } from 'react-icons/fa';
import styles from './NoteList.module.css';

export default function NoteList() {
  const notes = useContext(NoteStateContext);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.icon}>
          <FaCalendarCheck />
        </span>
        기록
      </h2>
      {notes.length === 0 && (
        <p className={styles.fallback}>기록이 없습니다. 기간을 설정해보세요.</p>
      )}
      {notes && (
        <ul className={styles.notes}>
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ul>
      )}
    </section>
  );
}
