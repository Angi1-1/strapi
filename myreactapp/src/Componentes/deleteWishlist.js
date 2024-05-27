import React from "react";
import BackDrop from "./BackDrop";
import "./CSS/delete.css";
import deleteImage from "../Icon/delete.png";

function Delete({ onDeleteConfirm, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteConfirm();
  };

  return (
    <>
      <div className="absolutePopupDelete">
        <form className="popup-confirmationDelete" onSubmit={handleSubmit}>
          <img className="deleteLogoCircleDelete" src={deleteImage} alt="Eliminar" />
          <p className="tituloDelete">Quitar este Producto</p>
          <p className="textoDelete">¿Quieres quitar este producto de tu Wishlist?</p>
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
              Quitar
            </button>
          </div>
        </form>
      </div>
      <BackDrop />
    </>
  );
}

export default Delete;
