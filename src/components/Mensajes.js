import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Mensajes = () => {
    const { loading, mensajes, admins, user } = useApp()
    const [newMensajes, setNewMensajes] = useState(mensajes)
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!newMensajes && mensajes){
            setNewMensajes(mensajes)
        }
    },[mensajes, newMensajes])
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };
      
      const changeBuscar = (e) => {
        e.preventDefault();
        setCargando(true);
        const searchTerm = removeAccents(e.target.value.toUpperCase());
        const filteredMensajes = mensajes.filter((mensaje) => {
          const asunto = removeAccents(mensaje.asunto.toUpperCase());
          const user = removeAccents(mensaje.user.toUpperCase());
          return asunto.includes(searchTerm) || user.includes(searchTerm);
        });
        setNewMensajes(filteredMensajes);
        setCargando(false);
      };
    if (loading || !mensajes || !newMensajes) {
        return (
            <div className="text-center d-flex flex-column justify-content-center h-100"
                style={{ alignSelf: "center" }}>
                <img className="logo-home" src={Logo} alt=""></img>
                <div className="d-flex flex-column justify-content-center text-center">
                    <div
                        className="spinner-border m-2"
                        role="status"
                        style={{ width: "3rem", height: "3rem", marginTop: "8px", alignSelf: "center" }}
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

            </div>
        );
    } else {
        return (
            <div>
                <div className="d-flex justify-content-center">
                
                <h2 className="text-center">Mensajes</h2>
                <button onClick={(e) => { e.preventDefault(); navigate("/") }} className="btn btn-dark">Volver</button>
                </div>
                <label>Buscar</label><input onChange={changeBuscar}></input>
                {!cargando && newMensajes.map((mensaje, i) => {
                    if(!mensaje.privado){
                        return (
                            <div className="" key={i}>
                                <div className="">
                                    <h5 className="">Asunto: {mensaje.asunto}</h5>
                                    <h5 className="">Usuario: {mensaje.user}</h5>
                                    <h6>Mensaje:</h6>
                                    <p>{mensaje.mensaje}</p>
                                </div>
                            </div>
                        )
                    } else{
                        if(admins.includes(user.email)){
                            return (
                                <div className="" key={i}>
                                    <div className="">
                                        <h5 className="">Asunto: {mensaje.asunto}</h5>
                                        <h5 className="">Usuario: {mensaje.user}</h5>
                                        <h5 className="">Mensaje Privado</h5>
                                        <h6>Mensaje:</h6>
                                        <p>{mensaje.mensaje}</p>
                                    </div>
                                </div>
                            )
                        } else{
                            return false
                        }
                    }
                    
                }
                )}
                {cargando && <div className="d-flex flex-column justify-content-center text-center">
                    <div
                        className="spinner-border m-2"
                        role="status"
                        style={{ width: "3rem", height: "3rem", marginTop: "8px", alignSelf: "center" }}
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            </div>
        )
    }
}
export default Mensajes