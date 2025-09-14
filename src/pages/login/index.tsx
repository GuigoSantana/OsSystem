import { useEffect } from "react";
import FormLogin from "../../components/LoginContainer";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

function Login() {
  const navigate = useNavigate();
  const {token} = useAuthStore();
  useEffect(() => {
    if (token) {
      navigate("/", {replace: true})
    }
  }, [token, navigate]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full items-center justify-center">
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
