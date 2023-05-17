import React, { useContext } from 'react';
import { NoteStateContext } from '../../App';

// styles
import styles from './Statistics.module.css';
import { MdEventNote } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import { HiOutlineFaceFrown, HiOutlineFaceSmile } from 'react-icons/hi2';

export default function Statistics({ note }) {
  const noteList = useContext(NoteStateContext);
  const noteData = noteList.notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  const numOfDays = journalList.length;
  const sumOfMood = journalList.reduce((acc, item) => (acc += +item.mood), 0);
  const averageOfMood = numOfDays > 0 ? (sumOfMood / numOfDays).toFixed(1) : 0;

  const minOfDays = journalList.filter((journal) => +journal.mood === 1).length;
  const maxOfDays = journalList.filter((journal) => +journal.mood === 7).length;

  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <div className={styles.icon}>
          <MdEventNote />
        </div>
        <p className={styles.num}>{numOfDays ? numOfDays : 0}일</p>
        <h3 className={styles.text}>기록수</h3>
      </li>
      <li className={styles.item}>
        <div className={styles.icon}>
          <BsGraphUp />
        </div>
        <p className={styles.num}>{averageOfMood ? averageOfMood : 0}점</p>
        <h3 className={styles.text}>평균치</h3>
      </li>
      <li className={styles.item}>
        <div className={styles.icon}>
          <HiOutlineFaceFrown />
        </div>
        <p className={styles.num}>{minOfDays ? minOfDays : 0}일</p>
        <h3 className={styles.text}>최저치 일수</h3>
      </li>
      <li className={styles.item}>
        <div className={styles.icon}>
          <HiOutlineFaceSmile />
        </div>
        <p className={styles.num}>{maxOfDays ? maxOfDays : 0}일</p>
        <h3 className={styles.text}>최고치 일수</h3>
      </li>
    </ul>
  );
}
