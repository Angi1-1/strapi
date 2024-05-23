import React, { useState } from "react";
import "./CSS/perdidosUser.css"; // Adjust the path as necessary
import "./CSS/perfilUser.css"; // Adjust the path as necessary
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
const PerdidosUser = () => {
  const [pedidosData] = useState([
    {
      numPedido: "1",
      FechaCompra: "18/04/2024",
      gasto: "10",
      Tick: "PDF",
      Estado: "Enviado",
    },
    {
      numPedido: "2",
      FechaCompra: "18/04/2024",
      gasto: "99",
      Tick: "PDF",
      Estado: "Cancelada",
    },
  ]);
  return (
    <>
      <Header />
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/perdidosUser" className="link">
            Pedidos del usuario
          </Link>{" "}
        </p>
      </div>
      <div className="perfilUserParte1">
        <div className="izquierdaPerfilUser">
          <Link to="/perfilUser" className="perfilUserTexto2 link2">
            Mi Cuenta
          </Link>
          <Link to="/perdidosUser" className="perfilUserTexto1 link2">
            Pedidos
          </Link>
          <Link to="/miWishlist" className="perfilUserTexto2 link2">
            Mi Wishlist
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
                    <span>{pedido.Estado}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="help-button">AYUDA</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerdidosUser;
