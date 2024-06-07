import React, { useState,useEffect } from "react";
import "./CSS/perdidosUser.css"; // Adjust the path as necessary
import "./CSS/perfilUser.css"; // Adjust the path as necessary
import { Link,useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
const PerdidosUser = () => {
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
      const response = await fetch(`http://localhost:1337/api/pedidos/?filters[idUsuario]=${localStorage.getItem('user_id')}`, {
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

 
  const toggleDetails = (id) => {
    setDetailsVisible((prevDetailsVisible) => ({
      ...prevDetailsVisible,
      [id]: !prevDetailsVisible[id]
    }));
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
          <Link to='/perdidosUser' className="link">
            Mis Pedidos
          </Link>{" "}
        </p>
      </div>
      <div className="perfilPedidosParte1">
        <div className="izquierdaPerfilUser">
          <Link to='/perfilUser' className="perfilUserTexto2 link2">
            Mi Cuenta
          </Link>
          <Link to='/perdidosUser' className="perfilUserTexto1 link2">
            Pedidos
          </Link>
          <Link to='/miWishlist' className="perfilUserTexto2 link2">
            Mi Wishlist
          </Link>
          <button onClick={handleLogout} className="perfilUserTexto2 link2" style={{marginLeft:'-5px'}}>
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
                  <button className="card-item" onClick={() => toggleDetails(pedido.id)}>
                    <span className="card-label ">Detalles del Producto</span> {detailsVisible[pedido.id] ? "▲" : "▼"}
                  </button>
                  <div className={`product-details general-details ${detailsVisible[pedido.id] ? "active" : ""}`}>
                    <p className="GideonRomanGrafiaJoyeria" style={{fontSize:'16px'}}>{pedido.attributes.ProductosComprados}</p>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Estado:</span>
                    <span className={pedido.attributes.estado ? "true" : "false"}>
                      {pedido.attributes.estado ? "Enviado" : "Proceso"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div> <button className="help-button" style={{width:'none'}}>
            <Link className="link" style={{color:'white'}} to={'/contacto'}>Ayuda</Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerdidosUser;
