import React, { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// 리듀서
import noteReducer from './store/noteReducer';

// 컨텍스트 생성
export const NoteStateContext = createContext();
export const NoteDispatchContext = createContext();

// 초기 노트 상태
const initNotes = [];

// 로컬스토리지에서 데이터 가져오기
function getNotes() {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : initNotes;
}

function App() {
  const [notes, noteDispatch] = useReducer(noteReducer, getNotes());

  // 새로운 노트 생성
  const onAddNote = (note) => {
    noteDispatch({
      type: 'ADD_NOTE',
      note: {
        ...note,
        id: uuidv4(),
      },
    });
  };

  // 노트 삭제
  const onRemoveNote = (noteId) => {
    noteDispatch({
      type: 'REMOVE_NOTE',
      id: noteId,
    });
  };

  // 일기 생성
  const onCreateJournal = (noteId, journal) => {
    noteDispatch({
      type: 'CREATE_JOURNAL',
      id: noteId,
      journal: {
        ...journal,
        journalId: uuidv4(),
      },
    });
  };

  // 일기 수정
  const onEditJournal = (noteId, targetId, journal) => {
    noteDispatch({
      type: 'EDIT_JOURNAL',
      id: noteId,
      journal: {
        ...journal,
        journalId: targetId,
      },
    });
  };

  // 일기 삭제
  const onRemoveJournal = (noteId, targetId) => {
    noteDispatch({
      type: 'REMOVE_JOURNAL',
      id: noteId,
      journalId: targetId,
    });
  };

  // 노트 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <NoteStateContext.Provider value={notes}>
        <NoteDispatchContext.Provider
          value={{
            onAddNote,
            onRemoveNote,
            onCreateJournal,
            onEditJournal,
            onRemoveJournal,
          }}
        >
          <Outlet />
        </NoteDispatchContext.Provider>
      </NoteStateContext.Provider>
    </>
  );
}

export default App;
