import React, { useContext, useRef, useState } from 'react';
import { NoteDispatchContext } from '../../App';
import { getStringDate } from '../../util/date';
import styles from './NewNote.module.css';

const curDate = new Date();
const minDate = getStringDate(
  new Date(curDate.getFullYear(), curDate.getMonth(), 1)
);
const maxDate = getStringDate(
  new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0)
);

export default function NewNote() {
  const { onAddNote } = useContext(NoteDispatchContext);
  const [note, setNote] = useState({
    id: '',
    title: '',
    startDate: getStringDate(new Date()),
    endDate: getStringDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        curDate.getDate() + 14
      )
    ),
    journalList: [],
  });
  const titleRef = useRef();

  const handleChangeNote = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();

    if (note.title.length < 1) {
      titleRef.current.focus();
      return;
    }

    if (note.startDate > note.endDate) {
      alert('종료일은 시작일보다 앞설 수 없습니다. 날짜를 다시 선택해주세요.');
      return;
    }

    if (note.startDate === note.endDate) {
      alert('시작일과 종료일을 다른 날짜로 선택해주세요.');
      return;
    }

    onAddNote(note);

    setNote({
      id: '',
      title: '',
      startDate: getStringDate(new Date()),
      endDate: getStringDate(
        new Date(
          curDate.getFullYear(),
          curDate.getMonth(),
          curDate.getDate() + 14
        )
      ),
      journalList: [],
    });
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmitNote}>
        <div className={styles.controls}>
          <input
            ref={titleRef}
            className={styles['input__title']}
            type='text'
            name='title'
            placeholder='이 기간의 목표가 있나요?'
            maxLength='15'
            value={note.title}
            onChange={handleChangeNote}
          />
        </div>
        <div className={styles.controls}>
          <input
            className={styles['input__date']}
            type='date'
            name='startDate'
            value={note.startDate}
            min={minDate}
            max={maxDate}
            onChange={handleChangeNote}
          />
          <input
            className={styles['input__date']}
            type='date'
            name='endDate'
            value={note.endDate}
            min={minDate}
            max={maxDate}
            onChange={handleChangeNote}
          />
        </div>
        <div className={styles.action}>
          <button className={styles['btn__submit']} type='submit'>
            저장하기
          </button>
        </div>
      </form>
    </section>
  );
}
