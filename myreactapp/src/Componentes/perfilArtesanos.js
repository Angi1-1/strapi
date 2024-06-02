 import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./CSS/perfilUser.css";
import Header from "./header";
import Footer from "./footer";
import bcrypt from 'bcryptjs';

const PerfilArtesanos = () => {
  const navigate = useNavigate()
  const [isTrue, setIsTrue] = useState(true);
  const [EmpresaName, setEmpresaName] = useState(localStorage.getItem('username') || '');
  const [idempresa] = useState(localStorage.getItem('user_id') || '');
  const [userData, setUserData] = useState({});
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [titulo, setTitulo] = useState(localStorage.getItem('username'));
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const artesanoData = async () => {
    console.log("id de usuario",idempresa)
    try {
      const response = await fetch(`http://localhost:1337/api/usuariomanos/${idempresa}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de artesanos", data.data.attributes);
        setUserData(data.data.attributes);
        localStorage.setItem('username', data.data.attributes.nombreApellido);
        setTitulo(data.data.attributes.nombreApellido);
      } else {
        console.log("Error al obtener los datos de artesanos");
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

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
    if (name === "nombreApellido") {
      setEmpresaName(value);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
  
    // Validar que nombreApellido solo contenga letras y no esté vacío
    if (!userData.nombreApellido) {
      newErrors.nombreApellido = "El nombre no puede estar vacío.";
    } else if (!/^[a-zA-Z\s]+$/.test(userData.nombreApellido)) {
      newErrors.nombreApellido = "El nombre solo puede contener letras.";
    }
  
    // Validar que el teléfono contenga exactamente 6 dígitos y no esté vacío
    if (!userData.telefono) {
      newErrors.telefono = "El teléfono no puede estar vacío.";
    } else if (!/^\d{9}$/.test(userData.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 9 dígitos.";
    }
  
    // Validar que el domicilio no esté vacío
    if (!userData.domicilio) {
      newErrors.domicilio = "El domicilio no puede estar vacío.";
    }
  
    // Validar la nueva contraseña si se proporciona
    if (passwords.newPassword && passwords.newPassword.length < 6) {
      newErrors.newPassword = "La nueva contraseña debe tener al menos 6 caracteres.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSave = async () => {
    if (validateFields()) {
      try {
        const response = await fetch(`http://localhost:1337/api/usuariomanos/${idempresa}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              nombreApellido: userData.nombreApellido,
              email: userData.email,
              telefono: userData.telefono,
              domicilio: userData.domicilio,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Datos actualizados", data.data.attributes);
          setUserData(data.data.attributes);
          localStorage.setItem('username', data.data.attributes.nombreApellido);
          setEmpresaName(data.data.attributes.nombreApellido);
          setTitulo(data.data.attributes.nombreApellido);
          setIsTrue(true);
        } else {
          console.log("Error al actualizar los datos");
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    }
  };

  const handleChangePassword = async () => {
    setErrors({ oldPassword: '' });
    setErrors({ newPassword: '' });
    setSuccessMessage("");
    const hashedPassword = await bcrypt.hash(passwords.newPassword, 10);
    try {
      // Verificar la contraseña antigua
      const match = await bcrypt.compare(passwords.oldPassword, userData.passwordUser);
      if (match) {
        // Validar la nueva contraseña
        if (passwords.newPassword.length >= 6) {
          // Enviar la nueva contraseña al servidor
          const response = await fetch(`http://localhost:1337/api/usuariomanos/${idempresa}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: {
                passwordUser: hashedPassword,
              },
            }),
          });

          if (response.ok) {
            setSuccessMessage("Contraseña actualizada con éxito.");
            setPasswords({ oldPassword: "", newPassword: "" });
          } else {
            console.log("Error al actualizar la contraseña.");
          }
        } else {
          setErrors({ newPassword: "La nueva contraseña debe tener al menos 6 caracteres." });
        }
      } else {
        setErrors({ oldPassword: "La contraseña antigua no coincide." });
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
          <Link to="/perfilAdmin" className="link">
            Perfil del admin
          </Link>
        </p>
      </div>
      <div className="perfilArtesanoParte1" >
        <div className="izquierdaPerfilArtesano">
          <Link to="/perfilAdmin" className="perfilUserTexto1 link2">
            Mi Cuenta
          </Link>
          <Link to="/perdidosProvedores" className="perfilUserTexto2 link2">
            Pedidos
          </Link>
          <Link to="/misPerdidosProvedores" className="perfilUserTexto2 link2">
            Mis Productos
          </Link>
          <label onClick={handleLogout} className="perfilUserTexto2 link2">
            Cerrar Sesión
          </label>
        </div>

        {isTrue ? (
          <div className="derechaPerfilUser" style={{width:'50%'}}>
            <label className="perfilUserTitulo">
              Bienvenida {titulo}
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
            <button className="submitPerfilUsuario" onClick={changeOnClick} style={{width:'50%'}}>
              Modificar
            </button>
          </div>
        ) : (
          <div className="cambioPerfilUser">
            <div className="derechaPerfilUser" style={{width:'50%'}}>
              <label className="perfilUserTitulo">Bienvenida {titulo}</label>
              <label className="perfilUserTexto3">Tus Datos</label>
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Correo electrónico:</label>
                <label className="perfilUserInput">{userData.email}</label>
              </div>
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Nombre:</label>
                <input
                  className="perfilUserInput"
                  type="text"
                  name="nombreApellido"
                  value={userData.nombreApellido}
                  onChange={handleInputChange}
                />
                
              </div>{errors.nombreApellido && <p className="error">{errors.nombreApellido}</p>}
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Número de teléfono:</label>
                <input
                  className="perfilUserInput"
                  type="tel"
                  name="telefono"
                  value={userData.telefono}
                  onChange={handleInputChange}
                />
               
              </div> {errors.telefono && <p className="error">{errors.telefono}</p>}
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Domicilio:</label>
                <input
                  className="perfilUserInput"
                  type="text"
                  name="domicilio"
                  value={userData.domicilio}
                  onChange={handleInputChange}
                />
               
              </div> {errors.domicilio && <p className="error">{errors.domicilio}</p>}
              <button className="submitPerfilUsuario" onClick={handleSave}>
                Guardar
              </button>
              <button className="submitPerfilUsuario" onClick={changeOnClick}>
                Cancelar
              </button>
            </div>
            <div className="derechaPerfilUser2" style={{width:'50%'}}>
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
               
              </div> {errors.oldPassword && <p className="error">{errors.oldPassword}</p>}
              <div className="nombrePerfilUser2">
                <label className="perfilUserTexto4">Contraseña Nueva:</label>
                <input
                  className="perfilUserInput"
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
               
              </div> {errors.newPassword && <p className="error">{errors.newPassword}</p>}
              {successMessage && <p className="success" style={{color:'green'}}>{successMessage}</p>}
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
