# 😃 무드 트래커 앱, 'moodLog' 프로젝트

![mood-thumb](https://github.com/cona-tus/react-mood-tracker/assets/90844424/47029b76-56f5-49fc-bb3c-344eb8a16bda)

<br/>

🔗 moodLog [[Live Demo](https://conatus-mood-tracker.netlify.app/)]

<br/>
<br/>

## 1. Project

### 1-1. Project Description

moodLog는 감정 상태를 기록하는 웹 애플리케이션으로, 정신 건강을 관리하고자 하는 사용자를 대상으로 기획되었습니다. 사용자는 7단계로 기분을 체크하고, 이 기분에 영향을 미치는 요인을 선택하여 일기를 작성할 수 있습니다. moodLog는 사용자가 작성한 일기를 바탕으로 감정 수치를 그래프로 시각화하여 제공합니다. 이를 통해 사용자는 감정 변화를 한눈에 살펴볼 수 있으며, 필요한 경우 전문가의 도움을 받을 때 유용하게 활용할 수 있습니다. CRUD 기능을 구현하였으며, Context와 useReducer를 사용해 상태를 효율적으로 관리했습니다. 더불어 반응형 웹 디자인 및 퍼블리싱 작업을 진행했습니다.

😄 moodLog를 통해 나의 감정 흐름을 추적하고 더 나은 일상을 만나보세요!

<br/>

### 1-2. Project Duration & Participants

- 2023-05-10 ~ 2023-05-17
- 개인 프로젝트 (1인)

<br/>
<br/>

## 2. Skills

![JAVASCRIPT](https://img.shields.io/badge/JavaScript-f6e158?style=for-the-badge&logo=JavaScript&logoColor=ffffff)
![REACT](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=ffffff)
![POSTCSS](https://img.shields.io/badge/Postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=ffffff)
![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>

## 3. Pages

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

1. [노트 생성](#4-1-create-a-new-note)
2. [노트 데이터 로컬스토리지에 저장](#4-2-save-data-in-local-storage)
3. [노트 삭제](#4-3-delete-a-note)
4. [새로운 일기 작성](#4-4-create-a-new-journal)
5. [일기 수정 및 삭제](#4-5-edit--delete-the-journal)

<br/>

moodLog의 전역적인 상태 데이터는 `notes` 배열입니다. notes 상태 및 상태 변화를 주도하는 `dispatch` 함수들의 컨텍스트를 만들어 컴포넌트 트리 전역에 공급합니다.

```jsx
// 리듀서
import noteReducer from './store/noteReducer';

// 컨텍스트 생성
export const NoteStateContext = createContext();
export const NoteDispatchContext = createContext();

// 초기 노트 상태
const initNotes = [];

// 로컬스토리지에서 데이터 가져오기
function getNotes() {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : initNotes;
}

function App() {
  const [notes, noteDispatch] = useReducer(noteReducer, getNotes());

  // 새로운 노트 생성
  const onAddNote = (note) => {
    noteDispatch({
      type: 'ADD_NOTE',
      note: {
        ...note,
        id: uuidv4(),
      },
    });
  };

  // 노트 삭제
  const onRemoveNote = (noteId) => {
    noteDispatch({
      type: 'REMOVE_NOTE',
      id: noteId,
    });
  };

  // 일기 생성
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

  // 일기 수정
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

  // 일기 삭제
  const onRemoveJournal = (noteId, targetId) => {
    noteDispatch({
      type: 'REMOVE_JOURNAL',
      id: noteId,
      journalId: targetId,
    });
  };

  // 노트 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <NoteStateContext.Provider value={notes}>
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

notes의 상태를 관리하기 위해 `useReducer` 훅을 사용하여 상태 변화 로직을 컴포넌트에서 분리합니다. 또한 객체의 불변성을 유지하며 값을 업데이트하기 위해 `immer` 라이브러리를 사용합니다. immer는 가변적인 값을 다루는 것과 유사한 방식을 통해 복잡한 구조의 객체를 보다 간결하게 수정할 수 있도록 도와줍니다.

```js
import { produce } from 'immer';

export default function noteReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE': {
      return produce(state, (draft) => {
        const { note } = action;
        draft.unshift({ ...note }); // payload : note
      });
    }
    case 'REMOVE_NOTE':
      return produce(state, (draft) => {
        const { id } = action;
        const noteIndex = draft.findIndex((note) => note.id === id); // payload : note.id
        if (noteIndex < 0) return;
        draft.splice(noteIndex, 1);
      });
    case 'CREATE_JOURNAL':
      return produce(state, (draft) => {
        const { id, journal } = action;
        const note = draft.find((note) => note.id === id); // payload : note.id
        note.journalList.push({ ...journal });
      });
    case 'EDIT_JOURNAL':
      return produce(state, (draft) => {
        const { id, journal } = action;
        const note = draft.find((note) => note.id === id); // payload : note.id
        let journalIndex = note.journalList.findIndex(
          (item) => item.journalId === journal.journalId
        ); // payload : journal
        if (journalIndex < 0) return;
        note.journalList[journalIndex] = { ...journal };
      });
    case 'REMOVE_JOURNAL':
      return produce(state, (draft) => {
        const { id, journalId } = action;
        const note = draft.find((note) => note.id === id); // payload : note.id
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
<br/>

### 4-1. Create a New Note

![mood-note-add](https://github.com/cona-tus/react-mood-tracker/assets/90844424/e60c0c39-2e22-4c06-9512-c584bd2a9e9f)

사용자는 제목과 원하는 기간을 설정하여 새로운 노트를 생성할 수 있습니다. 사용자가 입력한 양식을 제출할 때 간단한 유효성 검사를 실행합니다. 그리고 `useContext` 훅으로 불러온 `onAddNote` 함수를 호출하여 note 객체를 전달합니다.

```jsx
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

  // input 요소의 값이 변경될 때마다 note 상태 업데이트
  const handleChangeNote = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();

    // 유효성 검사
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

    // note 객체 전달
    onAddNote(note);

    // note 초기화
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

  // ...
}
```

<br/>
<br/>

### 4-2. Save data in Local Storage

![local](https://github.com/cona-tus/react-mood-tracker/assets/90844424/a5e06843-be7e-4142-9da9-4f7c60a07d97)

`useEffect` 훅을 사용해 notes가 변경될 때마다 로컬 스토리지에 데이터를 저장합니다.

```js
// 노트 로컬스토리지에 저장
useEffect(() => {
  localStorage.setItem('notes', JSON.stringify(notes));
}, [notes]);
```

<br/>

useReducer의 초깃값으로 `getNotes()` 함수를 호출하여 로컬 스토리지에서 notes 데이터를 가져옵니다.

```js
// 초기 노트 상태
const initNotes = [];

const [notes, noteDispatch] = useReducer(noteReducer, getNotes());

// 로컬스토리지에서 데이터 가져오기
function getNotes() {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : initNotes;
}
```

<br/>
<br/>

### 4-3. Delete a note

![mood-note-remove](https://github.com/cona-tus/react-mood-tracker/assets/90844424/72dd6bf8-43bf-4a09-8c42-66a0a8e3738d)

`:` 아이콘을 클릭하면 해당 항목이 스와이프 되어 휴지통 버튼이 보이며, 이 버튼으로 노트를 삭제할 수 있습니다. `useContext` 훅으로 불러온 `onRemoveNote` 함수를 호출하여 클릭 이벤트가 발생하면 해당 노트를 삭제합니다.

```jsx
export default function NoteItem({ note }) {
  const [isSwipe, setIsSwipe] = useState(false);

  // 노트 클릭 시 `/note/${id}`로 페이지 이동
  const navigate = useNavigate();

  const { id, title, startDate, endDate } = note;

  // id 전달하여 노트 삭제
  const { onRemoveNote } = useContext(NoteDispatchContext);

  const btnClasses = isSwipe ? styles.swipe : '';

  return (
    <button className={styles['btn__remove']} onClick={() => onRemoveNote(id)}>
      <HiTrash />
    </button>
  );
}
```

<br/>
<br/>

### 4-4. Create a New Journal

![mood-journal-add](https://github.com/cona-tus/react-mood-tracker/assets/90844424/cc16cc8f-ec4e-450f-9e46-c2fc686bc761)

사용자는 설정한 기간 내에서 새로운 일기를 작성할 수 있습니다. 일기에는 날짜, 기분 수치, 태그, 내용이 포함됩니다. 일기를 생성하고 수정하는 form은 동일한 컴포넌트인 `JournalEditor`를 사용합니다. JournalEditor에 props로 note 객체를 전달합니다.

```jsx
export default function NewJournal() {
  // MainHeader에서 전달받은 note state에 접근
  const {
    state: { note },
  } = useLocation();

  // note 객체 전달
  return (
    <>
      <JournalEditor note={note} />
    </>
  );
}
```

<br/>
<br/>

### 4-5. Edit & Delete the Journal

![mood-journal-edit](https://github.com/cona-tus/react-mood-tracker/assets/90844424/e2179048-dbdc-4002-84d8-9576a022e0cb)

사용자는 일기를 클릭해 수정 페이지로 이동 후 데이터를 수정하거나 삭제할 수 있습니다. 이때, 일기가 작성된 날짜에 한해서만 수정됩니다.

수정할 원본 일기를 찾기 위해 `Array.find()` 메서드를 사용합니다. journalList 배열에 있는 일기의 journalId와 Params에서 추출한 journalId가 일치하는 일기 데이터를 찾습니다. 그리고 이를 `JournalEditor` 컴포넌트에 props로 전달합니다.

```jsx
export default function EditJournal() {
  const [originData, setOriginData] = useState();

  // JournalItem에서 전달받은 note 객체 접근
  const {
    state: { note },
  } = useLocation();
  const navigate = useNavigate();

  // URL에서 동적 파라미터 추출
  const { journalId } = useParams();

  // notes 배열에서 note 검색 후 journalList 추출
  const notes = useContext(NoteStateContext);
  const noteData = notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  // 수정할 원본 일기 검색
  useEffect(() => {
    if (journalList.length > 0) {
      const targetJournal = journalList.find(
        (journal) => journal.journalId === journalId
      );

      if (targetJournal) {
        setOriginData(targetJournal);
      } else {
        navigate(`/note/${note.id}`, { replace: true });
      }
    }
  }, [journalId, journalList, navigate, note.id]);

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

`JournalEditor` 컴포넌트는 useContext 훅으로 `dispatch` 전역 함수들을 가져와 일기 작성, 수정, 삭제를 관리합니다.

```jsx
export default function JournalEditor({ note, isEdit, originData }) {
  const navigate = useNavigate();
  const [journal, setJournal] = useState({
    journalId: '',
    mood: 4,
    tag: 9,
    createdAt: getStringDate(new Date()),
    content: '',
  });
  const contentRef = useRef();

  // dispatch 전역 함수 가져오기
  const { onCreateJournal, onEditJournal, onRemoveJournal } =
    useContext(NoteDispatchContext);

  // journalList 및 note 속성 추출
  const notes = useContext(NoteStateContext);
  const noteData = notes.find((item) => item.id === note.id);
  const { journalList } = noteData;
  const { id, startDate, endDate } = note;

  // mood와 tag 선택 시 journal 상태 업데이트
  const handleClickMood = (mood_id) => {
    setJournal({ ...journal, mood: mood_id });
  };
  const handleClickTag = (tag_id) => {
    setJournal({ ...journal, tag: tag_id });
  };

  const handleSubmitJournal = (e) => {
    e.preventDefault();

    // input 값이 유효하지 않으면 포커싱
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
        // 이미 작성된 일기가 있는지 확인
        if (journalList.length > 0) {
          const isJournalExist = journalList.find(
            (item) => item.createdAt === journal.createdAt
          );
          if (isJournalExist) {
            alert('해당 날짜에 이미 작성된 일기가 있습니다.');
            return;
          }
        }
        //  일기 생성
        onCreateJournal(id, journal);
      } else {
        // 일기 수정
        onEditJournal(id, originData.journalId, journal);
      }
    }

    // 작성 또는 수정이 완료 후 페이지 뒤로가기
    navigate(-1, { replace: true });
  };

  // 일기 삭제
  const handleRemoveJournal = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemoveJournal(id, originData.journalId);
      navigate(-1, { replace: true });
    }
  };

  // 수정 모드인 경우 originData로 journal 업데이트
  useEffect(() => {
    if (isEdit) {
      setJournal({ ...originData });
    }
  }, [isEdit, originData]);

  // return ();
}
```

<br/>
<br/>

## 5. UI/UX

### 5-1. Visualizing Mood data

![mood-journals](https://github.com/cona-tus/react-mood-tracker/assets/90844424/25623f31-546f-4e3d-9f00-9a4b197ec475)

moodLog는 사용자가 작성한 일기를 바탕으로 데이터를 시각화, 통계화하여 제공합니다. 기분 수치를 그래프로 나타내 감정 변화를 한눈에 파악하고, 통계를 통해 감정 상태를 객관적으로 살펴볼 수 있습니다.

그래프를 구현하기 위해 `Chart.js` 라이브러리를 사용합니다. labels와 datasets에 `journalList`를 전달하면 그래프가 나타납니다.

```jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
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
  const notes = useContext(NoteStateContext);
  const noteData = notes.find((item) => item.id === note.id);
  const { journalList } = noteData;

  // 날짜순으로 정렬
  const sortedList = [...journalList].sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : -1
  );

  const data = {
    labels: sortedList.map(
      (data) =>
        `${data.createdAt.split('-')[1]}월 ${data.createdAt.split('-')[2]}일`
    ),
    datasets: [
      {
        label: '기분 수치',
        data: sortedList.map((data) => data.mood),
        borderColor: '#6cd8c8',
        backgroundColor: '#89ebdd',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
```

<br/>
<br/>

### 5-2. Responsive Web Design

![mood-desc](https://github.com/cona-tus/react-mood-tracker/assets/90844424/e8af95f0-1294-424a-a5e3-5a9b866e3fe5)

moodLog는 반응형 웹 사이트로 제작되어 화면 크기에 따라 적절한 레이아웃을 표시합니다. 이를 통해 다양한 디바이스에서 일관된 사용자 경험을 제공합니다.

<br/>
<br/>

## 6. Trouble shooting

### 6-1. Manage Global State

#### 1. 목표

notes 배열과 그 내부의 journalList 배열을 효율적으로 관리하고 업데이트하고자 했습니다.

```js
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
];
```

<br/>

#### 2. 문제 상황

처음에는 필요한 곳에만 상태를 전달하기 위해 notes와 journalList를 별도의 상태로 분리했습니다. 이로 인해 journalList 배열 안의 journal을 업데이트할 때마다 notes도 함께 업데이트하는 작업이 필요했으며, 이는 중복된 업데이트를 발생시키는 문제가 있었습니다.

<br/>

#### 3. 해결 방법

문제를 해결하기 위해 notes 배열을 하나의 context로 관리하고, useReducer 훅과 immer를 활용하여 상태 업데이트 작업을 간소화하였습니다. 이렇게 함으로써 전역 상태를 효율적으로 관리하고 중복 업데이트를 방지할 수 있었습니다.

<br/>
<br/>

### 6-2. Sort by date

![sort](https://github.com/cona-tus/react-mood-tracker/assets/90844424/18d29442-8abd-4805-9c0c-affb870d8ff0)

#### 1. 목표

일기 목록과 그래프를 날짜순으로 정렬하고자 했습니다.

<br/>

#### 2. 문제 상황

일기를 작성한 순서대로 목록과 그래프가 렌더링 되어 사용자가 감정의 흐름을 파악하는 데 어렵다는 문제가 있었습니다.

<br/>

#### 3. 해결 방법

문제를 해결하기 위해 `sort` 메서드를 사용하였습니다. 이때, 불변성을 지키기 위해 원본 배열을 복사하여 날짜순으로 정렬하였습니다. 이를 통해 사용자는 데이터를 더 쉽게 파악할 수 있게 되었습니다.

```js
const sortedList = [...journalList].sort((a, b) =>
  a.createdAt > b.createdAt ? 1 : -1
);
```

<br/>
<br/>

[맨위로 이동하기](#-무드-트래커-앱-moodlog-프로젝트)
