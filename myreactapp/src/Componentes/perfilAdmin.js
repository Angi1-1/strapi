// El perfil de admin

import React, { useState } from "react";
import "./CSS/perfilUser.css";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const PerfilAdmin = () => {
  const [userData] = useState({
    userName: "UserName",
  });

  return (
    <>
      <Header />
      <div className="breadcrumb">
        <p>
          <Link to="/home" className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/perfilAdmin" className="link">
            Perfil del admin
          </Link>
        </p>
      </div>
      <div className="perfilUserParte1">
        <div className="izquierdaPerfilUser">
          <Link to="/perfilAdmin" className="perfilUserTexto1 link2">
            Mi Cuenta
          </Link>
          <Link to="/addnewArtesano" className="perfilUserTexto2 link2">
            Artesano
          </Link>
          <Link to="/" className="perfilUserTexto2 link2">
            Cerrar Sesión
          </Link>
        </div>

        <div className="derechaPerfilUser">
          <label className="perfilUserTitulo">Bienvenida Admin</label>
          <label className="perfilUserTexto3">Tus Datos</label>
          <div className="nombrePerfilUser">
            <label className="perfilUserTexto4">Nombre:</label>
            <label className="perfilUserTexto4">{userData.userName}</label>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilAdmin;
