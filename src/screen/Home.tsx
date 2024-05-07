import React, { useState } from 'react';
const Home = () => {
  const [problemNumber, setProblemNumber] = useState('');
  const [problemQueue, setProblemQueue] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblemNumber(event.target.value);
  };

  const handleAddProblem = () => {
    if (problemNumber.trim() === '') {
      alert('번호를 입력해주세요!');
      return;
    } else if (problemQueue.includes(problemNumber.trim())) {
      alert('이미 추가된 번호입니다!');
      return;
    } else if (problemQueue.length >= 5) {
      alert('문제 개수는 5개까지만 추가할 수 있습니다.');
      return;
    } else {
      setProblemQueue([...problemQueue, problemNumber.trim()]);
      setProblemNumber('');
    }
  };

  const handleRemoveProblem = () => {
    if (problemQueue.length > 0) {
      const newProblemQueue = [...problemQueue];
      newProblemQueue.shift(); // 선입선출로 첫 번째 아이템을 삭제합니다.
      setProblemQueue(newProblemQueue);
    }
  };

  return (
    <div style={centerDivStyle}>
      <h3>번호를 입력해주세요</h3>
      <div style={centerDiv}>
        <input type="text" value={problemNumber} onChange={handleInputChange} />
        <button onClick={handleAddProblem}>추가</button>
        <button onClick={handleRemoveProblem}>삭제</button>
      </div>

      <ol style={listStyle}>
        {problemQueue
          .slice(0)
          .reverse()
          .map((problem, index) => (
            <li key={index} style={listItemStyle}>
              {problem}
            </li>
          ))}
      </ol>
    </div>
  );
};

const centerDivStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', // 화면 높이의 100%를 차지하도록 설정
};

const centerDiv: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  listStyleType: 'none', // 리스트 스타일 제거
  padding: 0, // 패딩 제거
};

const listItemStyle: React.CSSProperties = {
  marginRight: '8px', // 각 아이템 사이의 간격 설정
  transition: 'opacity 0.5s', // 삭제할 때 사라지는 애니메이션 추가
};

export default Home;
