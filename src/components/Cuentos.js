import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import libro1 from "../assets/libro1.png";
import usuario from "../assets/usuario.png";
import lapiz from "../assets/lapiz.png";
import msg from "../assets/msg.png";
import ramdom from "../assets/ramdom.png";
import azar from "../assets/azar.png";
import Autores from "./Autores";
import Usuarios from "./Usuarios";
import Mensajes from "./Mensajes";
import Cuento from "./Cuento";
import Logo1 from "../assets/logo-horizontal.png";
const Cuentos = () => {
    const { loading, cuentos, resolveCuento } = useApp()
    const [newCuentos, setNewCuentos] = useState(cuentos)
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    const [page, setPage] = useState("all")

    useEffect(() => {
        if (!newCuentos && cuentos) {
            setNewCuentos(cuentos)
        }
    }, [cuentos, newCuentos])
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const setPages = (p) => {
        setPage(p)
    }
    const resolveNewCuento = () =>{
        console.log("azar")
        setNewCuentos(null)
        setCargando(true)
        let num = Math.floor(Math.random() * cuentos.length)
        resolveCuento(cuentos[num]); sessionStorage.setItem("location", true);
        setPages("ramdom")
        setCargando(false)
    }
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
    if (loading || !cuentos || !newCuentos || cargando) {
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
            <div className="text-center">
                <div className="d-flex flex-row justify-content-center">
                    <img className="logo-inicio" src={Logo1} alt=""></img>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-row justify-content-center menu-cuentos">
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            setPages("all")
                        }} className={`${page === "all" && "nav-selected"}`}><img className={`menu-img`} src={libro1} alt=""></img></div>
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            setPages("user")
                        }} className={`${page === "user" && "nav-selected"}`}><img className="menu-img" src={usuario} alt=""></img></div>
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            setPages("autor")
                        }} className={`${page === "autor" && "nav-selected"}`}><img className="menu-img" src={lapiz} alt=""></img></div>
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            setPages("msg")
                        }} className={`${page === "msg" && "nav-selected"}`}><img className="menu-img" src={msg} alt=""></img></div>
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            let num = Math.floor(Math.random() * cuentos.length)
                            resolveCuento(cuentos[num]); sessionStorage.setItem("location", true);
                            setPages("ramdom")
                        }} className={`${page === "ramdom" && "nav-selected"}`}><img className="menu-img" src={ramdom} alt=""></img></div>
                    </div>
                </div>

                {page === "all" && <div>
                    <label className="m-2">Buscar</label><input onChange={changeBuscar}></input>
                    <div className="text-start">
                        <div className="d-flex flex-column justify-content-center">
                            {!cargando && newCuentos.map((cuento, i) => {
                                return (
                                    <div className="cuento-box" key={i}>
                                        <div className="">
                                            <div className="">Titulo: <span className="cuento-info">{cuento.titulo}</span></div>
                                            <div className="">Autor: <span className="cuento-info">{cuento.autor}</span></div>
                                            <div className="">Publicado por: <span className="cuento-info">{cuento.user}</span></div>
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
                    </div>
                </div>}
                {
                    page === "autor" && <Autores />
                }
                {
                    page === "user" && <Usuarios />
                }
                {
                    page === "msg" && <Mensajes />
                }
                {
                    page === "ramdom" && 
                    <div>
                        <div className="d-flex justify-content-center">
                        <div className="caja-cerrar-cuento text-end">
                            <img role="button" src={azar}
                             alt="" className="azar" onClick={(e) => { e.preventDefault(); resolveNewCuento()}}></img>
                        </div>

                    </div>
                        <Cuento />
                    </div>
                }


            </div>
        )
    }
}
export default Cuentos