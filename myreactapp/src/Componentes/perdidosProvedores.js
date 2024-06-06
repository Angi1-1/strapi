import React, { useState, useEffect } from "react";
import "./CSS/perdidosUser.css";
import "./CSS/perfilUser.css";
import "./CSS/perdidosProvedores.css";
import deleteIcon from "../Icon/delete.svg";
import { Link , useNavigate} from "react-router-dom";
import enviar from "../Icon/enviar.svg";
import Send from "./send";
import Delete from "./delete";
import Header from "./header";
import Footer from "./footer";

const PerdidosProvedores = () => {
  const [showEnviar, setShowEnviar] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState({});
  const [pedido, setPedido] = useState(null);
  const [pedidoId, setPedidoId] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    pedidoList();
  }, []);

  const pedidoList = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/pedidos/?filters[idArtesano]=${localStorage.getItem('user_id')}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de pedidos", data);
        setPedidos(data.data);
      } else {
        console.log("Error al obtener los datos de pedidos");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const handleSend = (pedido) => {
    setShowEnviar(true);
    setPedido(pedido.attributes);
    setPedidoId(pedido.id);
  };

  const handleDelete = (pedido) => {
    setShowDelete(true);
    setPedido(pedido.attributes);
    setPedidoId(pedido.id);
  };

  const toggleDetails = (id) => {
    setDetailsVisible((prevDetailsVisible) => ({
      ...prevDetailsVisible,
      [id]: !prevDetailsVisible[id]
    }));
  };

  const confirmPedido = async () => {
    const fecha = new Date()
    const body = JSON.stringify({
      data: {
        estado: true,
        fecha_envi:fecha
      }
    });

    try {
      const response = await fetch(`http://localhost:1337/api/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });

      if (response.ok) {
        console.log("Pedido Confirmado");
        handleOnload();
        setShowEnviar(false);
      } else {
        console.log("Error al confirmar el pedido");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const cancelPedidos = async () => {
    const body = JSON.stringify({
      data: {
        estado: false
      }
    });

    try {
      const response = await fetch(`http://localhost:1337/api/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });

      if (response.ok) {
        console.log("Pedido Cancelado");
        handleOnload();
        setShowDelete(false);
      } else {
        console.log("Error al cancelar el pedido");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const handleOnload = () => {
    pedidoList();
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
          <Link to="/perdidosProvedores/" className="link">
            Mis Pedidos
          </Link>
        </p>
      </div>
      <div className="perfilPedidosParte1">
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
          <button
            onClick={handleLogout}
            className="perfilUserTexto2 link2"
            style={{ marginLeft: "-5px" }}
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="derechaPerdidosUser">
          <label className="perfilUserTitulo">Mis Pedidos</label>
          <div className="table-containerPerdidosUser">
            <div className="containerPerdidosUser">
              {pedidos.map((pedido, index) => (
                <div className="cardPerdidosUser" key={index}>
                  <div className="card-item">
                    <span className="card-label">Número de Pedido:</span>
                    <span>{pedido.id}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Fecha de Compra:</span>
                    <span>{pedido.attributes.fechaPedidos}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Gastos:</span>
                    <span>{pedido.attributes.gasto} €</span>
                  </div>
                  <button
                    className="card-item"
                    onClick={() => toggleDetails(pedido.id)}
                  >
                    <span className="card-label ">Detalles del Producto</span>{" "}
                    {detailsVisible[pedido.id] ? "▲" : "▼"}
                  </button>
                  <div
                    className={`product-details general-details ${
                      detailsVisible[pedido.id] ? "active" : ""
                    }`}
                  >
                    <p
                      className="GideonRomanGrafiaJoyeria"
                      style={{ fontSize: "16px" }}
                    >
                      {pedido.attributes.ProductosComprados}
                    </p>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Estado:</span>
                    <span
                      className={pedido.attributes.estado ? "true" : "false"}
                    >
                      {pedido.attributes.estado ? pedido.attributes.fecha_envi : "Cancelado"}
                    </span>
                  </div>

                  <div className="botonesPedidosArtesano">
                    {pedido.attributes.estado ? (
                      <button
                        className="ButtonPerdidosProvedores"
                        onClick={() => handleDelete(pedido)}
                      >
                        <img className="img2" src={deleteIcon} alt="Eliminar" />
                      </button>
                    ) : (
                      <>
                        <button
                          className="ButtonPerdidosProvedores"
                          onClick={() => handleSend(pedido)}
                        >
                          <img className="img1" src={enviar} alt="Enviar" />
                        </button>
                        <button
                          className="ButtonPerdidosProvedores"
                          onClick={() => handleDelete(pedido)}
                        >
                          <img
                            className="img2"
                            src={deleteIcon}
                            alt="Eliminar"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="help-button" style={{ width: "none" }}>
            <Link className="link" style={{ color: "white" }} to={"/contacto"}>
              Ayuda
            </Link>
          </button>
        </div>
      </div>
      {showEnviar && (
        <Send
          onCancel={() => setShowEnviar(false)}
          pedido={pedido}
          onConfirm={confirmPedido}
        />
      )}
      {showDelete && (
        <Delete
          onCancel={() => setShowDelete(false)}
          pedido={pedido}
          onDeleteConfirm={cancelPedidos}
          messager={"Pedido"}
        />
      )}
      <Footer />
    </>
  );
};

export default PerdidosProvedores;
