import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./CSS/perfilUser.css";
import Header from "./header";
import Footer from "./footer";

const PerfilArtesanos = () => {
  const [isTrue, setIsTrue] = useState(true);
  const [EmpresaName]= useState(localStorage.getItem('username') || '');
  const [idempresa] = useState(localStorage.getItem('acesso') || '');
  const [userData, setUserData] = useState({});
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const artesanoData = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/usuariomanos/${idempresa}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de artesanos", data.data.attributes);
        setUserData(data.data.attributes);
        localStorage.setItem('username',data.data.attributes.nombreApellido)
      } else {
        console.log("Error al obtener los datos de artesanos");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  useEffect(() => {
    artesanoData();
   
  }, []);

  const changeOnClick = () => {
    setIsTrue(!isTrue); // Toggle the state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Datos guardados:", {
      userName: userData.userName,
      email: userData.email,
      telefono: userData.telefono,
      domicilio: userData.domicilio,
    });
    setIsTrue(true);
  };

  const handleChangePassword = () => {
    console.log("Cambiar contraseña:", {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    });
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
          <Link to="/perfilArtesanos" className="perfilUserTexto1 link2">
            Mi Cuenta
          </Link>
          <Link to="/perdidosProvedores" className="perfilUserTexto2 link2">
            Pedidos
          </Link>
          <Link to="/misPerdidosProvedores" className="perfilUserTexto2 link2">
            Mi Producto
          </Link>
          <Link to="/" className="perfilUserTexto2 link2">
            Cerrar Sesión
          </Link>
        </div>

        {isTrue ? (
          <div className="derechaPerfilUser">
            <label className="perfilUserTitulo">
              Bienvenida {userData.userName}
            </label>
            <label className="perfilUserTexto3">Tus Datos</label>
            <div className="nombrePerfilUser">
              <label className="perfilUserTexto4">Nombre:</label>
              <label className="perfilUserTexto4">{EmpresaName}</label>
            </div>
            <div className="nombrePerfilUser">
              <label className="perfilUserTexto4">Correo electrónico:</label>
              <label className="perfilUserTexto4">{userData.email}</label>
            </div>
            <div className="nombrePerfilUser">
              <label className="perfilUserTexto4">Número de teléfono:</label>
              <label className="perfilUserTexto4">{userData.telefono}</label>
            </div>
            <div className="nombrePerfilUser">
              <label className="perfilUserTexto4">Domicilio:</label>
              <label className="perfilUserTexto4">{userData.domicilio}</label>
            </div>
            <button className="submitPerfilUsuario" onClick={changeOnClick}>
              Modificar
            </button>
          </div>
        ) : (
          <div className="cambioPerfilUser">
            <div className="derechaPerfilUser">
              <label className="perfilUserTitulo">Bienvenida {EmpresaName}</label>
              <label className="perfilUserTexto3">Tus Datos</label>
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Nombre:</label>
                <input
                  className="perfilUserInput"
                  type="text"
                  name="userName"
                  value={EmpresaName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Correo electrónico:</label>
                <input
                  className="perfilUserInput"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Número de teléfono:</label>
                <input
                  className="perfilUserInput"
                  type="tel"
                  name="telefono"
                  value={userData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Domicilio:</label>
                <input
                  className="perfilUserInput"
                  type="text"
                  name="domicilio"
                  value={userData.domicilio}
                  onChange={handleInputChange}
                />
              </div>
              <button className="submitPerfilUsuario" onClick={handleSave}>
                Guardar
              </button>
              <button className="submitPerfilUsuario" onClick={changeOnClick}>
                Cancelar
              </button>
            </div>
            <div className="derechaPerfilUser2">
              <label className="perfilUserTexto3">
                Configurar Tu Contraseña
              </label>
              <p className="texto5PerfilUser">
                Aquí puedes actualizar tu contraseña en cualquier momento. Te
                recomendamos hacerlo con regularidad para mantener la seguridad
                de tu cuenta.
              </p>
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Contraseña Antigua:</label>
                <input
                  className="perfilUserInput"
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Contraseña Nueva:</label>
                <input
                  className="perfilUserInput"
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <button className="submitPerfilUsuario" onClick={handleChangePassword}>
                Cambiar Contraseña
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PerfilArtesanos;
