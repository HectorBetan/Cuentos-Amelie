import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
const Publicar = () => {
    const navigate = useNavigate()
    const { user, loading, publicar } = useApp()
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
            document.getElementById("titulo").value = ""
            document.getElementById("autor").value = ""
            document.getElementById("cuento").value = ""
        })

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
    }
    return (
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
                    <button onClick={publicarCuento} className="btn btn-dark">Publicar</button>
                    <button onClick={(e)=>{e.preventDefault(); navigate("/")}}  className="btn btn-dark">Volver</button>
                    </div>

                </form>

            </div>
        </div>
    )
}
export default Publicar;