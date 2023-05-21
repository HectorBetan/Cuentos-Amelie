import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Cuentos = () => {
    const { loading, cuentos, resolveCuento } = useApp()
    const [newCuentos, setNewCuentos] = useState(cuentos)
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!newCuentos && cuentos){
            setNewCuentos(cuentos)
        }
    },[cuentos, newCuentos])
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };
      
      const changeBuscar = (e) => {
        e.preventDefault();
        setCargando(true);
        const searchTerm = removeAccents(e.target.value.toUpperCase());
        const filteredCuentos = cuentos.filter((cuento) => {
          const titulo = removeAccents(cuento.titulo.toUpperCase());
          const autor = removeAccents(cuento.autor.toUpperCase());
          const user = removeAccents(cuento.user.toUpperCase());
          return titulo.includes(searchTerm) || autor.includes(searchTerm) || user.includes(searchTerm);
        });
        setNewCuentos(filteredCuentos);
        setCargando(false);
      };
    if (loading || !cuentos || !newCuentos) {
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
                
                <h2 className="text-center">Cuentos</h2>
                <button onClick={(e) => { e.preventDefault(); navigate("/") }} className="btn btn-dark">Volver</button>
                </div>
                <label>Buscar</label><input onChange={changeBuscar}></input>
                {!cargando && newCuentos.map((cuento, i) => {
                    return (
                        <div className="" key={i}>
                            <div className="">
                                <h5 className="">Titulo: {cuento.titulo}</h5>
                                <h5 className="">Autor: {cuento.autor}</h5>
                                <h5 className="">Usuario: {cuento.user}</h5>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    resolveCuento(cuento);
                                    sessionStorage.setItem("location", true)
                                    navigate("/cuento")
                                }}>Ver Cuento</button>
                            </div>
                        </div>
                    )
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
export default Cuentos