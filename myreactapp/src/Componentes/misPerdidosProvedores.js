import React, { useState } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../Icon/delete.svg";
import enviar from "../Icon/enviar.svg";
import Header from "./header";
import Footer from "./footer";
import EditarProducto from "./editProduct";
import Delete from "./delete";
import AddProducto from "./editProduct";
import imagenCollar from "../Icon/collarPerla.png";
import imagenCollar2 from "../Icon/collarPerlar2.png";

const PerdidosProvedores = () => {
  const [showEnviar, setShowEnviar] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddNewArtesano, setShowAddNewArtesano] = useState(false);
  const [pedidosData] = useState([
    {
      imagen: imagenCollar,
      serie: "105",
      stock: "10",
      precio: "35",
    },
    {
      imagen: imagenCollar2,
      serie: "102",
      stock: "10",
      precio: "36",
    },
  ]);

  const handleSend = () => {
    setShowEnviar(true);
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleChange = () => {
    setShowAddNewArtesano(true);
  };

  return (
    <>
      <Header />
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/perfilArtesanos" className="link">
            Perfil del artesano
          </Link>{" "}
          /{" "}
          <Link to="/perdidosProvedores" className="link">
            Pedidos de los proveedores
          </Link>{" "}
          /{" "}
          <Link to="/misPerdidosProvedores" className="link">
            Mis productos
          </Link>
        </p>
      </div>
      <div className="perfilUserParte1">
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
            {pedidosData.map((pedido, index) => (
              <div className="product-item" key={index}>
                <img src={pedido.imagen} alt="Producto" />
                <div className="product-item-details">
                  <label>Serie de Producto: {pedido.serie}</label>
                  <label>Stock: {pedido.stock} €</label>
                  <label>Precio de Venta: {pedido.precio}</label>
                </div>
                <div className="product-item-actions">
                  <button
                    className="ButtonPerdidosProvedores"
                    onClick={handleSend}
                  >
                    <img className="img1" src={enviar} alt="Enviar" />
                  </button>
                  <button
                    className="ButtonPerdidosProvedores"
                    onClick={handleDelete}
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
      {showEnviar && <EditarProducto onCancel={() => setShowEnviar(false)} />}
      {showDelete && <Delete onCancel={() => setShowDelete(false)} />}
      {showAddNewArtesano && (
        <AddProducto onCancel={() => setShowAddNewArtesano(false)} />
      )}
      <Footer />
    </>
  );
};

export default PerdidosProvedores;
