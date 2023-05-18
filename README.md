# ☀️ 무드 트래커 앱, '무드로그moodLog' 프로젝트

![mood-thumb](https://github.com/cona-tus/react-mood-tracker/assets/90844424/1046fa15-f7b2-4f14-b322-5cc93fc2db42)

<br/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/1f550f84-21ac-4bfb-b39c-1402682b9a18/deploy-status)](https://app.netlify.com/sites/conatus-mood-tracker/deploys) | [Live Demo](https://conatus-mood-tracker.netlify.app/)

<br/>
<br/>

# 1. Project

## 1-1. Project Description

'무드로그'는 감정 상태를 기록하는 웹 애플리케이션입니다. 정신 건강에 관심이 있거나, 스트레스를 관리하여 감정 조절 능력을 향상시키고 싶은 사람들을 위해 제작되었습니다. 사용자는 기록하고 싶은 기간을 설정하고 해당 기간 동안 일기를 작성할 수 있습니다. 무드로그는 작성된 일기를 시각화하고 통계화하여 제공합니다.

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

![mood-pages](https://github.com/cona-tus/react-mood-tracker/assets/90844424/8124a9a6-e698-4f15-b295-6a2fb5f04036)

1. Home - 메인 페이지(`/`)
2. Note - 노트 페이지(`note/:noteId`)
3. NewJournal - 일기 생성 페이지(`new`)
4. EditJournal - 일기 수정 페이지(`edit/:journalId`)
5. NotFound - 404 페이지

<br/>

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

- 노트 데이터 로컬스토리지에 저장
- 노트 생성/삭제 기능
- 일기 생성/수정/삭제 기능

<br/>

무드로그의 전역적인 상태 데이터는 **noteState**입니다. 노트 내에 일기 리스트가 포함된 형태로, 노트 객체는 중첩된 배열과 객체로 구성되어 있습니다.

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

<br/>

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

<br/>

`Context API`로 상태 관리 로직의 컨텍스트와, 상태 변화를 주도하는 dispatch 함수들의 컨텍스트를 만들어 데이터를 컴포넌트 트리 전역에 공급합니다. 이렇게 하면 컨텍스트 영역 안에 있는 컴포넌트들은 noteState와 noteDispatch에 접근할 수 있습니다.

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

## 4-1. Save Notes in LocalStorage

![mood-local](https://github.com/cona-tus/react-mood-tracker/assets/90844424/62f29957-d04d-4de0-84bb-ae56f4766756)

`useEffect` 훅을 사용해 noteState가 변경될 때마다 로컬스토리지에 데이터를 저장합니다.

```js
useEffect(() => {
  localStorage.setItem('noteState', JSON.stringify(noteState));
}, [noteState]);
```

useReducer의 초기값으로 `getItem()` 함수를 호출하여 noteState 데이터를 가져옵니다.

```js
const [noteState, noteDispatch] = useReducer(noteReducer, getItem());

// initialState
const noteInitialState = {
  notes: [],
};

// get Data from localStorage
function getItem() {
  const noteState = localStorage.getItem('noteState');
  return noteState ? JSON.parse(noteState) : noteInitialState;
}
```

<br/>

## 4-2. Create a Note

![mood-note-add](https://github.com/cona-tus/react-mood-tracker/assets/90844424/e60c0c39-2e22-4c06-9512-c584bd2a9e9f)

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

<br/>

## 4-2. Remove a Note

![mood-note-remove](https://github.com/cona-tus/react-mood-tracker/assets/90844424/72dd6bf8-43bf-4a09-8c42-66a0a8e3738d)

> `:` 아이콘을 클릭하면 해당 항목이 스와이프 되어 휴지통 버튼이 보이며, 이 삭제 버튼을 클릭하여 노트를 삭제할 수 있습니다.

```jsx
export default function NoteItem({ note }) {
  // useState 훅으로 스와이프 유무를 관리합니다.
  const [isSwipe, setIsSwipe] = useState(false);

  // 리액트 라우터의 useNavigate 훅을 사용하여 네비게이션 기능을 가져옵니다.
  // 아이템을 클릭하면 `/note/${id}`로 페이지를 전환합니다.
  const navigate = useNavigate();

  // 비구조화 할당하여 note 객체의 속성들을 개별적인 변수로 추출합니다.
  const { id, title, startDate, endDate } = note;

  // useContext 훅으로 onRemoveNote 함수를 불러옵니다.
  const { onRemoveNote } = useContext(NoteDispatchContext);

  // isSwipe 상태로 버튼에 클래스를 동적으로 적용합니다.
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

<br/>

## 4-3. Create & Edit & Remove a Journal

일기를 생성하는 form과 일기를 수정하는 form은 동일한 구조와 형식을 갖습니다. 따라서 동일한 `JournalEditor` 컴포넌트를 렌더링하고, props를 다르게 전달합니다.

<br/>

다음은 일기 생성 페이지입니다.

![mood-journal-add](https://github.com/cona-tus/react-mood-tracker/assets/90844424/cc16cc8f-ec4e-450f-9e46-c2fc686bc761)

> 노트 페이지에서 우측 상단의 `+` 버튼을 클릭하여 새로운 일기를 생성할 수 있습니다. 일기에는 날짜, 기분 수치, 태그, 내용 정보가 포함되며, 노트를 작성할 때 입력한 기간 내에서만 작성 가능합니다.

```jsx
export default function NewJournal() {
  // 리액트 라우터의 useLocation 훅이 반환한 `location` 객체의 `state` 속성을 비구조화 할당하여 `note` 변수로 추출합니다. 이렇게 해서 이전 페이지에서 전달한 note 객체에 접근할 수 있습니다.
  const {
    state: { note },
  } = useLocation();

  // useEffect 훅을 이용해 index.html의 title명을 동적으로 수정합니다.
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `moodLog | 일기 작성`;
  }, []);

  // JournalEditor 컴포넌트에 note 객체를 전달합니다.
  return (
    <>
      <JournalEditor note={note} />
    </>
  );
}
```

<br/>

다음은 일기 수정 페이지입니다.

![mood-journal-edit](https://github.com/cona-tus/react-mood-tracker/assets/90844424/4d62596a-ccc1-4e32-a337-5f50a2f61fab)

> 일기 아이템을 클릭해 수정 페이지로 이동 후 일기 데이터를 수정할 수 있습니다. 일기가 작성된 날짜에 한에서만 수정됩니다.

![mood-journal-remove](https://github.com/cona-tus/react-mood-tracker/assets/90844424/519b8cf7-bc5c-4bf5-8569-77416e33c868)

> 우측 상단의 삭제 버튼을 클릭하여 일기를 삭제할 수 있습니다.

```jsx
export default function EditJournal() {
  // useState 훅으로 수정할 일기 데이터를 저장합니다.
  const [originData, setOriginData] = useState();

  // 리액트 라우터의 useLocation 훅을 이용해 note 변수에 location.state.note의 값을 할당합니다.
  const {
    state: { note },
  } = useLocation();

  // 리액트 라우터의 useNaviate 훅으로 네비게이션 기능을 가져옵니다.
  const navigate = useNavigate();

  // 리액트 라우터의 useParams 훅을 이용해 journalId 값을 가져옵니다.
  const { journalId } = useParams();

  // useContext 훅으로 전역 데이터인 noteState의 값을 가져옵니다.
  const noteList = useContext(NoteStateContext);

  // Array.find() 메서드를 사용해 noteList 배열에서 note.id와 일치하는 요소를 찾습니다.
  const noteData = noteList.notes.find((item) => item.id === note.id);

  // 객체 비구조화 할당을 사용해 noteData에서 journalList를 추출합니다.
  const { journalList } = noteData;

  // useEffect 훅을 이용해 journalId, journalList, navigate, note.id가 변경될 때마다 코드블럭을 수행합니다.
  useEffect(() => {
    // journalList 배열의 길이가 1이상인 경우 journalList 배열에서 journalId와 일치하는 요소를 찾습니다.
    if (journalList.length > 0) {
      const targetJournal = journalList.find(
        (journal) => journal.journalId === journalId
      );

      // 일치하는 요소를 찾았다면 setOriginData를 호출해 targetJournal을 저장합니다. targetJournal이 없다면 `/note/${note.id}`페이지로 이동합니다.
      if (targetJournal) {
        setOriginData(targetJournal);
      } else {
        navigate(`/note/${note.id}`, { replace: true });
      }
    }
  }, [journalId, journalList, navigate, note.id]);

  // useEffect 훅을 이용해 index.html의 title명을 동적으로 수정합니다.
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `moodLog | 일기 수정`;
  }, []);

  // originData가 있다면 JournalEditor를 렌더링하고, props로 isEdit과 originData, note를 전달합니다.
  return (
    <>
      {originData && (
        <JournalEditor isEdit={true} originData={originData} note={note} />
      )}
    </>
  );
}
```

<br/>

다음은 JournalEditor 컴포넌트입니다.

```jsx
export default function JournalEditor({ note, isEdit, originData }) {
  // useState 훅으로 journal state를 관리합니다.
  const [journal, setJournal] = useState({
    journalId: '',
    mood: 4,
    tag: 9,
    createdAt: getStringDate(new Date()),
    content: '',
  });

  // useRef 훅으로 input 요소에 접근합니다.
  const contentRef = useRef();

  // useContext 훅으로 전역 데이터의 dispatch 함수를 가져옵니다.
  const { onCreateJournal, onEditJournal, onRemoveJournal } =
    useContext(NoteDispatchContext);

  // useContext 훅으로 전역 데이터인 noteState를 가져옵니다. noteState에서 journalList를 추출합니다.
  const noteList = useContext(NoteStateContext);
  const noteData = noteList.notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  // 리액트 라우터의 useNavigate 훅으로 네비게이션 기능을 가져옵니다.
  const navigate = useNavigate();

  // 전달받은 note 객체를 비구조화 할당하여 속성을 추출합니다.
  const { id, startDate, endDate } = note;

  // mood와 tag 아이템이 클릭되었을 때 setJournal 함수를 호출해 journal 상태를 업데이트합니다. 이때, mood와 tag를 전달받은 id로 변경합니다.
  const handleClickMood = (mood_id) => {
    setJournal({ ...journal, mood: mood_id });
  };
  const handleClickTag = (tag_id) => {
    setJournal({ ...journal, tag: tag_id });
  };

  // form이 제출될 때 호출됩니다.
  const handleSubmitJournal = (e) => {
    // 제출 시 새로고침을 방지합니다.
    e.preventDefault();

    // content의 길이가 1보다 작을 시 input 요소에 포커싱됩니다.
    if (journal.content.length < 1) {
      contentRef.current.focus();
      return;
    }

    // isEdit일 때는 수정, 아닐 때는 작성 메시지를 표시합니다.
    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
      )
    ) {
      // isEdit이 아닌 경우
      if (!isEdit) {
        // journalList 배열의 길이가 1이상일 때 Array.find() 메서드로 이미 작성된 일기가 있는지 확인합니다.
        if (journalList.length > 0) {
          const isJournalExist = journalList.find(
            (item) => item.createdAt === journal.createdAt
          );
          // 작성된 일기가 있다면 경고창을 띄웁니다.
          if (isJournalExist) {
            alert('해당 날짜에 이미 작성된 일기가 있습니다.');
            return;
          }
        }
        // 유효성 검사를 마치면 context의 onCreateJournal 함수를 호출하여 id와 journal을 전달합니다.
        onCreateJournal(id, journal);
      } else {
        // note id와 일기원본, 일기를 전달하여 onEditJournal 함수를 호출합니다.
        onEditJournal(id, originData.journalId, journal);
      }
    }

    // 작성 또는 수정이 완료되면 페이지를 뒤로가기합니다.
    navigate(-1, { replace: true });
  };

  // journal을 삭제할 때 context의 onRemoveJournal 함수를 호출하여 note id와 원본데이터의 journalId를 전달합니다. 삭제가 완료되면 이전 페이지로 되돌아갑니다.
  const handleRemoveJournal = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemoveJournal(id, originData.journalId);
      navigate(-1, { replace: true });
    }
  };

  // useEffect 훅을 사용해 isEdit과 originData가 변경될 때마다 코드블럭을 수행합니다. isEdit인 경우 setJournal을 호출하여 originData로 journal을 업데이트합니다.
  useEffect(() => {
    if (isEdit) {
      setJournal({ ...originData });
    }
  }, [isEdit, originData]);

  return (
    <section className={styles.container}>
      <MainHeader
        headText={isEdit ? '일기 수정하기' : '새 일기 작성하기'}
        leftChild={
          <HeaderButton text={<TfiBackLeft />} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <HeaderButton
              text={<HiTrash />}
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
```

<br/>

## 4-4. Quantify Journal Data

> 노트 페이지에는 작성된 일기를 바탕으로 기분 수치를 계산하여 그래프로 표시되고, 통계치를 나타냅니다. 또한 작성된 일기를 리스트로 볼 수 있습니다.

다음은 Chart 컴포넌트입니다. `chart.js` 라이브러리를 사용해 noteState 데이터를 그래프로 시각화합니다.

```jsx
import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// context
import { NoteStateContext } from '../../App';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export default function Chart({ note }) {
  const noteList = useContext(NoteStateContext);
  const noteData = noteList.notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  const data = {
    labels: journalList.map(
      (data) =>
        `${data.createdAt.split('-')[1]}월 ${data.createdAt.split('-')[2]}일`
    ),
    datasets: [
      {
        label: '기분 수치',
        data: journalList.map((data) => data.mood),
        borderColor: '#6cd8c8',
        backgroundColor: '#89ebdd',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
```

<br/>

다음은 Statistics 컴포넌트입니다.

```jsx
export default function Statistics({ note }) {
  // useContext로 전역 데이터인 noteState를 가져오고, journalList를 추출합니다.
  const noteList = useContext(NoteStateContext);
  const noteData = noteList.notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  // 기록일, 기분 수치의 값을 계산합니다.
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
```

<br/>
<br/>
