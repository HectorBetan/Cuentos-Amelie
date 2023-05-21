import { useApp } from "../context/AppContext";
import Logo from "../assets/logo.png"
import Logo1 from "../assets/logo-horizontal.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";

const Cuento = () => {
    const { loading, cuentos, cuento, noCuento, resolveCuento } = useApp()
    const navigate = useNavigate()
    const [cuentoActual, setCuento] = useState(null)
    const [start, setStart] = useState(false)
    const descargarPDF = () => {
        const doc = new jsPDF();
        const titleWidth = doc.getTextDimensions("Título: " + cuentoActual.titulo).w;
        const authorWidth = doc.getTextDimensions("Autor: " + cuentoActual.autor).w;
        const pageWidth = doc.internal.pageSize.width;
        const titleX = (pageWidth - titleWidth) / 2;
        const authorX = (pageWidth - authorWidth) / 2;
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Título: " + cuentoActual.titulo, titleX-10, 20);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Autor: " + cuentoActual.autor, authorX-10, 30);
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(cuentoActual.cuento, 170);
  let y = 50;

  lines.forEach(line => {
    if (y + 10 > doc.internal.pageSize.height-10) {
      doc.addPage();
      y = 30;
    }
    doc.text(line, 20, y);
    y += 10;
  });
        let t = cuentoActual.titulo.toLowerCase().replaceAll(" ", "-")
        doc.save(t+".pdf");
    };

    useEffect(() => {
        if (!cuentoActual && cuentos && !cuento) {
            console.log("aqui")
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
    if (loading || !cuentos || !cuentoActual) {
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
                <div className="d-flex justify-content-center">
                    <h2>{cuentoActual.titulo}</h2>
                    <button onClick={(e) => { e.preventDefault(); noCuento(); if (start) { navigate(-1) } else { navigate("/cuentos") } }} className="btn btn-dark">Volver</button>
                </div>
                <h4>{cuentoActual.autor}</h4>
                <h4>{cuentoActual.user}</h4>
                <p>{cuentoActual.cuento}</p>
                <button onClick={descargarPDF} className="btn btn-primary">
                    Descargar en PDF
                </button>
            </div>
        )


    }
}
export default Cuento