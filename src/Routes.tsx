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
import Produtos from "./pages/produtos";
import NoPage from "./pages/notfound";
import useAuthStore from "./stores/useAuthStore";
import Servicos from "./pages/servicos";
import Finaceiro from "./pages/financeiro";
import ProdutoDetails from "./components/ProdutoContainer/ProdutoDetails";
import ClienteDetails from "./components/ClienteContainer/ClienteDetails";

function PrivateRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { token } = useAuthStore();
  const isAuthenticated = Boolean(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<App />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/financeiro" element={<Finaceiro />} />
          <Route path="/ordens" element={<Ordens />} />
          <Route path="/produtos/:id" element={<ProdutoDetails />}/>
          <Route path="/clientes/:id" element={<ClienteDetails />}/>
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
