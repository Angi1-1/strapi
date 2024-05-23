import BackDrop from "./BackDrop";
import React from "react";
import "./CSS/editProduct.css"
const EditarArtesano = ({artesano, messager}) => {
    console.log(artesano)
 return (
    <>
<BackDrop>
<div className="addNewUser">
     <p className="tituloEditProyecto">{messager}</p>
     <form className="formularioEditrProyecto">
        <div className="name">
            <div className="Nombre">
                <label className="texto1EditProyecto">Nombre de Empresa</label>
                <input className="inputTextoEditProyecto" type="text" placeholder={artesano.nombreApellido} />
            </div>
            <div className="Nombre">
                <label className="texto1EditProyecto">Email de Empresa</label>
                <input className="inputTextoEditProyecto" type="text"  placeholder={artesano.email} />
            </div>
        </div>
        <div className="name">
            <div className="Nombre">
                <label className="texto1EditProyecto">Telefono</label>
                <input className="inputTextoEditProyecto" type="text"  placeholder={artesano.telefono} />
            </div>
            <div className="Nombre">
                <label className="texto1EditProyecto">Contraseña</label>
                <input className="inputTextoEditProyecto" type="text" />
            </div>
        </div>
        <div className="descripciones">
                <label className="texto1EditProyecto">Descripciones</label>
                <textarea className="textareaEditarProyecto" rows="3" cols="50" placeholder={artesano.domicilio}></textarea>
        </div>
        <div className="addImagenProyecto">
                <label className="texto1EditProyecto">Añadir Imagen</label>
                <input type="file"  />Añadir 
        </div>
        <div className="divBtnEditProduct">
                      <button className="btnSubmitEditProyecto" type="submit">Guardar</button>
                      <button className="btnCancelarEditProyecto" >Cancelar</button>
                  </div>
     </form>
</div>

</BackDrop></>
);
}

export default EditarArtesano;
