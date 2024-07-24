import { useEffect, useState } from "react";

export default function QuestionTimer({ timeOut, onTimeout }) {
  const [remainigTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    const Timeout = setTimeout(onTimeout, timeOut);
    return () => {
      clearTimeout(Timeout);
    };
  }, [timeOut, onTimeout]);

  useEffect(() => {
    const Time = setInterval(() => {
      setRemainingTime((prevTimeOut) => prevTimeOut - 100);
    }, 100);
    return () => {
      clearInterval(Time);
    };
  }, []);

  return <progress max={timeOut} value={remainigTime}/>;
}
