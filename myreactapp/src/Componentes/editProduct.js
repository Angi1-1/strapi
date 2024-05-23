import BackDrop from "./BackDrop";
import React from "react";
import "./CSS/editProduct.css"
const EditProduct = (prop) => {
 return (
    <>
<BackDrop>
<div className="addNewUser">
     <p className="tituloEditProyecto">{prop.value}</p>
     <form className="formularioEditrProyecto">
        <div className="name">
            <div className="Nombre">
                <label className="texto1EditProyecto">Nombre de Producto</label>
                <input className="inputTextoEditProyecto" type="text" />
            </div>
            <div className="Nombre">
                <label className="texto1EditProyecto">Categoria</label>
                <select className="elegirEditProyecto">
                    <option value={0}>Seleciona el categoria</option>
                    <option value={1}>Joyeria</option>
                    <option value={2}>Hogar</option>
                    <option value={3}>Comestico</option>
                </select>
            </div>
        </div>
        <div className="name">
            <div className="Nombre">
                <label className="texto1EditProyecto">Precio de Venta</label>
                <input className="inputTextoEditProyecto" type="text" />
            </div>
            <div className="Nombre">
                <label className="texto1EditProyecto">Stock</label>
                <input className="inputTextoEditProyecto" type="text" />
            </div>
        </div>
        <div className="descripciones">
                <label className="texto1EditProyecto">Descripciones</label>
                <textarea className="textareaEditarProyecto" rows="5" cols="50" placeholder="Describe sobre el producto"></textarea>
        </div>
        <div className="descripciones">
                <label className="texto1EditProyecto">Talla y Adjuste</label>
                <textarea className="textareaEditarProyecto" rows="5" cols="50" placeholder="Describe sobre el producto"></textarea>
        </div>
        <div className="addImagenProyecto">
                <label className="texto1EditProyecto">Añadir Imagen</label>
                <button className="btnAddImg">Añadir</button> 
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

export default EditProduct;
