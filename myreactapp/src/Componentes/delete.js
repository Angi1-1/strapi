import React from "react";
import BackDrop from "./BackDrop";
import "./CSS/delete.css";
import deleteImage from "../Icon/delete.png";

function Delete({ onDeleteConfirm, onCancel, messager }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteConfirm();
  };

  return (
    <>
      <div className="absolutePopupDelete">
        <form className="popup-confirmationDelete" onSubmit={handleSubmit}>
          <img className="deleteLogoCircleDelete" src={deleteImage} alt="Eliminar" />
          <p className="tituloDelete">Cancelar {messager}</p>
          <p className="textoDelete">¿Quieres cancelar el {messager}?</p>
          <div className="divBtnConfirmationDelete">
            <button
              className="btnCancelDeleteDelete"
              type="button"
              onClick={onCancel}
            >
              Volver
            </button>
            <button
              className="btnDeleteUserDelete"
              type="submit"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <BackDrop />
    </>
  );
}

export default Delete;

