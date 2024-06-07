import React, { useState } from "react";
import BackDrop from "./BackDrop";
import "./CSS/editProduct.css";

const EditProduct = ({ product, onCancel, onload }) => {
  // Manejar el estado de los inputs
  const [nombre, setNombre] = useState(product.attributes.nombre);
  const [tipo, setTipo] = useState(product.attributes.tipo);
  const [precio, setPrecio] = useState(product.attributes.precio);
  const [stock, setStock] = useState(product.attributes.stock);
  const [subtitulo, setSubtitulo] = useState(product.attributes.subtitulo);
  const [detalles, setDetalles] = useState(product.attributes.detalles);
  const [tallas, setTallas] = useState(product.attributes.tallas);
  const [subir, setsubir] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !tipo || !precio || !stock || !subtitulo || !detalles || !tallas ) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    if (isNaN(precio) || isNaN(stock)) {
      setError('El precio y el stock deben ser números.');
      return;
    }
    if (Number(precio) <= 0 || Number(stock) <= 0) {
      setError('El precio y el stock deben ser mayores que 0.');
      return;
    }
    await enviaApis();
  };

  const handleFileChange = (e) => {
    //subir imagen y convertir en base64
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setsubir(reader.result)
        
      }
      reader.readAsDataURL(file)
    }
  };

  const enviaApis = async () => {

 const body = {
      data: {
        nombre,
        subtitulo,
        precio,
        detalles,
        tallas,
        tipo,
        stock,
      },
    };

    // Solo agregar 'subir' si tiene un valor
    if (subir) {
      body.data.subir = subir;
    }
    try {
      const response = await fetch(`http://localhost:1337/api/productos/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Actualización exitosa", data);
        onload();
        onCancel();
      } else {
        console.error("Error al actualizar", await response.text());
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <>
      <BackDrop>
        <div className="addNewUser">
          <p className="tituloEditProyecto">Editar Producto</p>
          <form className="formularioEditrProyecto" onSubmit={handleSubmit}>
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
                  <option value={0}>Selecciona la categoría</option>
                  <option value={1}>Joyería</option>
                  <option value={3}>Hogar</option>
                  <option value={2}>Comestico</option>
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
              <input type="file" onChange={handleFileChange} />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="divBtnEditProduct">
              <button className="btnSubmitEditProyecto" type="submit">
                Guardar
              </button>
              <button className="btnCancelarEditProyecto" onClick={onCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </BackDrop>
    </>
  );
};

export default EditProduct;

