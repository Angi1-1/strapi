import "./CSS/misperdidosProvedores.css";
import "./CSS/perdidosUser.css"; // Adjust the path as necessary
import "./CSS/perfilUser.css"; // Adjust the path as necessary

import React, { useState, useEffect } from "react";
import deleteIcon from "../Icon/delete.svg";
import enviar from "../Icon/enviar.svg";
import EditarArtesano from "./editArtesano";
import AddArtesano from "./addArtesano";
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
  const [artesanos, setArtesanos] = useState([]);
  const [selectedArtesano, setSelectedArtesano] = useState(null);

  // Buscar Artesanos
  useEffect(() => {
    artesanoList();
  }, []);

  const artesanoList = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/usuariomanos?filters[acesso]=2`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de artesanos", data);
        setArtesanos(data.data);
      } else {
        console.log("Error al obtener los datos de artesanos");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const handleSend = (artesano) => {
    setSelectedArtesano(artesano.attributes);
    setShowEnviar(true);
  };

  const handleDelete = (artesano) => {
    setSelectedArtesano(artesano.attributes);
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
              {artesanos.map((artesano, index) => (
                <div className="cardPerdidosUser" key={index}>
                  <div className="card-item">
                    <span className="card-label">Id de Artesanos:</span>
                    <span>{artesano.id}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Nombre:</span>
                    <span>{artesano.attributes.nombreApellido}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Telefono:</span>
                    <span>{artesano.attributes.telefono}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Email:</span>
                    <span>{artesano.attributes.email}</span>
                  </div>
                  <div className="card-item">
                    <span className="card-label">Estado:</span>
                    <div className="botonesAddNewArtesano">
                      <button
                        className="ButtonPerdidosProvedores"
                        onClick={() => handleSend(artesano)}
                      >
                        <img className="img1" src={enviar} alt="Enviar"/>
                      </button>
                      <button
                        className="ButtonPerdidosProvedores"
                        onClick={() => handleDelete(artesano)}
                      >
                        <img className="img2" src={deleteIcon} alt="Eliminar"/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="help-button" onClick={handleChange}>
            Añadir Artesano
          </button>
        </div>
      </div>
      {showEnviar && selectedArtesano && (
        <EditarArtesano
          onCancel={() => setShowEnviar(false)}
          artesano={selectedArtesano}
          value={editar}
        />
      )}
      {showDelete && selectedArtesano && (
        <Delete
          onCancel={() => setShowDelete(false)}
          artesano={selectedArtesano}
          messager={"Artesano"}
        />
      )}
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
