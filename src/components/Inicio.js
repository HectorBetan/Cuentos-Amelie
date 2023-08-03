import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png";
import Logo1 from "../assets/logo-horizontal.png";
import config from "../assets/config.png";
import home from "../assets/home.png";
import libro from "../assets/libro.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cuentos from "./Cuentos";
import Config from './Config';
import Modal from "react-bootstrap/Modal";
import libro1 from "../assets/libro1.png";
import ramdom from "../assets/ramdom.png";
import lapiz from "../assets/lapiz.png";
import msg1 from "../assets/msg.png";
const Inicio = () => {
    const navigate = useNavigate()
    const { user, login, loading, cuentos, resolveCuento, misCuentos, admins, noauth, misMensajes, publicar, enviar, resolveAleatorio  } = useApp()
    const [page, setPage] = useState("home")
    const setPageHome = (e) => {
        e.preventDefault()
        setPage("home")
    }
    const setPageCuentos = (e) => {
        e.preventDefault()
        setPage("cuentos")
    }
    const setPageConfig = (e) => {
        e.preventDefault()
        setPage("config")
    }
    


    const [showPublicar, setShowPublicar] = useState(false);

    const handleClosePublicar = () => setShowPublicar(false);
    const handleShowPublicar = () => setShowPublicar(true);
    const ModalPublicar = () =>{
        const [cuento, setCuento] = useState({
            titulo: "",
            autor: "",
            cuento: ""
        })
        const handleChange = ({ target: { value, name } }) => setCuento({ ...cuento, [name]: value });
        const publicarCuento = async (e) =>{
            e.preventDefault();
            let c = {
                user: user.displayName,
                user_id: user.uid,
                titulo: cuento.titulo,
                autor: cuento.autor,
                cuento: cuento.cuento
            }
            await publicar(c)
            .then(()=>{
                handleClosePublicar()
                handleShowAlertPublicar()
                document.getElementById("titulo").value = ""
                document.getElementById("autor").value = ""
                document.getElementById("cuento").value = ""
                
            })
    
        }
        console.log(user)
        return (
            <Modal show={showPublicar} onHide={handleClosePublicar} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Publicar Texto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center">
            <div>
                <form className="publicar-cuento">
                    <div>Titulo</div>
                    <input id="titulo" name="titulo" onChange={handleChange}></input>
                    <div>Autor</div>
                    <input id="autor" name="autor"  onChange={handleChange}></input>
                    <div>Cuento</div>
                    <textarea id="cuento" name="cuento"  onChange={handleChange}></textarea>
                    <div>
                    <Modal.Footer>
                    
                    <button onClick={(e)=>{e.preventDefault(); handleClosePublicar()}}  className="btn btn-secondary">Cancelar</button>
                    <button onClick={publicarCuento} className="btn btn-primary">Publicar Texto</button>
                    </Modal.Footer>
                    </div>

                </form>

            </div>
        </div>
        </Modal.Body>
      </Modal>
          );
    }
    const [showAlertPublicar, setShowAlertPublicar] = useState(false);

    if (showAlertPublicar){
        setTimeout(() => {
            setShowAlertPublicar(false)
        },3000)
    }
    const handleShowAlertPublicar = () => {setTimeout(() => {
        setShowAlertPublicar(true)
    },1000)};
    const ModalAlertPublicar = () =>{
        
        return (
            <Modal show={showAlertPublicar} size="sm">
        <Modal.Body>
            <div className="text-center">
            <div>
               Se ha publicado tu texto correctamente

            </div>
        </div>
        </Modal.Body>
      </Modal>
          );
    }
    const [showAlertMsg, setShowAlertMsg] = useState(false);

    if (showAlertMsg){
        setTimeout(() => {
            setShowAlertMsg(false)
        },3000)
    }
    const handleShowAlertMsg = () => {setTimeout(() => {
        setShowAlertMsg(true)
    },1000)}
    const ModalAlertMsg = () =>{
        
        return (
            <Modal show={showAlertMsg} size="sm">
        <Modal.Body>
            <div className="text-center">
            <div>
               Tu mensaje ha sido enviado correctamente

            </div>
        </div>
        </Modal.Body>
      </Modal>
          );
    }
    
    const [showMsg, setShowMsg] = useState(false);

    const handleCloseMsg = () => setShowMsg(false);
    const handleShowMsg = () => setShowMsg(true);
    const ModalMsg = () =>{
        const [msg, setMsg] = useState({
            asunto: "",
            msg: ""
        })
        const [privado, setPrivado] = useState(false)
        const changePrivado = (e) =>{
            if(e.target.checked){
                setPrivado(true)
            } else{
                setPrivado(false)
            }
        }
        const enviarMsg = async (e) =>{
            e.preventDefault();
            let c = {
                user: user.displayName,
                user_id: user.uid,
                asunto: msg.asunto,
                mensaje: msg.msg,
                privado: privado,
            }
            await enviar(c)
            .then(()=>{
                handleCloseMsg()
                handleShowAlertMsg()
                document.getElementById("asunto").value = ""
                document.getElementById("msg").value = ""
                document.getElementById("privado").checked = false
                setMsg({
                    asunto: "",
                    msg: ""
                })
                setPrivado(false)
                
            })
    
        }
        const handleChangeMsg = ({ target: { value, name } }) => setMsg({ ...msg, [name]: value });
        return (
            <Modal show={showMsg} onHide={handleCloseMsg} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Enviar Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center">
            <div>
                <form className="publicar-cuento">
                    <div>Asunto</div>
                    <input type="text" id="asunto" name="asunto" onChange={handleChangeMsg}></input>
                    <div>Mensaje</div>
                    <textarea type="text" id="msg" name="msg"  onChange={handleChangeMsg}></textarea>
                    <div>
                        <input id="privado" onChange={changePrivado} type="checkbox"></input>
                        Deseo que mi mensaje sea privado
                    </div>
                    <div>
                    
                    <Modal.Footer>
                    
                    <button onClick={(e)=>{e.preventDefault(); handleCloseMsg()}}  className="btn btn-secondary">Cancelar</button>
                    <button onClick={enviarMsg} className="btn btn-primary">Enviar Mensaje</button>
                    </Modal.Footer>
                    </div>
                </form>

            </div>
        </div>
        </Modal.Body>
      </Modal>
          );
    }
    const Navigation = () => {
        return (
            <div className="navigation-btns">
                
                <div className="d-flex flex-row justify-content-center">
                    <div className={`lateral-1 ${page === "cuentos" ? "nav-selected" : "nav-not"}`} role="button" onClick={setPageCuentos}>
                        <img className="libro-nav img-nav" src={libro} alt=""></img>
                    </div>
                    <div className={`lateral-2 ${page === "config" ? "nav-selected" : "nav-not"}`} role="button" onClick={setPageConfig}>
                        <img className="config-nav img-nav" src={config} alt=""></img>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center"><div className={`centro ${page === "home" ? "nav-selected" : "nav-not"}`} role="button" onClick={setPageHome}>
                    <img className="home-nav  img-nav-centro" src={home} alt=""></img>
                </div></div>

            </div>

        )
    }
    const HomeInfo = () => {
        return (
            <div className="w-100 h-100">
                <ModalAlertPublicar />
                <ModalAlertMsg />
                <div className="d-flex flex-row justify-content-center">
                    <img className="logo-inicio" src={Logo1} alt=""></img>
                </div>
                <ModalPublicar />
                <ModalMsg />
                <div className="text-start  home-btns d-flex flex-column justify-content-center">
                    <button onClick={setPageCuentos} className=""><img src={libro1} alt=""></img>Ver Textos</button>

                    <button onClick={(e) => { e.preventDefault();let num = Math.floor(Math.random() * cuentos.length)
                        resolveCuento(cuentos[num]); sessionStorage.setItem("location", true); resolveAleatorio(); setPage("cuentos"); }} className="">
                            <img src={ramdom} alt=""></img>Ver Texto Aleatorio</button>


                    <button onClick={(e) => { e.preventDefault(); handleShowPublicar() }} className=""><img src={lapiz} alt=""></img>Publicar Texto</button>
                    <button onClick={(e) => { e.preventDefault(); handleShowMsg() }} className=""><img src={msg1} alt=""></img>Enviar Mensaje</button>
                    


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

                        <button className="btn btn-primary  p-2 ps-4 pe-4 fs-5 m-2 fw-bold btn-login" onClick={login}>Login</button>

                        </div>
                        {noauth && <div className="alert alert-danger text-center" role="alert">
                            No estas autorizado para ingresar
                        </div>}
                    </div>

                </div>
            )
        } else {
            return (
                <div className="margin-nav">
                    {page === "home" && <HomeInfo />}
                    {page === "cuentos" && <Cuentos />}
                    {page === "config" && <Config />}
                    <Navigation />
                </div>

            )
        }
    }

}
export default Inicio;