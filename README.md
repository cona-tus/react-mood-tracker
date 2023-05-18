# ☀️ 무드 트래커 앱, '무드로그moodLog' 프로젝트

![mood-thumb](https://github.com/cona-tus/react-mood-tracker/assets/90844424/1046fa15-f7b2-4f14-b322-5cc93fc2db42)

<br/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/1f550f84-21ac-4bfb-b39c-1402682b9a18/deploy-status)](https://app.netlify.com/sites/conatus-mood-tracker/deploys) | [Live Demo](https://conatus-mood-tracker.netlify.app/)

<br/>
<br/>

# 1. Project

## 1-1. Project Description

'무드로그'는 감정 상태를 기록하는 웹 애플리케이션입니다. 정신 건강에 관심이 있거나, 스트레스를 관리하여 감정 조절 능력을 향상시키고 싶은 사람들을 위해 기획되었습니다. 사용자는 기록하고 싶은 기간을 설정하고 해당 기간 동안 일기를 작성할 수 있습니다. '무드로그'는 작성된 일기를 시각화하고 통계화하여 제공합니다.

<br/>

![mood-desc](https://github.com/cona-tus/react-mood-tracker/assets/90844424/20659edf-1af5-4ea1-9ca1-1b1a99859c6f)

☀️ 무드로그를 통해 나의 감정 흐름을 추적하고 더 나은 일상을 만나보세요!

- 일상 속 기분을 기록하세요.  
  일기를 작성하여 7단계로 감정을 체크하고, 감정에 영향을 주는 요인을 선택할 수 있습니다. 감정과 활동의 상관 관계를 파악해보세요.

- 감정 변화를 한눈에 살펴봐요.  
  감정 변화를 그래프로 확인할 수 있습니다. 특정 시기나 상황에서 기분 흐름을 살펴보세요.

- 감정을 통계로 확인해보세요.  
  통계를 통해 감정 상태를 명확하게 인식할 수 있습니다. 전문적인 도움을 받을 때 활용해보세요.

<br/>

## 1-2. Project Duration & Participants

- 2023-05-10 ~ 2023-05-17
- 개인 프로젝트 (1인)

<br/>
<br/>

# 2. Skills

![JAVASCRIPT](https://img.shields.io/badge/JavaScript-f6e158?style=for-the-badge&logo=JavaScript&logoColor=ffffff)
![REACT](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=ffffff)
![POSTCSS](https://img.shields.io/badge/Postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=ffffff)
![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>

# 3. Pages

무드로그의 페이지는 아래와 같이 구성되어 있습니다.

1. Home - 메인 페이지(`/`)

![mood-home](https://github.com/cona-tus/react-mood-tracker/assets/90844424/5f917cce-6d8b-4a6e-9b42-21d6fb5c5991)

2. Note - 노트 페이지(`note/:noteId`)

![mood-notepage](https://github.com/cona-tus/react-mood-tracker/assets/90844424/185f075f-8e03-4cad-a040-5494788e1448)

3. NewJournal - 일기 생성 페이지(`new`)

![mood-newpage](https://github.com/cona-tus/react-mood-tracker/assets/90844424/f8af1583-67cc-4976-ab7b-033203a88bdf)

4. EditJournal - 일기 수정 페이지(`edit/:journalId`)

![mood-editpage](https://github.com/cona-tus/react-mood-tracker/assets/90844424/537526c2-04dc-4040-a9ea-7cd92854c67e)

5. NotFound - 404 페이지

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'note/:noteId',
        element: <Note />,
      },
      {
        path: 'new',
        element: <NewJournal />,
      },
      {
        path: 'edit/:journalId',
        element: <EditJournal />,
      },
    ],
  },
]);
```

<br/>

## 4. Main Features

무드로그는 아래의 기능을 제공합니다.

- 노트 생성/삭제 기능
- 일기 생성/수정/삭제 기능

무드로그의 전역적인 상태 데이터는 noteState입니다. 노트 내에 일기 리스트가 포함된 형태로, 노트 객체는 중첩된 배열과 객체로 구성되어 있습니다.

```js
noteState = {
  notes: [
    {
      id: '',
      title: '',
      startDate: '',
      endDate: '',
      journalList: [
        {
          journalId: '',
          mood: '',
          tag: '',
          createdAt: '',
          content: '',
        },
      ],
    },
  ],
};
```

noteState의 상태 관리를 하기 위해 `useReducer` 훅을 사용하여 상태변화 로직을 컴포넌트에서 분리했습니다. useReducer는 useState보다 더 복잡하거나 다양한 컴포넌트 상황에 따라 값을 업데이트할 때 사용합니다.

또한 객체의 불변성을 유지하며 값을 업데이트하기 위해 `immer` 라이브러리를 함께 사용했습니다. immer는 가변적인 값을 다루는 것과 유사한 방식을 통해 복잡한 구조의 객체 데이터를 보다 간결하게 수정할 수 있도록 도와줍니다.

```js
import { produce } from 'immer';

export default function noteReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE': {
      return produce(state, (draft) => {
        const { note } = action;
        draft.notes.unshift({ ...note });
      });
    }
    case 'REMOVE_NOTE':
      return produce(state, (draft) => {
        const { id } = action;
        const noteIndex = draft.notes.findIndex((note) => note.id === id);
        if (noteIndex < 0) return;
        draft.notes.splice(noteIndex, 1);
      });
    case 'CREATE_JOURNAL':
      return produce(state, (draft) => {
        const { id, journal } = action;
        const note = draft.notes.find((note) => note.id === id);
        note.journalList.push({ ...journal });
      });
    case 'EDIT_JOURNAL':
      return produce(state, (draft) => {
        const { id, journal } = action;
        const note = draft.notes.find((note) => note.id === id);
        let journalIndex = note.journalList.findIndex(
          (item) => item.journalId === journal.journalId
        );
        if (journalIndex < 0) return;
        note.journalList[journalIndex] = { ...journal };
      });
    case 'REMOVE_JOURNAL':
      return produce(state, (draft) => {
        const { id, journalId } = action;
        const note = draft.notes.find((note) => note.id === id);
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
```

`Context API`로 상태 관리 로직의 컨텍스트와, 상태 변화를 주도하는 dispatch 함수들의 컨텍스트를 만들어 데이터를 컴포넌트 트리 전역에 공급합니다. 이렇게 하면 컨텍스트 영역 안에 있는 컴포넌트들은 noteState와 noteDispatch에 접근할 수 있습니다.

`useEffect` 훅을 사용해 noteState가 변경될 때마다 로컬스토리지에 데이터를 저장합니다.

```jsx
// context
export const NoteStateContext = createContext();
export const NoteDispatchContext = createContext();

// initialState
const noteInitialState = {
  notes: [],
};

// get data from localStorage
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
```

<br/>

## 3-2.1. Create a Note

> 메인 페이지 우측 상단의 `+` 버튼을 눌러 form을 열고 `x` 버튼을 눌러 닫을 수 있습니다. 노트의 제목, 기간 정보를 입력하여 새로운 노트를 생성합니다.

```jsx
export default function NewNote() {
  // useContext 훅으로 onAddNote 함수를 불러옵니다.
  const { onAddNote } = useContext(NoteDispatchContext);

  // useState 훅으로 note state를 관리합니다.
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

  // useRef 훅으로 input 요소에 접근합니다.
  const titleRef = useRef();

  // input 요소의 값이 변경될 때마다 setNote 함수를 호출하여 note state를 업데이트합니다.
  const handleChangeNote = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  // handleSubmitNote()는 form이 제출될 때 호출됩니다. 유효성 검사 후 note 생성 함수를 호출하고, note를 초기화합니다.
  const handleSubmitNote = (e) => {
    // 새로고침을 방지합니다.
    e.preventDefault();

    // note의 제목 길이가 1미만일 때 title input 요소에 포커싱 됩니다.
    if (note.title.length < 1) {
      titleRef.current.focus();
      return;
    }

    // note의 종료일이 시작일보다 앞설 때 경고창을 띄웁니다.
    if (note.startDate > note.endDate) {
      alert('종료일은 시작일보다 앞설 수 없습니다. 날짜를 다시 선택해주세요.');
      return;
    }

    // note의 시작일과 종료일이 같을 때 경고창을 띄웁니다.
    if (note.startDate === note.endDate) {
      alert('시작일과 종료일을 다른 날짜로 선택해주세요.');
      return;
    }

    // context의 onAddNote 함수를 호출하여 note 객체를 전달합니다.
    onAddNote(note);

    // note를 초기화하여 입력값을 지웁니다.
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
```

## 3-2.2. Remove a Note

> `:` 아이콘을 클릭하면 해당 항목이 스와이프 되어 휴지통 버튼이 보이며, 이 삭제 버튼을 클릭하여 노트를 삭제할 수 있습니다.

```jsx
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
```

## 3-2.3. Create a Journal

## 3-2.4. Edit a Journal

## 3-2.5. Remove a Journal

## 3-2.6. Quantify Journal Data

<br/>

## 3-2. 노트 페이지

![mood-detail](https://github.com/cona-tus/react-mood-tracker/assets/90844424/32de2902-a750-4028-b673-e7a52972f344)

- 기분 추이 그래프
  - chart.js 라이브러리를 사용해 데이터를 그래프로 시각화
- 기분 데이터 통계화
  - 데이터를 가공하여 기록수, 평균치, 최저/최고 일수 계산
- 일기 표시
  - context를 이용해 작성한 일기를 나열
- 개별 일기 상세보기 기능
  - 일기 항목 클릭 시 수정 페이지로 이동
- 로컬스토리지에 정보 저장

## 3-3. 일기 작성 및 수정 페이지

- 작성 및 수정 페이지 전환
  - context를 이용해 일기 작성 가능
  - 조건부 렌더링으로 작성 및 수정 페이지 전환
  - 작성 취소 시 입력폼 초기화

![mood-add](https://github.com/cona-tus/react-mood-tracker/assets/90844424/db2b897e-fc67-4dd5-b2a8-f0459bd886a3)

- 일기 작성
  - 설정한 기간 내에서 날짜 선택 가능
  - 일기 작성 시 날짜 및 내용 입력창 유효성 검사
  - state를 이용해 mood와 tag를 수치로 저장

![mood-edit](https://github.com/cona-tus/react-mood-tracker/assets/90844424/0ef00460-d063-4766-a054-f5b7b695b788)

- 일기 수정 및 삭제
  - context, reducer로 기존 데이터로 일기 수정 가능
  - context, reducer로 개별 일기 삭제 가능
- 로컬스토리지에 정보 저장
