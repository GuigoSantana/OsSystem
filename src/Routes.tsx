import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Clientes from "./pages/clientes";
import Ordens from "./pages/ordens";
import Login from "./pages/login";
function AppRoutes() {
  const token = localStorage.getItem('token')
  console.log(token)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/ordens" element={<Ordens />} />
        <Route path="/login" element={token ? <App/> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
