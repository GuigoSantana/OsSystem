import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Clientes from "./pages/clientes";
import Ordens from "./pages/ordens";
import Login from "./pages/login";
import Protudos from "./pages/produtos";
import NoPage from "./pages/notfound";
import useAuthStore from "./stores/useAuthStore";

function PrivateRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const {token} = useAuthStore();
  const isAuthenticated = Boolean(token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<App />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Protudos />} />
          <Route path="/ordens" element={<Ordens />} />
        </Route>
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
