import React from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <span
      className={`rounded-lg px-3 py-1 ${
        timeLeft <= 10 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700"
      }`}
    >
      Time: {timeLeft}s
    </span>
  );
};

export default Timer;
