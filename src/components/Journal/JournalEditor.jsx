import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import MainHeader from '../Header/MainHeader';
import HeaderButton from '../Header/HeaderButton';
import MoodItem from './MoodItem';
import TagItem from './TagItem';

// util
import { getStringDate } from '../../util/date';
import { moodList } from '../../util/mood';
import { tagList } from '../../util/tag';

// context
import { NoteDispatchContext, NoteStateContext } from '../../App';

// styles
import styles from './JournalEditor.module.css';
// import { TfiBackLeft } from 'react-icons/tfi';
// import { HiTrash } from 'react-icons/hi';
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';
const sadImg = process.env.PUBLIC_URL + `/assets/sad.svg`;
const happyImg = process.env.PUBLIC_URL + `/assets/happy.svg`;

export default function JournalEditor({ note, isEdit, originData }) {
  const [journal, setJournal] = useState({
    journalId: '',
    mood: 4,
    tag: 9,
    createdAt: getStringDate(new Date()),
    content: '',
  });
  const contentRef = useRef();

  const { onCreateJournal, onEditJournal, onRemoveJournal } =
    useContext(NoteDispatchContext);
  const noteList = useContext(NoteStateContext);
  const noteData = noteList.notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  const navigate = useNavigate();

  const { id, startDate, endDate } = note;

  const handleClickMood = (mood_id) => {
    setJournal({ ...journal, mood: mood_id });
  };

  const handleClickTag = (tag_id) => {
    setJournal({ ...journal, tag: tag_id });
  };

  const handleSubmitJournal = (e) => {
    e.preventDefault();

    if (journal.content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        if (journalList.length > 0) {
          const isJournalExist = journalList.find(
            (item) => item.createdAt === journal.createdAt
          );
          if (isJournalExist) {
            alert('해당 날짜에 이미 작성된 일기가 있습니다.');
            return;
          }
        }
        onCreateJournal(id, journal);
      } else {
        onEditJournal(id, originData.journalId, journal);
      }
    }

    navigate(-1, { replace: true });
  };

  const handleRemoveJournal = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemoveJournal(id, originData.journalId);
      navigate(-1, { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setJournal({ ...originData });
    }
  }, [isEdit, originData]);

  return (
    <section className={styles.container}>
      <MainHeader
        headText={isEdit ? '일기 수정하기' : '새 일기 작성하기'}
        leftChild={<HeaderButton text='〈' onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <HeaderButton
              text='×'
              type='negative'
              onClick={handleRemoveJournal}
            />
          )
        }
      />
      <form onSubmit={handleSubmitJournal}>
        <section className={styles.control}>
          <h2 className={styles.title}>오늘은 언제인가요?</h2>
          <input
            className={styles['input__date']}
            id='today'
            name='today'
            type='date'
            value={journal.createdAt}
            min={isEdit ? journal.createdAt : startDate}
            max={isEdit ? journal.createdAt : endDate}
            onChange={(e) =>
              setJournal({ ...journal, createdAt: e.target.value })
            }
          />
        </section>
        <section className={styles.control}>
          <h2 className={styles.title}>오늘의 기분은 어떤가요?</h2>
          <ul className={styles['mood-list']}>
            <img src={sadImg} alt='sad' />
            {moodList.map((item) => (
              <MoodItem
                key={item.mood_id}
                mood={item}
                onClick={handleClickMood}
                isSelected={item.mood_id === journal.mood}
              />
            ))}
            <img src={happyImg} alt='happy' />
          </ul>
        </section>
        <section className={styles.control}>
          <h2 className={styles.title}>무엇이 감정에 영향을 미쳤나요?</h2>
          <ul className={styles['tag-list']}>
            {tagList.map((item) => (
              <TagItem
                key={item.tag_id}
                tag={item}
                onClick={handleClickTag}
                isSelected={item.tag_id === journal.tag}
              />
            ))}
          </ul>
        </section>
        <section className={styles.control}>
          <h2 className={styles.title}>어떤 일이 있었나요?</h2>
          <textarea
            className={styles.content}
            ref={contentRef}
            value={journal.content}
            maxLength='150'
            onChange={(e) =>
              setJournal({ ...journal, content: e.target.value })
            }
          />
        </section>
        <section className={styles.actions}>
          <button
            className={styles['btn__cancle']}
            type='button'
            onClick={() => navigate(-1)}
          >
            취소하기
          </button>
          <button className={styles['btn__submit']} type='submit'>
            작성하기
          </button>
        </section>
      </form>
    </section>
  );
}
