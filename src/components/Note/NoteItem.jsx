import React, { useContext, useState } from 'react';
import { NoteDispatchContext } from '../../App';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './NoteItem.module.css';
import { HiOutlineDotsVertical, HiTrash } from 'react-icons/hi';
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

export default function NoteItem({ note }) {
  const [isSwipe, setIsSwipe] = useState(false);
  const navigate = useNavigate();

  const { id, title, startDate, endDate } = note;
  const { onRemoveNote } = useContext(NoteDispatchContext);

  const btnClasses = isSwipe ? styles.swipe : '';

  return (
    <li className={styles.note}>
      <div className={`${styles.item} ${btnClasses}`}>
        <div className={styles.content}>
          <img src={process.env.PUBLIC_URL + '/assets/note.png'} alt='note' />
          <div
            className={styles.text}
            onClick={() => navigate(`/note/${id}`, { state: { note } })}
          >
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.period}>{`${startDate} ~ ${endDate}`}</p>
          </div>
        </div>
        <div className={styles.menu}>
          <button
            className={styles['btn__menu']}
            onClick={() => setIsSwipe(!isSwipe)}
          >
            <HiOutlineDotsVertical />
          </button>
        </div>
      </div>
      <div className={styles.action}>
        <button
          className={styles['btn__remove']}
          onClick={() => onRemoveNote(id)}
        >
          <HiTrash />
        </button>
      </div>
    </li>
  );
}
