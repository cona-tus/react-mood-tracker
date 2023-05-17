import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// components
import JournalEditor from '../components/Journal/JournalEditor';

export default function NewJournal() {
  const {
    state: { note },
  } = useLocation();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `moodLog | 일기 작성`;
  }, []);

  return (
    <>
      <JournalEditor note={note} />
    </>
  );
}
