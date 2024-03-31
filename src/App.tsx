import { useState, useEffect, useRef } from "react";
import beep from "/beep.ogg";
import "./App.css";
import { BreakLengthControl } from "./components/BreakLengthControl/BreakLengthControl";
import { SessionLengthControl } from "./components/SessionLengthControl/SessionLengthControl";
import { TimerDisplay } from "./components/TimerDisplay/TimerDisplay";
import { PlayPauseResetControls } from "./components/PlayPauseResetControls/PlayPauseResetControls";

function App(): JSX.Element {
  const [playOrPause, setPlayOrPause] = useState<boolean>(false);
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timer, setTimer] = useState<number>(sessionLength * 60);
  const [isSession, setIsSession] = useState<boolean>(true);
  const beepAudio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!playOrPause && isSession) {
      setTimer(sessionLength * 60);
    }
  }, [sessionLength]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const updateTimer = () => {
      setTimer((prevTimer) => prevTimer - 1);
    };

    if (playOrPause) {
      interval = setInterval(updateTimer, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playOrPause]);

  useEffect(() => {
    if (timer === 0) {
      setIsSession(!isSession);
      setTimer((isSession ? breakLength : sessionLength) * 60);
      beepAudio.current?.play();
    }
  }, [timer, isSession, sessionLength, breakLength]);

  const togglePlayOrPause = (): void => {
    setPlayOrPause(!playOrPause);
  };

  const resetTimer = (): void => {
    setPlayOrPause(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimer(25 * 60);
    setIsSession(true);

    if (beepAudio.current) {
      beepAudio.current.pause();
      beepAudio.current.currentTime = 0;
    }
  };

  const formatTime = (time: number): string => {
    let minutes: number = Math.floor(time / 60);
    let seconds: number = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const incrementBreak = (): void => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const decrementBreak = (): void => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  const incrementSession = (): void => {
    if (sessionLength < 60) setSessionLength(sessionLength + 1);
  };

  const decrementSession = (): void => {
    if (sessionLength > 1) setSessionLength(sessionLength - 1);
  };

  return (
    <>
      <audio id="beep" ref={beepAudio} src={beep} preload="auto" />
      <h1>25plus5 Clock</h1>
      <div className="options_wrapper">
        <BreakLengthControl
          breakLength={breakLength}
          onIncrement={incrementBreak}
          onDecrement={decrementBreak}
        />
        <SessionLengthControl
          sessionLength={sessionLength}
          onIncrement={incrementSession}
          onDecrement={decrementSession}
        />
      </div>
      <TimerDisplay
        label={isSession ? "Session" : "Break"}
        time={formatTime(timer)}
      />
      <PlayPauseResetControls
        isPlaying={playOrPause}
        onPlayPause={togglePlayOrPause}
        onReset={resetTimer}
      />
      <footer>
        <p>Coded by Thales Cardoso</p>
      </footer>
    </>
  );
}

export default App;
