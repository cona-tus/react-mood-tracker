import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import JournalEditor from '../components/Journal/JournalEditor';
import { NoteStateContext } from '../App';

export default function EditJournal() {
  const [originData, setOriginData] = useState();
  const {
    state: { note },
  } = useLocation();
  const navigate = useNavigate();
  const { journalId } = useParams();

  const notes = useContext(NoteStateContext);
  const noteData = notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  useEffect(() => {
    if (journalList.length > 0) {
      const targetJournal = journalList.find(
        (journal) => journal.journalId === journalId
      );

      if (targetJournal) {
        setOriginData(targetJournal);
      } else {
        navigate(`/note/${note.id}`, { replace: true });
      }
    }
  }, [journalId, journalList, navigate, note.id]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `moodLog | 일기 수정`;
  }, []);

  return (
    <>
      {originData && (
        <JournalEditor isEdit={true} originData={originData} note={note} />
      )}
    </>
  );
}
