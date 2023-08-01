import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Autores = () => {
    const { loading, cuentos, resolveCuento } = useApp()
    const navigate = useNavigate()
    const [autores, setAutores] = useState(null)
    const [autor, setAutor] = useState("")
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
        if(loc){
            setAutor(loc)
            sessionStorage.removeItem("autor")
        }
    }, [cuentos, autores])
    if (loading || !cuentos || !autores) {
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
                            <div className="" key={i}>
                                <div className="">
                                    <h5 className="">{autor}</h5>
                                    <button onClick={(e) => { e.preventDefault(); setAutor(autor) }}>Ver Los Cuentos</button>
                                </div> </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <h2 className="text-center">Cuentos de {autor}</h2>
                    <button onClick={(e) => { e.preventDefault(); setAutor("") }} className="btn btn-dark">Volver</button>
                    {cuentos.map((cuento, i) => {
                        if (cuento.autor === autor) {
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
                                            sessionStorage.setItem("autor", cuento.autor)
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
export default Autores