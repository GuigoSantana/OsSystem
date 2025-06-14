import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Clientes from "./pages/clientes";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clientes" element={<Clientes />} />
        {/* <Route path="/ordens" element={<FormOrdem />} />
        <Route path="/login" element={<FormLogin />} /> */}
      </Routes>
    </ BrowserRouter>
  );
}

export default AppRoutes;
