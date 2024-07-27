import React from 'react';
import { motion } from 'framer-motion';
import { Container, TextField, Button, Typography, Box, Stack } from '@mui/material';

const Home = () => {
  const [problemNumber, setProblemNumber] = React.useState('');
  const [problemQueue, setProblemQueue] = React.useState<string[]>([]);

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
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        번호를 입력해주세요
      </Typography>
      <Box component="form" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="문제 번호"
          variant="outlined"
          value={problemNumber}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddProblem} sx={{ mr: 2 }}>
          추가
        </Button>
        <Button variant="contained" color="error" onClick={handleRemoveProblem}>
          삭제
        </Button>
      </Box>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
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
      </Stack>
    </Container>
  );
};

export default Home;
