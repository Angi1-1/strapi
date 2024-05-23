import "./CSS/misperdidosProvedores.css";
import "./CSS/perdidosUser.css"; // Adjust the path as necessary
import "./CSS/perfilUser.css"; // Adjust the path as necessary

import React, { useState } from "react";
import deleteIcon from "../Icon/delete.svg";
import enviar from "../Icon/enviar.svg";
import EditarArtesano from "./editProduct";
import AddArtesano from "./editProduct";
import { Link } from "react-router-dom";
import Delete from "./delete";
import Header from "./header";
import Footer from "./footer";
const AddNewArtesano = () => {
  const editar = useState("Editar Artesano");
  const add = useState("Añadir Artesano");
  const [showEnviar, setShowEnviar] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddNewArtesano, setShowAddNewArtesano] = useState(false);
  const [pedidosData] = useState([
    {
      id_Artesano: "1",
      nombre: "Antonio",
      telefono: "600000000",
      email: "antonio@gmail.com",
    },
    {
      id_Artesano: "2",
      nombre: "Ana",
      telefono: "600000000",
      email: "ana@gmail.com",
    },
    {
      id_Artesano: "2",
      nombre: "Ana",
      telefono: "600000000",
      email: "ana@gmail.com",
    }
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
        </p>
      </div>
      <div className="perfilUserParte1">
        <div className="izquierdaPerfilUser">
          <Link to="/perfilAdmin" className="perfilUserTexto2 link2">
            Mi Cuenta
          </Link>
          <Link to="/addnewArtesano" className="perfilUserTexto1 link2">
            Artesano
          </Link>
          <Link to="/" className="perfilUserTexto2 link2">
            Cerrar Sesión
          </Link>
        </div>
              
        <div className="derechaPerdidosUser">
          <label className="perfilUserTitulo">Artesanos</label>
          <div className="table-containerPerdidosUser">
          <div className="containerPerdidosUser">
              {pedidosData.map((pedido, index) => (
                <div className="cardPerdidosUser" key={index}>
                  <div className="card-item">
                    <span className="card-label">Id de Artesanos:</span>
                    <span>{pedido.id_Artesano}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Nombre:</span>
                    <span>{pedido.nombre}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Telefono:</span>
                    <span>{pedido.telefono} </span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Email:</span>
                    <span>{pedido.email}</span>
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
            <button className="help-button" onClick={handleChange}>
              Añadir Artesano
            </button>
          </div>
        </div>
      </div>
      {showEnviar && (
        <EditarArtesano onCancel={() => setShowEnviar(false)} value={editar} />
      )}
      {showDelete && <Delete onCancel={() => setShowDelete(false)} />}
      {showAddNewArtesano && (
        <AddArtesano
          onCancel={() => setShowAddNewArtesano(false)}
          value={add}
        />
      )}
      <Footer />
    </>
  );
};

export default AddNewArtesano;
