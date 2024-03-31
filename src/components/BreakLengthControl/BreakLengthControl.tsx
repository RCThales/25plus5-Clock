import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface BreakLengthControlProps {
  breakLength: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const BreakLengthControl = ({
  breakLength,
  onIncrement,
  onDecrement,
}: BreakLengthControlProps) => (
  <div className="options">
    <h2 id="break-label">Break Length</h2>
    <div className="options_inner">
      <button id="break-decrement" onClick={onDecrement}>
        <AiOutlineArrowDown className="options_down" />
      </button>
      <span id="break-length" className="options_length">
        {breakLength}
      </span>
      <button id="break-increment" onClick={onIncrement}>
        <AiOutlineArrowUp className="options_up" />
      </button>
    </div>
  </div>
);
