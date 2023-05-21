import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useState} from "react";
const EnviarMsg = () => {
    const navigate = useNavigate()
    const { user, loading, enviar } = useApp()
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
    const handleChange = ({ target: { value, name } }) => setMsg({ ...msg, [name]: value });
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
    }
    return (
        <div className="text-center">
            <h2>Enviar Mensaje</h2>
            <div>
                <form className="publicar-cuento">
                    <div>Asunto</div>
                    <input type="text" id="asunto" name="asunto" onChange={handleChange}></input>
                    <div>Mensaje</div>
                    <textarea type="text" id="msg" name="msg"  onChange={handleChange}></textarea>
                    <div>
                        <input id="privado" onChange={changePrivado} type="checkbox"></input>
                        Deseo que mi mensaje sea privado
                    </div>
                    <div>
                    <button onClick={enviarMsg} className="btn btn-dark">Enviar</button>
                    <button onClick={(e)=>{e.preventDefault(); navigate("/")}}  className="btn btn-dark">Volver</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default EnviarMsg;