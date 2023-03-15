import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  // API를 불러오는 함수
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // 일기의 state를 바꾸는 함수
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime(); // 현재시간 밀리세컨드로 생성
    const newData = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newData, ...data]); // data의 값을 newData와 ...data로 변경
  }, []);

  // 일기를 삭제하는 이벤트
  const onDelete = useCallback((targetId) => {
    setData((data) => data.filter((item) => item.id !== targetId));
  }, []);

  // 일기를 수정하는 이벤트
  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  }, []);

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
