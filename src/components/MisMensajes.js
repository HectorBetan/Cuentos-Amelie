import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
const MisMensajes = () => {
    const { loading, misMensajes, deleteMsg, editarMsg } = useApp()
    const [mios, setMios] = useState(null)
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
                <div className="d-flex justify-content-center">
                
                <h2 className="text-center">Mis Mensajes</h2>
                <button onClick={(e) => { e.preventDefault(); navigate("/") }} className="btn btn-dark">Volver</button>
                </div>
                
                {mios.map((mensaje, i) => {
                    return (
                        <div className="" key={i}>
                            <div className="">
                                <h5 className="">Asunto: {mensaje.asunto}</h5>
                                <p>{mensaje.mensaje}</p>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setId(mensaje.id)
                                    handleShowEdit()
                                }}>Editar Mensaje</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setId(mensaje.id)
                                    handleShowDelete()
                                }}>Eliminar Mensaje</button>
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