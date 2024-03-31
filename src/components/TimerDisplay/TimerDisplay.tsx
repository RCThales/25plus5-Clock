import "./TimerDisplay.css";

interface TimerDisplayProps {
  label: string;
  time: string;
}

export const TimerDisplay = ({ label, time }: TimerDisplayProps) => (
  <div className="session_time">
    <div className="session_time_inner">
      <h3 id="timer-label">{label}</h3>
      <span id="time-left">{time}</span>
    </div>
  </div>
);
