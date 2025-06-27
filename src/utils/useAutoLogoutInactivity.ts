import { useEffect, useRef } from "react";
import useAuthStore from "../stores/useAuthStore";

export function useAutoLogoutOnInactivity(timeout = 60 * 1000 * 30) {
  const { setLogoutUser } = useAuthStore();
  const timeoutRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
        setLogoutUser()
      alert("Sessão encerrada por inatividade.");
    }, timeout);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
}
