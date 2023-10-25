import React, { useContext } from 'react';
import { NoteStateContext } from '../../App';
import JournalItem from './JournalItem';
import styles from './JournalList.module.css';

export default function JournalList({ note }) {
  const notes = useContext(NoteStateContext);
  const noteData = notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  const sortedList = [...journalList].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return (
    <section>
      {journalList.length === 0 && (
        <p className={styles.fallback}>
          기록이 없습니다. 새로운 일기를 작성해보세요.
        </p>
      )}
      {journalList && (
        <ul>
          {sortedList.map((journal) => (
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
