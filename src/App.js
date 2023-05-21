
import './App.css';
import { AppProvider } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import Inicio from './components/Inicio';
import Publicar from './components/Publicar';
import EnviarMsg from './components/EnviarMsg';
import Cuentos from './components/Cuentos';
import Usuarios from './components/Usuarios';
import Autores from './components/Autores';
import Cuento from './components/Cuento';
import MisCuentos from './components/MisCuentos';
import Mensajes from './components/Mensajes';
import MisMensajes from './components/MisMensajes';
import Config from './components/Config';
function App() {
  return (
    <div className="App">
      <AppProvider> 
      <Routes>
            <Route path="/" element={<Inicio />}></Route>
            <Route path="/publicar" element={<Publicar />}></Route>
            <Route path="/enviar" element={<EnviarMsg />}></Route>
            <Route path="/cuentos" element={<Cuentos />}></Route>
            <Route path="/mensajes" element={<Mensajes />}></Route>
            <Route path="/usuarios" element={<Usuarios />}></Route>
            <Route path="/autores" element={<Autores />}></Route>
            <Route path="/cuento" element={<Cuento />}></Route>
            <Route path="/mis-cuentos" element={<MisCuentos />}></Route>
            <Route path="/mis-mensajes" element={<MisMensajes />}></Route>
            <Route path="/admin" element={<Config />}></Route>
          </Routes>
        
      </AppProvider>
    </div>
  );
}

export default App;
