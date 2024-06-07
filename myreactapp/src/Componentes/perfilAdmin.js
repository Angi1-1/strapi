import React from "react";
import "./CSS/perfilUser.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const PerfilAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
          <Link to='/perfilAdmin' className="link">
            Perfil del admin
          </Link>
        </p>
      </div>
      <div className="perfilUserParte1" style={{ height: '60vh' }}>
        <div className="izquierdaPerfilUser">
          <Link to='/perfilAdmin' className="perfilUserTexto1 link2">
            Mi Cuenta
          </Link>
          <Link to='/addnewArtesano' className="perfilUserTexto2 link2">
            Artesano
          </Link>
          <label onClick={handleLogout} className="perfilUserTexto2 link2">
            Cerrar Sesión
          </label>
        </div>

        <div className="derechaPerfilUser">
          <label className="perfilUserTitulo">Bienvenida Admin</label>
          <label className="perfilUserTexto3">Tus Datos</label>
          <div className="nombrePerfilUser">
            <label className="perfilUserTexto4">Nombre:</label>
            <label className="perfilUserTexto4">{localStorage.getItem('username')}</label>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilAdmin;
