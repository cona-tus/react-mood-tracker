import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../components/Header/MainHeader';
import HeaderButton from '../components/Header/HeaderButton';
import JournalList from '../components/Journal/JournalList';
import Chart from '../components/Note/Chart';
import Statistics from '../components/Note/Statistics';
import { TfiBackLeft, TfiPlus } from 'react-icons/tfi';
import { SlGraph, SlNotebook } from 'react-icons/sl';
import { CgMenuMotion } from 'react-icons/cg';
import styles from './Note.module.css';

export default function Note() {
  const navigate = useNavigate();
  const {
    state: { note },
  } = useLocation();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `moodLog | ${note.title}`;
  }, [note.title]);

  return (
    <>
      <MainHeader
        headText={note.title}
        leftChild={
          <HeaderButton text={<TfiBackLeft />} onClick={() => navigate(-1)} />
        }
        rightChild={
          <HeaderButton
            text={<TfiPlus />}
            type='positive'
            onClick={() => navigate('/new', { state: { note } })}
          />
        }
      />
      <div>
        <h2 className={styles.period}>
          {`- ${note.startDate.split('-')[1]}월 ${
            note.startDate.split('-')[2]
          }일 ~
          ${note.endDate.split('-')[1]}월 ${note.endDate.split('-')[2]}일 기록`}
        </h2>
        <section className={styles.container}>
          <h2 className={styles.title}>
            <span className={styles.icon}>
              <SlGraph />
            </span>
            기분 추이 그래프
          </h2>
          <div className={styles.chart}>
            <Chart note={note} />
          </div>
        </section>
        <section className={styles.container}>
          <h2 className={styles.title}>
            <span className={styles.icon}>
              <CgMenuMotion />
            </span>
            기분 통계치
          </h2>
          <Statistics note={note} />
        </section>
        <section className={styles.container}>
          <h2 className={styles.title}>
            <span className={styles.icon}>
              <SlNotebook />
            </span>
            일기
          </h2>
          <JournalList note={note} />
        </section>
      </div>
    </>
  );
}
