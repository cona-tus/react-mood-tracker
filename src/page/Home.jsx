import React, { useState } from 'react';
import MainHeader from '../components/Header/MainHeader';
import HeaderButton from '../components/Header/HeaderButton';
import NoteList from '../components/Note/NoteList';
import NewNote from '../components/Note/NewNote';
import { TfiClose, TfiPlus } from 'react-icons/tfi';

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <MainHeader
        headText='moodLog'
        rightChild={
          <HeaderButton
            text={isEditing ? <TfiClose /> : <TfiPlus />}
            type={isEditing ? 'negative' : 'positive'}
            onClick={() => setIsEditing(!isEditing)}
          />
        }
      />
      {isEditing && <NewNote />}
      <NoteList />
    </>
  );
}
