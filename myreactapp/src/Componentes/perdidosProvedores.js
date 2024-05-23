import React, { useState } from "react";
import "./CSS/perdidosUser.css"; // Adjust the path as necessary
import "./CSS/perfilUser.css"; // Adjust the path as necessary
import "./CSS/perdidosProvedores.css";
import deleteIcon from "../Icon/delete.svg";
import { Link } from "react-router-dom";
import enviar from "../Icon/enviar.svg";
import Send from "./send";
import Delete from "./delete";
import Header from "./header";
import Footer from "./footer";
const PerdidosProvedores = () => {
  const [showEnviar, setShowEnviar] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pedidosData] = useState([
    {
      numPedido: "1",
      FechaCompra: "18/04/2024",
      gasto: "10",
      Tick: "PDF",
    },
    {
      numPedido: "2",
      FechaCompra: "18/04/2024",
      gasto: "99",
      Tick: "PDF",
    },
    
  ]);

  const handleSend = () => {
    setShowEnviar(true);
  };

  const handleDelete = () => {
    setShowDelete(true);
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
          </Link>
        </p>
      </div>
      <div className="perfilUserParte1">
        <div className="izquierdaPerfilUser">
          <Link to="/perfilArtesanos" className="perfilUserTexto2 link2">
            Mi Cuenta
          </Link>
          <Link to="/perdidosProvedores" className="perfilUserTexto1 link2">
            Pedidos
          </Link>
          <Link to="/misPerdidosProvedores" className="perfilUserTexto2 link2">
            Mi Producto
          </Link>
          <Link to="/" className="perfilUserTexto2 link2">
            Cerrar Sesión
          </Link>
        </div>

        <div className="derechaPerdidosUser">
          <label className="perfilUserTitulo">Mis Pedidos</label>
          <div className="table-containerPerdidosUser">
          <div className="containerPerdidosUser">
              {pedidosData.map((pedido, index) => (
                <div className="cardPerdidosUser" key={index}>
                  <div className="card-item">
                    <span className="card-label">Número de Pedido:</span>
                    <span>{pedido.numPedido}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Fecha de Compra:</span>
                    <span>{pedido.FechaCompra}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Gastos:</span>
                    <span>{pedido.gasto} €</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Tick de Compra:</span>
                    <span>{pedido.Tick}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Estado:</span>
                    <button
                        className="ButtonPerdidosProvedores"
                        onClick={handleSend}
                      >
                        <img className="img1" src={enviar}></img>
                      </button>
                      <button
                        className="ButtonPerdidosProvedores"
                        onClick={handleDelete}
                      >
                        <img className="img2" src={deleteIcon}></img>
                      </button>
                  </div>
                </div>
              ))}
            </div>
            
                      

            <button className="help-button">AYUDA</button>
          </div>
        </div>
      </div>
      {showEnviar && <Send onCancel={() => setShowEnviar(false)} />}
      {showDelete && <Delete onCancel={() => setShowDelete(false)} />}
      <Footer />
    </>
  );
};

export default PerdidosProvedores;
