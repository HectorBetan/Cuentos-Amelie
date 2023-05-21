import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
const MisCuentos = () => {
    const { loading, resolveCuento, misCuentos, deleteCuento, editarCuento } = useApp()
    const [mios, setMios] = useState(null)
    useEffect(()=>{
        if(!mios && misCuentos){
            setMios(misCuentos)
        }
    },[mios, misCuentos])
    const navigate = useNavigate()
    const deleteC = async (id) =>{
        await deleteCuento(id)
        handleCloseDelete()
        setMios(misCuentos)
    }
    const updateC = async (id, cuento) => {
        await editarCuento(id, cuento)
        handleCloseEdit()
        setMios(misCuentos)
    }
    const [id, setId] = useState("")
    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const ModalDelete = () =>{
        return(
            <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Cuento</Modal.Title>
        </Modal.Header>
        <Modal.Body>Realmente deseas eliminar este cuento?</Modal.Body>
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
        const [cuento, setCuento] = useState({
            titulo: "",
            autor: "",
            cuento: ""
        })
        useEffect(()=>{
            if(cuen && !cuento.titulo){
                setCuento({
                    titulo: cuen.titulo,
                    autor: cuen.autor,
                    cuento: cuen.cuento
                })
            }
        },[cuen, cuento])
        
        const handleChange = ({ target: { value, name } }) => setCuento({ ...cuento, [name]: value });
        
        if(cuen){
            return(
                <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Cuento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                    <form>
                        <div>Titulo</div>
                        <input  className="form-control" id="titulo" name="titulo" value={cuento.titulo} onChange={handleChange}></input>
                        <div>Autor</div>
                        <input className="form-control" id="autor" name="autor"  value={cuento.autor}  onChange={handleChange}></input>
                        <div>Cuento</div>
                        <textarea style={{minHeight: "250px"}} className="form-control" id="cuento" name="cuento"  value={cuento.cuento}  onChange={handleChange}></textarea>
                        <div>
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
                    updateC(id, cuento)
                }}>
                    Guardar Cambios
                </button>
            </Modal.Footer>
          </Modal>
            )
        }
       
    }
    if (loading || !misCuentos || !mios) {
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
                
                <h2 className="text-center">Mis Cuentos</h2>
                <button onClick={(e) => { e.preventDefault(); navigate("/") }} className="btn btn-dark">Volver</button>
                </div>
                
                {mios.map((cuento, i) => {
                    return (
                        <div className="" key={i}>
                            <div className="">
                                <h5 className="">Titulo: {cuento.titulo}</h5>
                                <h5 className="">Autor: {cuento.autor}</h5>

                                <button onClick={(e) => {
                                    e.preventDefault();
                                    resolveCuento(cuento);
                                    sessionStorage.setItem("location", true)
                                    navigate("/cuento")
                                }}>Ver Cuento</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setId(cuento.id)
                                    handleShowEdit()
                                }}>Editar Cuento</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setId(cuento.id)
                                    handleShowDelete()
                                }}>Eliminar Cuento</button>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        )
    }
}
export default MisCuentos