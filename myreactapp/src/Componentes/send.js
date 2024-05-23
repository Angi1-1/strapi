import React from "react";
import BackDrop from "./BackDrop";
import "./CSS/send.css"
import okay from "../Icon/okay.png"




function Send({ onDeleteConfirm, onCancel }) {
    
    const handleSubmit = () => {
    console.log("Formulario enviado")
    }
    
    return (
        <>
            <div className="absolutePopup">
                <form className="popup-confirmation" onSubmit={handleSubmit}>
                    <img className="deleteLogoCircle" src={okay}></img>
                  <p className="tituloSend">Perdido Para Enviar</p>
                  <p className="textoSend">¿El pedido fue enviado ?</p>
                  <div className="divBtnConfirmation">
                      <button className="btnDeleteUser" onClick={onDeleteConfirm}>Enviado</button>
                      <button className="btnCancelDelete" type="submit">Volver</button>
                      
                  </div>
                </form>
            </div>
            <BackDrop/>
        </>
    );
  }
export default Send  