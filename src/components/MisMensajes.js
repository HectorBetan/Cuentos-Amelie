import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
const MisMensajes = () => {
    const { loading, misMensajes, deleteMsg, editarMsg } = useApp()
    const [mios, setMios] = useState(null)
    const [verMensaje, setVerMensaje] = useState("")
    useEffect(()=>{
        if(!mios && misMensajes){
            setMios(misMensajes)
        }
    },[mios, misMensajes])
    const navigate = useNavigate()
    const deleteC = async (id) =>{
        await deleteMsg(id)
        handleCloseDelete()
        setMios(misMensajes)
    }
    const updateC = async (id, mensaje) => {
        await editarMsg(id, mensaje)
        handleCloseEdit()
        setMios(misMensajes)
    }
    const [id, setId] = useState("")
    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const ModalDelete = () =>{
        return(
            <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>Realmente deseas eliminar este mensaje?</Modal.Body>
        <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseDelete}>
                Cerrar
            </button>
            <button className="btn btn-danger" onClick={(e)=>{
                e.preventDefault();
                deleteC(id)
            }}>
                Eliminar
            </button>
        </Modal.Footer>
      </Modal>
        )
    }
    const [showEdit, setShowEdit] = useState(false)
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const ModalEdit = () =>{
        let cuen =  mios.find((c)=>c.id === id)
        const [mensaje, setMensaje] = useState({
            asunto: "",
            mensaje: "",
            privado: ""
        })
        useEffect(()=>{
            if(cuen && !mensaje.mensaje){
                setMensaje({
                    asunto: cuen.asunto,
                    mensaje: cuen.mensaje,
                    privado: cuen.privado
                })
            }
        },[cuen, mensaje])
       
        const handleChange = ({ target: { value, name } }) => setMensaje({ ...mensaje, [name]: value });
        const changePrivado = (e) =>{
            if(e.target.checked){
                setMensaje({
                    ...mensaje,
                    privado: true
                })
            } else{
                setMensaje({
                    ...mensaje,
                    privado: false
                })
            }
        }
        if(cuen){
            return(
                <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Mensaje</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                    <form>
                        <div>Asunto</div>
                        <input  className="form-control" id="asunto" name="asunto" value={mensaje.asunto} onChange={handleChange}></input>
                        
                        <div>Mensaje</div>
                        <textarea style={{minHeight: "250px"}} className="form-control" id="mensaje" name="mensaje"  value={mensaje.mensaje}  onChange={handleChange}></textarea>
                        <div>
                        <input id="privado" onChange={changePrivado} type="checkbox" checked={mensaje.privado}></input>
                        Deseo que mi mensaje sea privado
                    </div>
    
                    </form>
    
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleCloseEdit}>
                    Cerrar
                </button>
                <button className="btn btn-primary" onClick={(e)=>{
                    e.preventDefault();
                    updateC(id, mensaje)
                }}>
                    Guardar Cambios
                </button>
            </Modal.Footer>
          </Modal>
            )
        }
       
    }
    if (loading || !misMensajes || !mios) {
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
                <ModalDelete />
                <ModalEdit />

                {mios.map((mensaje, i) => {
                    return (
                        <div  className="mios-box" key={i}>
                            <div className="">
                                <h5 className="">Asunto: {mensaje.asunto}</h5>
                                {mensaje.privado && <p>Mensaje privado</p>}
                                <h6>Mensaje:</h6>
                                {mensaje.mensaje.length > 130 && verMensaje !== mensaje.id && <p>{mensaje.mensaje.slice(0, 129) + "..."}</p>}
                                            {(mensaje.mensaje.length <= 130 || verMensaje === mensaje.id) && <p>{mensaje.mensaje}</p>}
                                            <div className="d-flex flex-row justify-content-between">
                                                {mensaje.mensaje.length > 130 && verMensaje !== mensaje.id &&
                                                    <button className="btn btn-secondary m-1" onClick={(e) => {
                                                        e.preventDefault();
                                                        setVerMensaje(mensaje.id);


                                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                        </svg> Ver Mensaje</button>
                                                }
                                                {mensaje.mensaje.length > 130 && verMensaje === mensaje.id &&
                                                    <button className="btn btn-secondary m-1" onClick={(e) => {
                                                        e.preventDefault();
                                                        setVerMensaje("");


                                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                                  </svg> Ocultar Mensaje</button>
                                                }
                                                {mensaje.mensaje.length <= 130 &&
                                                    <div></div>
                                                }
                                                <div className="d-flex flex-row justify-content-end">
                                                    <button className="btn btn-primary m-1" onClick={(e) => {
                                                        e.preventDefault();
                                                        setId(mensaje.id)
                                                        handleShowEdit()
                                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                        </svg></button>
                                                    <button className="btn btn-danger m-1" onClick={(e) => {
                                                        e.preventDefault();
                                                        setId(mensaje.id)
                                                        handleShowDelete()
                                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                        </svg></button>
                                                </div>
                                            </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        )
    }
}
export default MisMensajes