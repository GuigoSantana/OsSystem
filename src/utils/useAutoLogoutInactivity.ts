import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const INACTIVITY_TIMEOUT_MS = 60 * 1000 * 60 * 2;

export function useAutoLogoutOnInactivity(
  timeout = INACTIVITY_TIMEOUT_MS
) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const setLogoutUser = useAuthStore((state) => state.setLogoutUser);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!token) return;

    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setLogoutUser();
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      }, timeout);
    };

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
  }, [token, timeout, setLogoutUser, navigate, location.pathname]);
}
