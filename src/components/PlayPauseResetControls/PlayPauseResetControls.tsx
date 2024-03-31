import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import "./PlayPauseResetControls.css";

interface PlayPauseResetControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}

export const PlayPauseResetControls = ({
  isPlaying,
  onPlayPause,
  onReset,
}: PlayPauseResetControlsProps) => (
  <div className="play_and_reset">
    <button onClick={onPlayPause} id="start_stop" className="play">
      {!isPlaying ? (
        <BsFillPlayFill className="play_icon" />
      ) : (
        <BsFillPauseFill className="play_icon" />
      )}
    </button>
    <button onClick={onReset} className="reset" id="reset">
      <BiReset className="reset_icon" />
    </button>
  </div>
);
