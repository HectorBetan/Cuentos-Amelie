
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

const Config = () => {
    const { users, registerUsers, removeUser } = useApp()
    const [usuarios, setUsuarios] = useState([])
    const [cualquiera, setCualquiera] = useState(false)
    const [newUsers, setNewUsers] = useState("")
    const [deleteU, setDeleteU] = useState("")
    const changeCualq = (e) => {
        if (e.target.checked) {
            setCualquiera(true)
        } else {
            setCualquiera(false)
        }
    }
    const addDelete = (i) => {
        setDeleteU(i)
    }
    const handleChange = (e) => {
        setNewUsers(e.target.value)
    }
    const handleDelete = async (user) => {
        await removeUser(user)
        setUsuarios([])
    }
    const registrarUsuarios = (e) => {
        e.preventDefault()
        if (cualquiera) {
            registerUsers("cualquiera")
        } else {
            registerUsers(newUsers)
        }
        document.getElementById("users").value = ""
        setUsuarios([])
    }
    useEffect(() => {
        if (users && (!usuarios || usuarios.length === 0)) {
            setUsuarios(users)
            if (users.includes("cualquiera")) {
                setCualquiera(true)
            } else {
                setCualquiera(false)
            }
        }

    }, [usuarios, users])
    return (
        <div className="text-center">
            <h1>Configuración</h1>
            <div>
                <h4>Administrar Usuarios</h4>
                {<div>

                    <div>
                        <input id="privado" onChange={changeCualq} type="checkbox" checked={cualquiera}></input>
                        Permitir cualquier usuario
                    </div>
                    {!cualquiera && <div>
                        {usuarios && usuarios.map((usuario, i) => {
                            return (
                                <div key={i} className="d-flex flex-row justify-content-center">
                                    <div className="fs-4 fw-bold">{usuario}</div>
                                    {deleteU !== i && <button className="btn btn-danger" onClick={(e) => {
                                        e.preventDefault()
                                        addDelete(i)
                                    }}><i className="bi bi-trash fs-5"></i></button>}
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
                            )
                        })}
                        <form onSubmit={registrarUsuarios}>
                            <div>
                                Agregar usuario(s)

                            </div>
                            <div>
                                <input id="users" onChange={handleChange} type="text" required></input>
                            </div>
                        </form>
                    </div>}


                    <button type="submit">Guardar</button>


                </div>}
            </div>
        </div>
    )
}
export default Config