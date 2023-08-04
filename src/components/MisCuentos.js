import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Cuento from "./Cuento";
const MisCuentos = () => {
    const { loading, resolveCuento, misCuentos, deleteCuento, editarCuento } = useApp()
    const [mios, setMios] = useState(null)
    useEffect(() => {
        if (!mios && misCuentos) {
            setMios(misCuentos)
        }
    }, [mios, misCuentos])
    const deleteC = async (id) => {
        await deleteCuento(id)
        handleCloseDelete()
        setMios(misCuentos)
        handleShowAlertDelete()
    }
    const updateC = async (id, cuento) => {
        let c = {
            titulo: cuento.titulo,
            autor: cuento.autor,
            cuento: cuento.cuento
        }
        if (!c.autor){
            c.autor = "Sin Autor"
        }
        await editarCuento(id, c)
        handleCloseEdit()
        setMios(misCuentos)
        handleShowAlertEdit()
    }
    const [id, setId] = useState("")
    const [showCuento, setShowCuento] = useState(false)
    const handleCloseCuento = () => setShowCuento(false);
    const handleShowCuento = () => setShowCuento(true);
    const ModalCuento = () => {
        
        return (
            <Modal show={showCuento} onHide={handleCloseCuento}>
                <div className="text-end cerrar-config">
                    <button className="btn-close" onClick={(e) => { e.preventDefault(); handleCloseCuento() }}></button>
                </div>
                <Modal.Body><Cuento /></Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseCuento}>
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const ModalDelete = () => {
        return (
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Texto</Modal.Title>
                </Modal.Header>
                <Modal.Body>Realmente deseas eliminar este texto?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseDelete}>
                        Cerrar
                    </button>
                    <button className="btn btn-danger" onClick={(e) => {
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
    const ModalEdit = () => {
        let cuen = mios.find((c) => c.id === id)
        const [cuento, setCuento] = useState({
            titulo: "",
            autor: "",
            cuento: ""
        })
        const [start, setStart] = useState(true)
        useEffect(() => {
            if (cuen && start) {
                setCuento({
                    titulo: cuen.titulo,
                    autor: cuen.autor,
                    cuento: cuen.cuento
                })
                setStart(false)
            }
        }, [cuen, start])
        const handleChange = ({ target: { value, name } }) => setCuento({ ...cuento, [name]: value });
        if (cuen) {
            return (
                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Texto</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e) => {
                            e.preventDefault();
                            updateC(id, cuento)
                        }}>
                    <Modal.Body>
                        <div className="text-center">
                            
                                <div className="m-1">Titulo</div>
                                <input className="form-control" id="titulo" name="titulo" value={cuento.titulo} onChange={handleChange} required></input>
                                <div className="m-1">Autor</div>
                                <input className="form-control" id="autor" name="autor" value={cuento.autor} onChange={handleChange}></input>
                                <div className="m-1">Texto</div>
                                <textarea style={{ minHeight: "250px" }} className="form-control" id="cuento" name="cuento" value={cuento.cuento} onChange={handleChange} required></textarea>
                                <div>
                                </div>
                  
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleCloseEdit}>
                            Cerrar
                        </button>
                        <button className="btn btn-primary" type="submit">
                            Guardar Cambios
                        </button>
                    </Modal.Footer>
                    </form>
                </Modal>
            )
        }
    }
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    if (showAlertDelete) {
        setTimeout(() => {
            setShowAlertDelete(false)
        }, 1500)
    }
    const handleShowAlertDelete = () => {
        setTimeout(() => {
            setShowAlertDelete(true)
        }, 1000)
    }
    const ModalAlertDelete = () => {
        return (
            <Modal show={showAlertDelete} size="sm">
                <Modal.Body>
                    <div className="text-center alertas">
                        <i className="bi bi-journal-x"></i>
                        <div className="">
                            Tu texto ha sido eliminado
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    const [showAlertEdit, setShowAlertEdit] = useState(false);
    if (showAlertEdit) {
        setTimeout(() => {
            setShowAlertEdit(false)
        }, 1500)
    }
    const handleShowAlertEdit = () => {
        setTimeout(() => {
            setShowAlertEdit(true)
        }, 1000)
    }
    const ModalAlertEdit = () => {
        return (
            <Modal show={showAlertEdit} size="sm">
                <Modal.Body>
                    <div className="text-center alertas">
                        <i className="bi bi-journal-check"></i>
                        <div className="">
                            Tu texto ha sido editado
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
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
                <ModalCuento />
                <ModalAlertDelete />
                <ModalAlertEdit />
                {mios.map((cuento, i) => {
                    return (
                        <div className="mios-box" key={i}>
                            <div className="">
                                <h5 className="">Titulo: {cuento.titulo}</h5>
                                <h5 className="">Autor: {cuento.autor}</h5>
                                <button className="btn btn-secondary m-1" onClick={(e) => {
                                    e.preventDefault();
                                    resolveCuento(cuento);
                                    setId(cuento.id)
                                    handleShowCuento()
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                    </svg></button>
                                <button className="btn btn-primary m-1" onClick={(e) => {
                                    e.preventDefault();
                                    setId(cuento.id)
                                    handleShowEdit()
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg></button>
                                <button className="btn btn-danger m-1" onClick={(e) => {
                                    e.preventDefault();
                                    setId(cuento.id)
                                    handleShowDelete()
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg></button>
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