import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import Logo1 from "../assets/logo-horizontal.png"
import { useNavigate } from "react-router-dom";
const Inicio = () => {
    const navigate = useNavigate()
    const { user, login, loading, cuentos, resolveCuento, misCuentos, admins, noauth, misMensajes } = useApp()
    const Principal = () => {
        return (
            <div className="w-100 h-100">
                <div className="d-flex flex-row justify-content-center">
                    <img className="logo-inicio" src={Logo1} alt=""></img>
                </div>
                <div className="text-center home-btns d-flex flex-column justify-content-center">
                    <button onClick={(e) => { e.preventDefault(); navigate("/cuentos") }} className="btn btn-dark">Ver todos los cuentos</button>
                    <button onClick={(e) => { e.preventDefault(); navigate("/mensajes") }} className="btn btn-dark">Ver Mensajes</button>

                    <button onClick={(e) => { e.preventDefault(); navigate("/usuarios") }} className="btn btn-dark">Ver cuentos por Usuario</button>
                    <button onClick={(e) => { e.preventDefault(); navigate("/autores") }} className="btn btn-dark">Ver cuentos por Autor</button>
                    {cuentos && <button onClick={(e) => {
                        e.preventDefault(); let num = Math.floor(Math.random() * cuentos.length)
                        resolveCuento(cuentos[num]); sessionStorage.setItem("location", true); navigate("/cuento")
                    }} className="btn btn-dark">Ver cuento Aleatorio</button>}
                    {misCuentos && misCuentos.length > 0 && <button onClick={(e) => { e.preventDefault(); navigate("/mis-cuentos") }} className="btn btn-dark">Ver mis Cuentos</button>
                    }
                    {misMensajes && misMensajes.length > 0 && <button onClick={(e) => { e.preventDefault(); navigate("/mis-mensajes") }} className="btn btn-dark">Ver mis Mensajes</button>
                    }
                    <button onClick={(e) => { e.preventDefault(); navigate("/publicar") }} className="btn btn-dark">Publicar Cuento</button>
                    <button onClick={(e) => { e.preventDefault(); navigate("/enviar") }} className="btn btn-dark">Enviar Mensaje</button>
                    {admins.includes(user.email) && <button onClick={(e) => { e.preventDefault(); navigate("/admin") }} className="btn btn-dark">Configuración</button>
}
                </div>
            </div>
        )
    }
    if (loading) {
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
        if (!user) {
            return (
                <div className="d-flex flex-column justify-content-center h-100">
                    <div className="d-flex flex-column justify-content-center" style={{ alignSelf: "center" }}>
                        <img className="logo-home" src={Logo} alt=""></img>
                        <div className=" d-flex justify-content-center">

                            <button className="btn btn-primary  p-2 ps-4 pe-4 fs-5 m-2 fw-bold" onClick={login}>Login</button>
                            
                        </div>
                        {noauth && <div className="alert alert-danger text-center" role="alert">
  No estas autorizado para ingresar
</div>}
                    </div>

                </div>
            )
        } else {
            return (
                <Principal />
            )
        }
    }

}
export default Inicio;