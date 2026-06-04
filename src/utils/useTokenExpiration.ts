import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../stores/useAuthStore";
import { TokenPayload } from "../types/authTypes";

export function useTokenExpiration() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const setLogoutUser = useAuthStore((state) => state.setLogoutUser);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!token) return;

    const logout = () => {
      setLogoutUser();
      if (location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    };

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const delay = decoded.exp * 1000 - Date.now();

      if (delay <= 0) {
        logout();
      } else {
        timeoutRef.current = setTimeout(logout, delay);
      }
    } catch {
      logout();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [token, navigate, setLogoutUser, location.pathname]);
}
