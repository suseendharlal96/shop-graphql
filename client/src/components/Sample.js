import React from "react";
import onInterval from "./hoc/HighComponent";

const Time = ({ label }) => {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  return (
    <p>
      <b>{label && `${label}: `}</b>
      {(hours < 10 ? "0" : "") + hours}:{(mins < 10 ? "0" : "") + mins}:
      {(secs < 10 ? "0" : "") + secs}
      {hours < 12 ? " PM" : " AM"}
    </p>
  );
};

// A timer by composing our <Time/> with HoC
const Timer = onInterval(Time)(1000);
export default Timer;
