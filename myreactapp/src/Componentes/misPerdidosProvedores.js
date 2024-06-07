import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../Icon/delete.svg";
import enviar from "./img/pencilPago.svg";
import Header from "./header";
import Footer from "./footer";
import EditarProducto from "./editProduct";
import Delete from "./deleteProducto";
import AddProducto from "./AddProductos";

const PerdidosProvedores = () => {
  const [showEnviar, setShowEnviar] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddNewArtesano, setShowAddNewArtesano] = useState(false);
  const [listMiProducto, setMiProducto] = useState([]);
  const [product, setProducto] = useState({});
  const [productId, setProductId] = useState('');

  useEffect(() => {
    productListArtesano();
  }, []);

  const handleOnload = () => {
    productListArtesano();
  };

  const productListArtesano = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/productos/?filters[idArtesano]=${localStorage.getItem('user_id')}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de producto asociados", data);
        setMiProducto(data.data);
      } else {
        console.log("Error al obtener los datos de artesanos");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const handleSend = (producto) => {
    setShowEnviar(true);
    setProducto(producto);
  };

  const handleDelete = (producto) => {
    setShowDelete(true);
    setProductId(producto.id)
  };

  const handleChange = () => {
    setShowAddNewArtesano(true);
  };

  const deleteProducto = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/productos/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log("Artesano eliminado");
        handleOnload();
        setShowDelete(false);
      } else {
        console.log("Error al eliminar el artesano");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  // Función para obtener la ruta completa de la imagen basada en el tipo
  const obtenerRutaCompleta = (ruta, tipo) => {
    switch (tipo) {
      case 1:
        return `/joyeria/${ruta}`;
      case 2:
        return `/comestico/${ruta}`;
      case 3:
        return `/hogar/${ruta}`;
      default:
        return ruta; // Por si el tipo no es reconocido
    }
  };

  return (
    <>
      <Header />
      <div className="breadcrumb">
        <p>
          <Link to="/" className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/misPerdidosProvedores" className="link">
            Mis productos
          </Link>
        </p>
      </div>
      <div className="perfilArtesanoProductoParte1">
        <div className="izquierdaPerfilUser">
          <Link to="/perfilArtesanos" className="perfilUserTexto2 link2">
            Mi Cuenta
          </Link>
          <Link to="/perdidosProvedores" className="perfilUserTexto2 link2">
            Pedidos
          </Link>
          <Link to="/misPerdidosProvedores" className="perfilUserTexto1 link2">
            Mi Producto
          </Link>
          <Link to="/" className="perfilUserTexto2 link2">
            Cerrar Sesión
          </Link>
        </div>

        <div className="derechaPerdidosUser">
          <label className="perfilUserTitulo">Mis Productos</label>
          <div className="product-container">
            {listMiProducto.map((producto, index) => (
              <div className="product-itemProducto" key={index}>
                <img src={producto.attributes.subir ? producto.attributes.subir : obtenerRutaCompleta(producto.attributes.ruta, producto.attributes.tipo)} style={{width:'250px', height:'200px'}} alt="Producto" />
                <div className="product-item-details">
                  <label>{producto.attributes.nombre}</label>
                  <label style={{ color: producto.attributes.stock === 0 ? 'red' : 'black' }}>
                      Stock: {producto.attributes.stock}
                  </label>
                  <label>{producto.attributes.precio} €</label>
                </div>
                <div className="product-item-actions">
                  <button
                    className="ButtonPerdidosProvedores"
                    onClick={() => handleSend(producto)}
                  >
                    <img className="img1" src={enviar} alt="Enviar" />
                  </button>
                  <button
                    className="ButtonPerdidosProvedores"
                    onClick={() => handleDelete(producto)}
                  >
                    <img className="img2" src={deleteIcon} alt="Eliminar" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="help-button" onClick={handleChange}>
            Añadir Producto
          </button>
        </div>
      </div>
      <Footer />
      {showEnviar && (
        <EditarProducto
          onCancel={() => setShowEnviar(false)}
          product={product}
          onload={handleOnload}
        />
      )}
      {showDelete && <Delete onCancel={() => setShowDelete(false)} messager={"Producto"}  onDeleteConfirm={deleteProducto}/>}
      {showAddNewArtesano && (
        <AddProducto onCancel={() => setShowAddNewArtesano(false)} onload={handleOnload}/>
      )}
    </>
  );
};

export default PerdidosProvedores;
