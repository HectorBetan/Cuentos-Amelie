import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useState, useEffect } from "react";
import libro1 from "../assets/libro1.png";
import usuario from "../assets/usuario.png";
import lapiz from "../assets/lapiz.png";
import msg from "../assets/msg.png";
import ramdom from "../assets/ramdom.png";
import azar from "../assets/azar.png";
import Autores from "./Autores";
import Usuarios from "./Usuarios";
import Mensajes from "./Mensajes";
import Cuento from "./Cuento";
import Logo1 from "../assets/logo-horizontal.png";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
const Cuentos = () => {
    const { admins, user, loading, cuentos, resolveCuento, noCuento, aleatorio, cuento, resolveNoAleatorio, deleteCuento, editarCuento, block } = useApp()
    const [newCuentos, setNewCuentos] = useState(cuentos)
    const [cargando, setCargando] = useState(false)
    const [page, setPage] = useState("all")
    const [cuentoF, setCuentoF] = useState(false)
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
        if (aleatorio && cuento) {
            setPages("ramdom")
            resolveNoAleatorio()
        }
        if (!newCuentos && cuentos) {
            setNewCuentos(cuentos)
        }
    }, [cuentos, newCuentos, aleatorio, cuento, resolveNoAleatorio])
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const setPages = (p) => {
        setPage(p)
    }
    const resolveNewCuento = () => {
        setNewCuentos(null)
        setCargando(true)
        let num = Math.floor(Math.random() * cuentos.length)
        resolveCuento(cuentos[num]); sessionStorage.setItem("location", true);
        setPages("ramdom")
        setCargando(false)
    }
    const changeBuscar = (e) => {
        e.preventDefault();
        setCargando(true);
        const searchTerm = removeAccents(e.target.value.toUpperCase());
        const filteredCuentos = cuentos.filter((cuento) => {
            const titulo = removeAccents(cuento.titulo.toUpperCase());
            const autor = removeAccents(cuento.autor.toUpperCase());
            const user = removeAccents(cuento.user.toUpperCase());
            return titulo.includes(searchTerm) || autor.includes(searchTerm) || user.includes(searchTerm);
        });
        setNewCuentos(filteredCuentos);
        setCargando(false);
    };
    const deleteC = async (id) => {
        setCargando(true)
        await deleteCuento(id).then((res)=>{
            handleCloseDelete()
            handleShowAlertDelete()
            setNewCuentos(res)    
        })
        
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
        handleShowAlertEdit()
        
    }
    const [id, setId] = useState("")
    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => {setShowDelete(false);setCargando(false);};
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
        let cuen = cuentos.find((c) => c.id === id)
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
            setNewCuentos(cuentos)
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
    const descargarPDF = () => {
        const doc = new jsPDF();
        const titleWidth = doc.getTextDimensions("Título: " + cuento.titulo).w;
        const authorWidth = doc.getTextDimensions("Autor: " + cuento.autor).w;
        const pageWidth = doc.internal.pageSize.width;
        const titleX = (pageWidth - titleWidth) / 2;
        const authorX = (pageWidth - authorWidth) / 2;
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Título: " + cuento.titulo, titleX - 10, 20);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Autor: " + cuento.autor, authorX - 10, 30);
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(cuento.cuento, 170);
        let y = 50;
        lines.forEach(line => {
            if (y + 10 > doc.internal.pageSize.height - 10) {
                doc.addPage();
                y = 30;
            }
            doc.text(line, 20, y);
            y += 10;
        });
        let t = cuento.titulo.toLowerCase().replaceAll(" ", "-")
        doc.save(t + ".pdf");
    };
    if (loading || !cuentos || !newCuentos) {
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
            <div className="text-center">
                <div className="d-flex flex-row justify-content-center">
                    <img className="logo-inicio" src={Logo1} alt=""></img>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-row justify-content-center menu-cuentos">
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            setCuentoF(false)
                            setPages("all")
                        }} className={`${page === "all" && "nav-selected"}`}><img className={`menu-img`} src={libro1} alt=""></img></div>
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            setCuentoF(false)
                            setPages("user")
                        }} className={`${page === "user" && "nav-selected"}`}><img className="menu-img" src={usuario} alt=""></img></div>
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            setCuentoF(false)
                            setPages("autor")
                        }} className={`${page === "autor" && "nav-selected"}`}><img className="menu-img" src={lapiz} alt=""></img></div>
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            setCuentoF(false)
                            setPages("msg")
                        }} className={`${page === "msg" && "nav-selected"}`}><img className="menu-img" src={msg} alt=""></img></div>
                        <div role="button" onClick={(e) => {
                            e.preventDefault();
                            let num = Math.floor(Math.random() * cuentos.length)
                            resolveCuento(cuentos[num]); sessionStorage.setItem("location", true);
                            setCuentoF(false)
                            setPages("ramdom")
                        }} className={`${page === "ramdom" && "nav-selected"}`}><img className="menu-img" src={ramdom} alt=""></img></div>
                    </div>
                </div>
                {page === "all" && !cuentoF && <div>
                    <ModalDelete />
                    <ModalAlertDelete />
                    <ModalAlertEdit />
                    <ModalEdit />
                    <label className="m-2">Buscar</label><input onChange={changeBuscar}></input>
                    <div className="text-start">
                        <div className="d-flex flex-column justify-content-center">
                            {!cargando && newCuentos.map((cuento, i) => {
                                if(block.includes(cuento.user_email)){
                                    return false
                                } else{
                                    return (
                                        <div className="cuento-box" key={i}>
                                            {!block.includes(cuento.user_email)&&<div className="">
                                                <div className="">Titulo: <span className="cuento-info">{cuento.titulo}</span></div>
                                                <div className="">Autor: <span className="cuento-info">{cuento.autor}</span></div>
                                                <div className="">Publicado por: <span className="cuento-info">{cuento.user}</span></div>
                                                <div className="d-flex flex-row justify-content-between">
                                                    <button className="btn btn-secondary m-1" onClick={(e) => {
                                                        e.preventDefault();
                                                        resolveCuento(cuento);
                                                        sessionStorage.setItem("location", true)
                                                        setCuentoF(true)
                                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                        </svg> Ver Texto</button>
                                                    {(admins.includes(user.email) || user.uid === cuento.user_id) && <div className="d-flex flex-row justify-content-end">
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
                                                    </div>}
                                                </div>
                                            </div>}
                                        </div>
                                    )
                                }
                                
                            }
                            )}
                            {cargando && <div className="d-flex flex-column justify-content-center text-center">
                                <div
                                    className="spinner-border m-2"
                                    role="status"
                                    style={{ width: "3rem", height: "3rem", marginTop: "8px", alignSelf: "center" }}
                                >
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>}
                {
                    page === "autor" && <Autores />
                }
                {
                    page === "user" && <Usuarios />
                }
                {
                    page === "msg" && <Mensajes />
                }
                {
                    page === "ramdom" &&
                    <div>
                        <div className="d-flex justify-content-center">
                            <div className="caja-cerrar-cuento text-end">
                                <img role="button" src={azar}
                                    alt="" className="azar" onClick={(e) => { e.preventDefault(); resolveNewCuento() }}></img>
                            </div>
                        </div>
                        <Cuento />
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-between caja-abajo-cuento">
                                {cuento && <div>
                                    <img role="button" src={azar}
                                        alt="" className="img-azar" onClick={(e) => { e.preventDefault(); resolveNewCuento() }}></img>
                                </div>}
                                {cuento && <div className="d-flex flex-row justify-content-end">
                                    <button onClick={descargarPDF} className="btn btn-primary m-1">
                                        <i className="bi bi-file-earmark-arrow-down"></i>
                                    </button>
                                    {(admins.includes(user.email) || user.uid === cuento.user_id) && <div>
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
                                    </div>}
                                </div>}
                                {!cuento && <div className="mt-5"></div>}
                            </div>
                        </div>
                    </div>
                }
                {cuentoF && !cargando && page === "all" &&
                    <div >
                        <div className="d-flex justify-content-center">
                            <div className="caja-cerrar-cuento text-end">
                                <button className="btn-close" onClick={(e) => { e.preventDefault(); cerrarCuento() }}></button>
                            </div>
                        </div>
                        <Cuento />
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-between caja-abajo-cuento">
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    cerrarCuento()
                                }} className="btn btn-primary m-1">
                                    Volver
                                </button>
                                <div className="d-flex flex-row justify-content-end">
                                    <button onClick={descargarPDF} className="btn btn-primary m-1">
                                        <i className="bi bi-file-earmark-arrow-down"></i>
                                    </button>
                                    {(admins.includes(user.email) || user.uid === cuento.user_id) && <div>
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
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default Cuentos