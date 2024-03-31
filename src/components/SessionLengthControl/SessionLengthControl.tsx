import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface SessionLengthControlProps {
  sessionLength: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const SessionLengthControl = ({
  sessionLength,
  onIncrement,
  onDecrement,
}: SessionLengthControlProps) => (
  <div className="options">
    <h2 id="session-label">Session Length</h2>
    <div className="options_inner">
      <button id="session-decrement" onClick={onDecrement}>
        <AiOutlineArrowDown className="options_down" />
      </button>
      <span id="session-length" className="options_length">
        {sessionLength}
      </span>
      <button id="session-increment" onClick={onIncrement}>
        <AiOutlineArrowUp className="options_up" />
      </button>
    </div>
  </div>
);
