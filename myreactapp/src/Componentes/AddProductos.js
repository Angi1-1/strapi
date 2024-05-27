import React, { useState } from "react";
import BackDrop from "./BackDrop";
import "./CSS/editProduct.css";

const AddProduct = ({ onCancel, onload }) => {
  // Manejar el estado de los inputs
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [tallas, setTallas] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !tipo || !precio || !stock || !subtitulo || !detalles || !tallas) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    await enviaApis();
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const enviaApis = async () => {
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      nombre,
      subtitulo,
      precio,
      idArtesano: localStorage.getItem("user_id"),
      nombreArtesano: localStorage.getItem("username"),
      detalles,
      tallas,
      stock,
      tipo,
    }));
    if (imagen) {
      formData.append('files.imagen', imagen);
    }

    try {
      const response = await fetch(`http://localhost:1337/api/productos/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Producto añadido exitosamente", data);
        onload();
        onCancel();
      } else {
        console.error("Error al añadir el producto", await response.text());
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <>
      <BackDrop>
        <div className="addNewUser">
          <p className="tituloEditProyecto">Añadir Producto</p>
          <form className="formularioEditrProyecto" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="name">
              <div className="Nombre">
                <label className="texto1EditProyecto">Nombre de Producto</label>
                <input
                  className="inputTextoEditProyecto"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="Nombre">
                <label className="texto1EditProyecto">Categoría</label>
                <select
                  className="elegirEditProyecto"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">Selecciona la categoría</option>
                  <option value="1">Joyería</option>
                  <option value="2">Hogar</option>
                  <option value="3">Comestico</option>
                </select>
              </div>
            </div>
            <div className="name">
              <div className="Nombre">
                <label className="texto1EditProyecto">Precio de Venta</label>
                <input
                  className="inputTextoEditProyecto"
                  type="text"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>
              <div className="Nombre">
                <label className="texto1EditProyecto">Stock</label>
                <input
                  className="inputTextoEditProyecto"
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
            <div className="descripciones">
              <label className="texto1EditProyecto">Subtítulos</label>
              <input
                className="textareaEditarProyecto"
                type="text"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
              />
            </div>
            <div className="descripciones">
              <label className="texto1EditProyecto">Descripciones</label>
              <textarea
                className="textareaEditarProyecto"
                rows="3"
                cols="50"
                placeholder="Describe sobre el producto"
                value={detalles}
                onChange={(e) => setDetalles(e.target.value)}
              ></textarea>
            </div>
            <div className="descripciones">
              <label className="texto1EditProyecto">Talla y Ajuste</label>
              <textarea
                className="textareaEditarProyecto"
                rows="3"
                cols="30"
                placeholder="Describe sobre el producto"
                value={tallas}
                onChange={(e) => setTallas(e.target.value)}
              ></textarea>
            </div>
            <div className="addImagenProyecto">
              <label className="texto1EditProyecto">Añadir Imagen</label>
              <input
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div className="divBtnEditProduct">
              <button className="btnSubmitEditProyecto" type="submit">
                Guardar
              </button>
              <button
                type="button"
                className="btnCancelarEditProyecto"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </BackDrop>
    </>
  );
};

export default AddProduct;
