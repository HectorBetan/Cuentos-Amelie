import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import Logo1 from "../assets/logo-horizontal.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Cuentos = () => {
    const { user, loading, publicar, cuentos, resolveCuento } = useApp()
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState(null)
    const [usuario, setUsuario] = useState("")
    useEffect(() => {
        const setUsers = () => {
            let c = []
            cuentos.forEach((cuento) => {
                if (!c.includes(cuento.user))
                    c.push(cuento.user)

            })
            console.log(c)
            setUsuarios(c)
        }
        if (!usuarios && cuentos) {
            setUsers()
        }
        let loc
        try {
            loc = sessionStorage.getItem("usuario")
        } catch (error) {
            console.log(error)
        }
        if(loc){
            setUsuario(loc)
            sessionStorage.removeItem("usuario")
        }
    }, [cuentos, usuarios])
    if (loading || !cuentos || !usuarios) {
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
        if (!usuario) {
            return (
                <div>
                    <div className="d-flex justify-content-center">
                        <h2 className="text-center">Usuarios</h2>
                        <button onClick={(e) => { e.preventDefault(); navigate("/") }} className="btn btn-dark">Volver</button>
                    </div>

                    {usuarios.map((usuario, i) => {
                        return (
                            <div className="" key={i}>
                                <div className="">
                                    <h5 className="">{usuario}</h5>
                                    <button onClick={(e) => { e.preventDefault(); setUsuario(usuario) }}>Ver Los Cuentos</button>
                                </div> </div>
                        )
                    }
                    )}
                </div>
            )
        } else {
            return (
                <div>
                    <h2 className="text-center">Cuentos de {usuario}</h2>
                    <button onClick={(e) => { e.preventDefault(); setUsuario("") }} className="btn btn-dark">Volver</button>
                    {cuentos.map((cuento, i) => {
                        if (cuento.user === usuario) {
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
                                            sessionStorage.setItem("usuario", cuento.user)
                                            navigate("/cuento")
                                        }}>Ver Cuento</button>
                                    </div> </div>
                            )
                        } else {
                            return false
                        }
                    }
                    )}
                </div>
            )
        }

    }
}
export default Cuentos