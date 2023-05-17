import React, { useContext } from 'react';
import { NoteStateContext } from '../../App';

// components
import JournalItem from './JournalItem';

// styles
import styles from './JournalList.module.css';

export default function JournalList({ note }) {
  const noteList = useContext(NoteStateContext);
  const { notes } = noteList;
  const noteData = notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  return (
    <section>
      {journalList.length === 0 && (
        <p className={styles.fallback}>
          기록이 없습니다. 새로운 일기를 작성해보세요.
        </p>
      )}
      {journalList && (
        <ul>
          {journalList.map((journal) => (
            <JournalItem
              key={journal.journalId}
              journal={journal}
              note={note}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
