import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cuento from "./Cuento";
const Autores = () => {
    const { loading, cuentos, resolveCuento, cuento, noCuento } = useApp()
    const navigate = useNavigate()
    const [autores, setAutores] = useState(null)
    const [autor, setAutor] = useState(null)
    const [cuentoF, setCuentoF] = useState(false)
    const [cargando, setCargando] = useState(false)
    const cerrarCuento = () => {
        setCargando(true)
        setCuentoF(false)
        return setNoc()
    }
    const setNoc = () => {
        noCuento()
        setCargando(false)
    }
    useEffect(() => {


        const setUsers = () => {
            let c = []
            cuentos.forEach((cuento) => {
                if (!c.includes(cuento.autor))
                    c.push(cuento.autor)

            })
            console.log(c)
            setAutores(c)
        }
        if (!autores && cuentos) {
            setUsers()
        }
        let loc
        try {
            loc = sessionStorage.getItem("autor")
        } catch (error) {
            console.log(error)
        }
        if (loc) {
            setAutor(loc)
            sessionStorage.removeItem("autor")
        }

    }, [cuentos, autores])
    if (loading || !cuentos || !autores || cargando) {
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
        if (!autor) {
            return (
                <div>
                    <div className="d-flex justify-content-center">

                        <h2 className="text-center">Autores</h2>

                    </div>

                    {autores.map((autor, i) => {
                        return (
                            <div className="d-flex justify-content-center" key={i}>
                                <div className="caja-autor">
                                    <h5 className="">{autor.replace(/\b\w/g, l => l.toUpperCase())}</h5>
                                    <button onClick={(e) => { e.preventDefault(); setAutor(autor) }}>Ver Los Cuentos</button>
                                </div> </div>
                        )
                    })}
                </div>
            )
        } else {
            if (cuentoF && !cargando) {
                return (<div >
                    <div className="d-flex justify-content-center">
                        <div className="caja-cerrar-cuento text-end">
                            <button className="btn-close" onClick={(e) => { e.preventDefault(); cerrarCuento() }}></button>
                        </div>

                    </div>
                    <Cuento />
                </div>)
            }
            if (!cuentoF && !cargando) {
                return (
                    <div>
                        <div>
                            <h2 className="text-center">Cuentos de {autor}</h2>
                            <button onClick={(e) => { e.preventDefault(); setAutor("") }} className="btn btn-dark">Volver</button>
                            <div className="text-start">
                                <div className="d-flex flex-column justify-content-center">
                                    {cuentos.map((cuento, i) => {
                                        if (cuento.autor === autor) {
                                            return (
                                                <div className="cuento-box" key={i}>
                                                    <div className="">
                                                        <h5 className="">Titulo: {cuento.titulo}</h5>
                                                        <h5 className="">Autor: {cuento.autor}</h5>
                                                        <h5 className="">Publicado por: {cuento.user}</h5>
                                                        <button onClick={(e) => {
                                                            e.preventDefault();
                                                            resolveCuento(cuento);
                                                            sessionStorage.setItem("location", true)
                                                            sessionStorage.setItem("autor", cuento.autor)
                                                            setCuentoF(true)
                                                        }}>Ver Cuento</button>
                                                    </div> </div>
                                            )
                                        } else {
                                            return false
                                        }
                                    }
                                    )}</div>
                            </div>
                        </div>

                    </div>
                )
            }

        }

    }
}
export default Autores