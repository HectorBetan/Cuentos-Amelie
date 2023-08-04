import { useApp } from "../context/AppContext";

import { useState, useEffect } from "react";
const Cuento = () => {
    const {  cuentos, cuento, resolveCuento } = useApp()
    const [cuentoActual, setCuento] = useState(null)
    const [start, setStart] = useState(false)
    useEffect(() => {
        if (!cuentoActual && cuentos && !cuento) {

            let num = Math.floor(Math.random() * cuentos.length)
            let c = cuentos[num]
            resolveCuento(c)
            setCuento(c)
        }
        if (!cuentoActual && cuento) {
            setCuento(cuento)
        }
        let loc
        try {
            loc = sessionStorage.getItem("location")
        } catch (error) {
            console.log(error)
        }
        if (loc && !start) {
            setStart(true)
            sessionStorage.removeItem("location")
        }
    }, [cuentos, cuento, resolveCuento, cuentoActual, start])
    if(cuento && cuentoActual){
        return (
            <div className="d-flex justify-content-center">
                <div className="caja-cuento">
                    <div className="text-center">
                        <h2>{cuentoActual.titulo}</h2>
                        <h4>Autor: {cuentoActual.autor}</h4>
                        <h6 className="mb-4">Publicado por {cuentoActual.user}</h6>
                    </div>
                    {cuentoActual.cuento.split("\n\n").map((c, i) => {
                        if (c.length !== 0) {
                            return (
                                <p key={i}>{c}{!c.includes("\n")&&<br />}</p>
                            )
                        }
                        return false
                    })}
                </div>
            </div>
        )
    } else{
        return (<div className="m-5 bg-white"></div>)
    }
        
    
}
export default Cuento