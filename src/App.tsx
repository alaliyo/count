import { useRecoilState, useRecoilValue } from "recoil";
import { 
  btnNameState,
  countStartState,
  countState,
  fontSizeState,
  millisecondsState,
  timerState
} from "./atom";
import styled from "styled-components";
import { useEffect } from "react";


function App() {
  const [count, setcount] = useRecoilState(countState);
  const [start, setStart] = useRecoilState(countStartState);
  const [btnName, setbtnName] = useRecoilState(btnNameState);
  const fontSize = useRecoilValue(fontSizeState);
  const [timer, setTimer] = useRecoilState(timerState);
  const [milliseconds, setMilliseconds] = useRecoilState(millisecondsState);

  const plusEvent = () => {
    setcount(count + 1);
  };

  const startEvent = () => {
    setStart(true);
    setcount(0);
    setTimer(0);
    setMilliseconds(0);
  };

  useEffect(() => {
    if (count < 150) {
      setbtnName("시작");
    } else if (count >= 150) {
      setStart(false);
      setbtnName("끝! 다시!");
    }
  }, [count]);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds + 1);
        if (milliseconds >= 100) {
          setTimer((prevTimer) => prevTimer + 1);
          setMilliseconds(0);
        }
      }, 10);
  
      return () => {
        clearInterval(interval);
      };
    }
  }, [start, setTimer, setMilliseconds, milliseconds]);

  return (
    <Box>
      {!start && <button onClick={startEvent}>{btnName}</button>}
      <span> {timer}.{milliseconds <= 9 ? `0${milliseconds}` : milliseconds}</span>
      <br />
      <CountBox>
        {start ? (
          <CountBtn size={fontSize} onClick={plusEvent}>
            <CountBackground color={count}>
              {count}
            </CountBackground>
          </CountBtn>
        ) : (
          <CountText size={fontSize}>{count}</CountText>
        )}
      </CountBox>
      
    </Box>
  );
}

export default App;

interface FontSizeProps {
  size: string;
}

interface BackgroundColotProps {
  color: number;
}

const Box = styled.div`
  text-align: center;
`;

const CountBox = styled.div`
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountText = styled.span<FontSizeProps>`
  font-size: ${p => p.size};
`;

const CountBtn = styled.button<FontSizeProps>`
  font-size: ${p => p.size};
  height: 100%;
  width: 100%;
  background-color: white;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountBackground = styled.div<BackgroundColotProps>`
  background-color: hsl(${p => (p.color * 30) % 360}, 60%, 83%);
  padding: ${p => p.color >= 100 ? "80px 50px" : "50px"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;