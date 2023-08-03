
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import Logo1 from "../assets/logo-horizontal.png";
import MisCuentos from "./MisCuentos"
import MisMensajes from "./MisMensajes"
import Modal from "react-bootstrap/Modal";

const Config = () => {
    const { users, user, addBlock, removeBlock, misCuentos, misMensajes, block, admins, publicar, enviar } = useApp()
    const [usuarios, setUsuarios] = useState([])
    const [deleteU, setDeleteU] = useState("")
    const [ventana, setVentana] = useState(null)
    const [administrar, setAdministrar] = useState(false)
    const [cambiar, setCambiar] = useState(false)
    const [eliminar, setEliminar] = useState(false)
    const [alert, setAlert] = useState(null)
    const handleRemove = async (us) => {
        console.log(us)
        await removeBlock(us)
        .then(() =>{

                setAlert("Se ha desbloqueado a " + users[deleteU].split(",")[1]);
                handleCloseBlock()
        })
    }
    if (alert){
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }
    const handleBlock = async (us) => {
        await addBlock(us)
        .then(() =>{

            setAlert("Se ha bloqueado a " + users[deleteU].split(",")[1]);
            handleCloseBlock()
    })
    }
    useEffect(() => {
        if (users && (!usuarios || usuarios.length === 0)) {
            setUsuarios(users)
        }

    }, [usuarios, users])
    const [showBlock, setShowBlock] = useState(false)
    const addDelete = (i) => {
        setDeleteU(i)
        handleShowBlock(true)
    }
    const handleShowBlock = () => { setShowBlock(true) }
    const handleCloseBlock = () => { setShowBlock(false) }
    const ModalBlock = () => {
        console.log(users)
        console.log(block)
        console.log(deleteU)
        return (<Modal show={showBlock} onHide={handleCloseBlock}>
            <Modal.Header closeButton>
                <Modal.Title>{users && deleteU && block && block.includes(users[deleteU].split(",")[0]) && "Desloquear Usuario"}{users && deleteU && block && !block.includes(users[deleteU].split(",")[0]) && "Bloquear Usuario"}</Modal.Title>

            </Modal.Header>
            <Modal.Body>
                {block && users && deleteU && <div>
                    {block.includes(users[deleteU].split(",")[0]) && <span>Realmente deseas desbloquear a {deleteU && users[deleteU].split(",")[1]}</span>}
                    {!block.includes(users[deleteU].split(",")[0]) && <span>Realmente deseas bloquear a {deleteU && users[deleteU].split(",")[1]}</span>}
                </div>}

            </Modal.Body>
            <Modal.Footer>
                <button className={`btn ${block.includes(users[deleteU].split(",")[0]) ? "btn-success":"btn-danger"}`} onClick={(e) => { e.preventDefault();
                if(block.includes(users[deleteU].split(",")[0])){
                    handleRemove(users[deleteU].split(",")[0])
                } else{
                    handleBlock(users[deleteU].split(",")[0])
                }
                }}>Aceptar</button>
                <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); handleCloseBlock() }}>Cancelar</button>
            </Modal.Footer>
        </Modal>)
    }
    const [cuento, setCuento] = useState({
        titulo: "",
        autor: "",
        cuento: ""
    })
    const handleChangeC = ({ target: { value, name } }) => setCuento({ ...cuento, [name]: value });
    const publicarCuento = async (e) => {
        e.preventDefault();
        let c = {
            user: user.displayName,
            user_id: user.uid,
            titulo: cuento.titulo,
            autor: cuento.autor,
            cuento: cuento.cuento
        }
        await publicar(c)
            .then(() => {
                document.getElementById("titulo").value = ""
                document.getElementById("autor").value = ""
                document.getElementById("cuento").value = ""
            })

    }


    const [showPublicar, setShowPublicar] = useState(false);

    const handleClosePublicar = () => setShowPublicar(false);
    const handleShowPublicar = () => setShowPublicar(true);
    const ModalPublicar = () => {
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
                                <input id="titulo" name="titulo" onChange={handleChangeC}></input>
                                <div>Autor</div>
                                <input id="autor" name="autor" onChange={handleChangeC}></input>
                                <div>Cuento</div>
                                <textarea id="cuento" name="cuento" onChange={handleChangeC}></textarea>
                                <div>
                                    <Modal.Footer>

                                        <button onClick={(e) => { e.preventDefault(); handleClosePublicar() }} className="btn btn-secondary">Cancelar</button>
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
    const [msg, setMsg] = useState({
        asunto: "",
        msg: ""
    })
    const [privado, setPrivado] = useState(false)
    const changePrivado = (e) => {
        if (e.target.checked) {
            setPrivado(true)
        } else {
            setPrivado(false)
        }
    }
    const enviarMsg = async (e) => {
        e.preventDefault();
        let c = {
            user: user.displayName,
            user_id: user.uid,
            asunto: msg.asunto,
            mensaje: msg.msg,
            privado: privado,
        }
        await enviar(c)
            .then(() => {
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
    const [showMsg, setShowMsg] = useState(false);

    const handleCloseMsg = () => setShowMsg(false);
    const handleShowMsg = () => setShowMsg(true);
    const ModalMsg = () => {
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
                                <textarea type="text" id="msg" name="msg" onChange={handleChangeMsg}></textarea>
                                <div>
                                    <input className="me-1" id="privado" onChange={changePrivado} type="checkbox"></input>
                                    Deseo que mi mensaje sea privado
                                </div>
                                <div>

                                    <Modal.Footer>

                                        <button onClick={(e) => { e.preventDefault(); handleCloseMsg() }} className="btn btn-secondary">Cancelar</button>
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
    return (
        <div className="text-center">
            <div className="d-flex flex-row justify-content-center">
                <img className="logo-inicio" src={Logo1} alt=""></img>
            </div>
            <div>
                {misCuentos && misCuentos.length > 0 && <button onClick={(e) => {
                    e.preventDefault();
                    if (ventana !== "cuentos") {
                        setVentana("cuentos")
                    }
                    if (ventana === "cuentos") {
                        setVentana(null)
                    }
                }} className={`${misMensajes && misMensajes.length > 0 ? "btn-config" : "btn-publicar"}`}>Mis Textos</button>
                }
                {misMensajes && misMensajes.length > 0 && <button onClick={(e) => {
                    e.preventDefault();
                    if (ventana !== "mensajes") {
                        setVentana("mensajes")
                    }
                    if (ventana === "mensajes") {
                        setVentana(null)
                    }
                }} className={`${misCuentos && misCuentos.length > 0 ? "btn-config" : "btn-publicar"}`}>Mis Mensajes</button>
                }
            </div>
            {ventana && <div className="d-flex justify-content-center">
                <div className="config-box">
                    {ventana === "cuentos" && <MisCuentos />}
                    {ventana === "mensajes" && <MisMensajes />}
                </div>
            </div>}
            <ModalPublicar />
            <ModalMsg />
            <div>
                <button onClick={(e) => { e.preventDefault(); handleShowPublicar() }} className="mt-3 btn-publicar">Publicar Texto</button>


            </div>
            <div>
                <button onClick={(e) => { e.preventDefault(); handleShowMsg() }} className="mt-3 btn-publicar">Enviar Mensaje</button>

            </div>
            {admins.includes(user.email) && <div>
                <button className="btn-admin mt-3" onClick={(e) => { e.preventDefault(); if (!administrar) { setAdministrar(true) } else { setAdministrar(false) } }}>Administrar Usuarios</button>
                {administrar && <div className="d-flex justify-content-center">

                    <div className="admin-box">
                        {alert && <div className={`${alert.includes("desbloqueado") ? "desbloqueado":"bloqueado"}`}>
                            
                            {alert.includes("desbloqueado") ?  <i className="bi bi-person-fill-check me-1"></i> :<i className="me-1 bi bi-person-fill-slash"></i>}
                            
                            {alert}</div>}
                        {block && usuarios && usuarios.map((usuario, i) => {
                            if (usuario !== "all") {
                                let use = usuario.split(",")
                                return (
                                    <div key={i} className="d-flex justify-content-center">
                                        {!admins.includes(use[0]) && <div className={`d-flex flex-row justify-content-between alert ${block.includes(use[0]) ? "alert-danger" : "alert-primary"} users-box`}>
                                            <div className="d-flex flex-column text-start">
                                                <div className="">{use[1]}</div>
                                                <div className="">{use[0]}</div>
                                            </div>

                                            <div>

                                                {deleteU && <ModalBlock />}
                                                <button className={`btn ${block.includes(use[0]) ? "btn-success" : "btn-danger"}`} onClick={(e) => {
                                                    e.preventDefault()
                                                    addDelete(i)
                                                }}>
                                                    {block.includes(use[0]) && <i className="bi bi-person-fill-check"></i>}
                                                    {!block.includes(use[0]) && <i className="bi bi-person-fill-slash"></i>}
                                                </button>


                                            </div>


                                        </div>}
                                    </div>

                                )
                            } else {
                                return false
                            }

                        })}
                    </div>




                </div>}
            </div>}
            <div>
                <button onClick={(e) => { e.preventDefault(); if (!cambiar) { setCambiar(true) } else { setCambiar(false) } }} className="mt-3 btn-cambiar">Cambiar Nombre</button>
                {cambiar && <div>
                    <div className="d-flex justify-content-center">
                        <div className="config-box">
                            <input></input>
                            <button className="btn btn-primary m-2">Cambiar</button>
                            <button className="btn btn-secondary m-2" onClick={(e) => { e.preventDefault(); setCambiar(false) }}>Cancelar</button>
                        </div>
                    </div>

                </div>}
            </div>
            {!admins.includes(user.email)  && <div>
                <button onClick={(e) => { e.preventDefault(); if (!eliminar) { setEliminar(true) } else { setEliminar(false) } }} className="mt-3 btn-eliminar">Eliminar Cuenta</button>
                {eliminar && <div>
                    <div className="d-flex justify-content-center">
                        <div className="config-box">
                            <div>¿Realmente deseas eliminar tu cuenta?</div>
                            <button className="btn btn-danger m-2">Eliminar</button>
                            <button className="btn btn-secondary m-2" onClick={(e) => { e.preventDefault(); setEliminar(false) }}>Cancelar</button>
                        </div>
                    </div>

                </div>}
            </div>}
        </div>
    )
}
export default Config