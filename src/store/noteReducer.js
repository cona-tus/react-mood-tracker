import { produce } from 'immer';

export default function noteReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE': {
      return produce(state, (draft) => {
        const { note } = action;
        draft.notes.unshift({ ...note }); // payload : note
      });
    }
    case 'REMOVE_NOTE':
      return produce(state, (draft) => {
        const { id } = action;
        const noteIndex = draft.notes.findIndex((note) => note.id === id); // payload : note.id
        if (noteIndex < 0) return;
        draft.notes.splice(noteIndex, 1);
      });
    case 'CREATE_JOURNAL':
      return produce(state, (draft) => {
        const { id, journal } = action;
        const note = draft.notes.find((note) => note.id === id); // payload : note.id
        note.journalList.push({ ...journal });
      });
    case 'EDIT_JOURNAL':
      return produce(state, (draft) => {
        const { id, journal } = action;
        const note = draft.notes.find((note) => note.id === id); // payload : note.id
        let journalIndex = note.journalList.findIndex(
          (item) => item.journalId === journal.journalId
        ); // payload : journal
        if (journalIndex < 0) return;
        note.journalList[journalIndex] = { ...journal };
      });
    case 'REMOVE_JOURNAL':
      return produce(state, (draft) => {
        const { id, journalId } = action;
        const note = draft.notes.find((note) => note.id === id); // payload : note.id
        const journalIndex = note.journalList.findIndex(
          (item) => item.journalId === journalId
        );
        if (journalIndex < 0) return;
        note.journalList.splice(journalIndex, 1);
      });
    default:
      return state;
  }
}
