import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      newProblemQueue.shift();
      setProblemQueue(newProblemQueue);
    }
  };

  return (
    <div style={centerDivStyle}>
      <div className="timer" style={{ width: '100%', height: '50%' }}>
        타이머
      </div>
      <div className="note" style={{ width: '100%', height: '50%' }}>
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
              <motion.div
                key={index}
                style={{
                  background: '#4B89DC',
                  height: '200px',
                  width: '75px',
                  borderRadius: '10px',
                }}
                initial={{
                  x: -100,
                }}
              >
                <a
                  href={`https://www.acmicpc.net/problem/${problem}`}
                  target="_blank"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                  rel="noopener noreferrer"
                >
                  {problem}
                </a>
              </motion.div>
            ))}
        </ol>
      </div>
    </div>
  );
};

const centerDivStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
};

const centerDiv: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  listStyleType: 'none',
  padding: 0,
};

export default Home;
