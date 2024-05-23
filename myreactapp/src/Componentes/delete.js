import React from "react";
import BackDrop from "./BackDrop";
import "./CSS/delete.css";
import deleteImage from "../Icon/delete.png"




function Delete({ onDeleteConfirm, onCancel }) {
    
    const handleSubmit = () => {
    console.log("Formulario enviado")
    }
    
    return (
        <>
            <div className="absolutePopupDelete">
                <form className="popup-confirmationDelete" onSubmit={handleSubmit}>
                    <img className="deleteLogoCircleDelete" src={deleteImage}></img>
                  <p className="tituloDelete">Cancelar Pedido</p>
                  <p className="textoDelete">¿Quieres cancelar el pedido?</p>
                  <div className="divBtnConfirmationDelete">
                      <button className="btnCancelDeleteDelete" type="submit">Volver</button>
                      <button className="btnDeleteUserDelete" onClick={onCancel}>Cancelar</button>
                  </div>
                </form>
            </div>
            <BackDrop/>
        </>
    );
  }
export default Delete  