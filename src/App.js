
import './App.css';
import { AppProvider } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import Inicio from './components/Inicio';
function App() {
  return (
    <div className="App">
      <AppProvider> 
      <Routes>
            <Route path="/" element={<Inicio />}></Route>
          </Routes>
        
      </AppProvider>
    </div>
  );
}

export default App;
