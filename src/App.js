import React, { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// reducer
import noteReducer from './store/noteReducer';

// context
export const NoteStateContext = createContext();
export const NoteDispatchContext = createContext();

// initialState
const noteInitialState = {
  notes: [],
};

// get Data from LocalStorage
function getItem() {
  const noteState = localStorage.getItem('noteState');
  return noteState ? JSON.parse(noteState) : noteInitialState;
}

function App() {
  const [noteState, noteDispatch] = useReducer(noteReducer, getItem());

  const onAddNote = (note) => {
    noteDispatch({
      type: 'ADD_NOTE',
      note: {
        ...note,
        id: uuidv4(),
      },
    });
  };

  const onRemoveNote = (noteId) => {
    noteDispatch({
      type: 'REMOVE_NOTE',
      id: noteId,
    });
  };

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

  const onRemoveJournal = (noteId, targetId) => {
    noteDispatch({
      type: 'REMOVE_JOURNAL',
      id: noteId,
      journalId: targetId,
    });
  };

  useEffect(() => {
    localStorage.setItem('noteState', JSON.stringify(noteState));
  }, [noteState]);

  return (
    <>
      <NoteStateContext.Provider value={noteState}>
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
