import { useRecoilState, useRecoilValue } from "recoil";
import { 
  btnNameState,
  countStartState,
  countState,
  fontSizeState,
  millisecondsState,
  nickNameState,
  timerState
} from "./atom";
import styled from "styled-components";
import { useEffect } from "react";
import Example from "./components/Example";
import { RecordPost } from "./util/dbService";
import OffCanvasExample from "./components/OffCanvasExample";

function App() {
  const [count, setCount] = useRecoilState(countState);
  const [start, setStart] = useRecoilState(countStartState);
  const [btnName, setbtnName] = useRecoilState(btnNameState);
  const fontSize = useRecoilValue(fontSizeState);
  const [timer, setTimer] = useRecoilState(timerState);
  const [milliseconds, setMilliseconds] = useRecoilState(millisecondsState);
  const nickName = useRecoilValue(nickNameState);

  const handleTouchStart = (event: any) => {
    if (start && event.touches.length >= 2) {
      setCount(count + 1); // 카운트 증가
    }
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [count]);

  const plusEvent = () => {
    setCount(count + 1);
  };

  const startEvent = () => {
    setStart(true);
    setCount(0);
    setTimer(0);
    setMilliseconds(0);
  };

  useEffect(() => {
    if (count < 150) {
      setbtnName("시작");
    } else if (count >= 150) {
      setStart(false);
      setbtnName("끝! 다시!");
      RecordPost({nickName, timer, milliseconds});
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
      <Header>
        {!start ? (<>
          <Example />
          <StartBtn onClick={startEvent}>{btnName}</StartBtn>
        </>) : <span>{nickName}:</span>}
        <TimeSpan>{timer}.{milliseconds <= 9 ? `0${milliseconds}` : milliseconds}</TimeSpan>
        <OffCanvasExample />
      </Header>
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
  position: fixed; /* 상단에서 고정 */
  top: 0; /* 페이지 상단에 위치 */
  width: 100%; /* 전체 너비로 확장 */
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartBtn = styled.button`
  font-size: 20px;
  margin: 0 20px;
`;

const TimeSpan = styled.span`
  font-size: 20px;
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