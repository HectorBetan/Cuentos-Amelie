
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import Logo1 from "../assets/logo-horizontal.png";
import MisCuentos from "./MisCuentos"
import MisMensajes from "./MisMensajes"
const Config = () => {
    const { users, addBlock, removeBlock, misCuentos, misMensajes, block } = useApp()
    const [usuarios, setUsuarios] = useState([])
    const [newUsers, setNewUsers] = useState("")
    const [deleteU, setDeleteU] = useState("")
    const [ventana, setVentana] = useState(null)
    const addDelete = (i) => {
        setDeleteU(i)
    }
    const handleChange = (e) => {
        setNewUsers(e.target.value)
    }
    const handleDelete = async (user) => {
        await removeBlock(user)
        setUsuarios([])
    }
    const registrarUsuarios = (e) => {
        e.preventDefault()

            addBlock(newUsers)
        
        document.getElementById("users").value = ""
        setUsuarios([])
    }
    useEffect(() => {
        if (users && (!usuarios || usuarios.length === 0)) {
            setUsuarios(users)
        }

    }, [usuarios, users])
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
                }} className="btn-config">Mis Cuentos</button>
                }
                {misMensajes && misMensajes.length > 0 && <button onClick={(e) => {
                    e.preventDefault();
                    if (ventana !== "mensajes") {
                        setVentana("mensajes")
                    }
                    if (ventana === "mensajes") {
                        setVentana(null)
                    }
                }} className="btn-config">Mis Mensajes</button>
                }
            </div>
            {ventana && <div className="d-flex justify-content-center">
                <div className="config-box">
                    {ventana === "cuentos" && <MisCuentos />}
                    {ventana === "mensajes" && <MisMensajes />}
                </div>
            </div>}
            <div>
                <h4>Administrar Usuarios</h4>
                {<div>

                   <div>
                        {block && usuarios && usuarios.map((usuario, i) => {
                            if(usuario !== "all"){
                                let use = usuario.split(",")
                                return (
                                    <div key={i} className="d-flex justify-content-center">
<div className={`d-flex flex-row justify-content-between alert ${block.includes(use[0]) ? "alert-danger" : "alert-primary"} users-box`}>
                                        <div className="d-flex flex-column text-start">
                                        <div className="">{use[1]}</div>
                                        <div className="">{use[0]}</div>
                                        </div>
                                        
                                        <div>
                                        

                                        {deleteU !== i && <button className={`btn ${block.includes(use[0]) ? "btn-success" : "btn-danger"}`} onClick={(e) => {
                                            e.preventDefault()
                                            addDelete(i)
                                        }}>
                                            {block.includes(use[0]) && <i className="bi bi-person-fill-check"></i>}
                                            {!block.includes(use[0]) && <i className="bi bi-person-fill-slash"></i>}
                                            </button>}
                                        {deleteU === i &&
                                            <div>
                                                <button className="btn btn-danger" onClick={(e) => {
                                                    handleDelete(usuario)
                                                }} ><i className="bi bi-check-lg fs-5"></i></button>
                                                <button className="btn btn-secondary" onClick={(e) => {
                                                    e.preventDefault()
                                                    addDelete("")
                                                }}><i className="bi bi-x-lg fs-5"></i></button>
                                            </div>
                                        }
                                        </div>
                                        
    
                                    </div>
                                    </div>
                                    
                                )
                            } else {
                                return false
                            }
                            
                        })}
                        <form onSubmit={registrarUsuarios}>
                            <div>
                                Agregar usuario(s)

                            </div>
                            <div>
                                <input id="users" onChange={handleChange} type="text" required></input>
                            </div>
                        </form>
                    </div>


                    <button type="submit">Guardar</button>


                </div>}
            </div>
            <div>
                <button onClick={(e) => { e.preventDefault(); }} className="btn btn-dark">Cambiar Nombre</button>

            </div>
            <div>
                <button onClick={(e) => { e.preventDefault(); }} className="btn btn-dark">Eliminar Cuenta</button>

            </div>
        </div>
    )
}
export default Config