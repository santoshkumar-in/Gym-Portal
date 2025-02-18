import { useRef } from "react";

const useThrottle = (
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
  delay: number,
) => {
  const lastCall = useRef<number>(0);

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date().getTime();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(e);
    }
  };
};
export default useThrottle;
