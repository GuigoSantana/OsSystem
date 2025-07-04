import "./App.css";
import Dashboard from "./components/Dashboard";
import ListMenu from "./components/ListMenu";
import { useAutoLogoutOnInactivity } from "./utils/useAutoLogoutInactivity";

function App() {

  useAutoLogoutOnInactivity()

  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex w-full h-full">
        <ListMenu />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
