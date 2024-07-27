import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Modal,
  Fade,
  Backdrop,
  IconButton,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const Home = () => {
  const [problemNumber, setProblemNumber] = React.useState('');
  const [problemQueue, setProblemQueue] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setIsTimerRunning(false);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else if (isTimerRunning && minutes === 0 && seconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerRunning, minutes, seconds]);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStartTimer = () => {
    setMinutes(time);
    setSeconds(0);
    setIsTimerRunning(true);
    handleClose(); // Close the modal when the timer starts
  };

  const increaseTime = () => setTime((prevTime) => prevTime + 5);
  const decreaseTime = () => setTime((prevTime) => (prevTime >= 5 ? prevTime - 5 : 0));

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
      <Button variant="outlined" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        타이머 열기
      </Button>
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
      {isTimerRunning && (
        <Typography variant="h5" sx={{ mt: 2 }}>
          {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </Typography>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              타이머 설정
            </Typography>
            <Typography variant="h4" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
              {time} 분
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <IconButton onClick={increaseTime}>
                <ArrowUpward />
              </IconButton>
              <IconButton onClick={decreaseTime}>
                <ArrowDownward />
              </IconButton>
            </Box>
            <Button variant="contained" color="primary" onClick={handleStartTimer} fullWidth>
              타이머 시작
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Home;
