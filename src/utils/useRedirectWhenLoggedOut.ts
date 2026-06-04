import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

export function useRedirectWhenLoggedOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [token, location.pathname, navigate]);
}
