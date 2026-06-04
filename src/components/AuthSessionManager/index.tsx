import { useAutoLogoutOnInactivity } from "../../utils/useAutoLogoutInactivity";
import { useRedirectWhenLoggedOut } from "../../utils/useRedirectWhenLoggedOut";
import { useTokenExpiration } from "../../utils/useTokenExpiration";

function AuthSessionManager() {
  useTokenExpiration();
  useAutoLogoutOnInactivity();
  useRedirectWhenLoggedOut();
  return null;
}

export default AuthSessionManager;
