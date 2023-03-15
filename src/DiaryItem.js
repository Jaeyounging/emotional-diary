import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  created_date,
  onDelete,
  onEdit,
}) => {
  useEffect(() => {
    console.log(`${id}번 째 아이템 리랜더`);
  });

  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
    console.log(isEdit);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(id);
    }
  };

  const hadleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      console.log(localContent);
      toggleIsEdit(); // 수정폼 닫기
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">작성자 : {author}</div>
      <div className="emotion">감정점수 : {emotion}</div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      <div className="date">{new Date(created_date).toLocaleString()}</div>
      <div className="button-area">
        {isEdit ? (
          <>
            <button onClick={hadleQuitEdit}>취소</button>
            <button onClick={handleEdit}>완료</button>
          </>
        ) : (
          <>
            <button onClick={toggleIsEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
