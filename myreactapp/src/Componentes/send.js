import React from "react";
import BackDrop from "./BackDrop";
import "./CSS/send.css";
import okay from "../Icon/okay.png";

function Send({ onConfirm, onCancel, pedido }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <>
      <div className="absolutePopup">
        <form className="popup-confirmation" onSubmit={handleSubmit}>
          <img className="deleteLogoCircle" src={okay} alt="Okay" />
          <p className="tituloSend">Pedido Para Enviar</p>
          <p className="textoSend">¿El pedido {pedido.fechaPedidos} fue enviado?</p>
          <div className="divBtnConfirmation">
            <button className="btnDeleteUser" type="submit">Enviado</button>
            <button className="btnCancelDelete" type="button" onClick={onCancel}>Volver</button>
          </div>
        </form>
      </div>
      <BackDrop />
    </>
  );
}

export default Send;
