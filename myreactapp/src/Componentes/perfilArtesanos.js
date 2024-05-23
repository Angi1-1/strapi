    // La pagina para perfil Artesanos
    import { Link } from "react-router-dom";
    import React, { useState } from "react";
    import "./CSS/perfilUser.css";
    import Header from "./header";
    import Footer from "./footer";

    const PerfilArtesanos = () => {
    const [isTrue, setIsTrue] = useState(true);
    const [userData, setUserData] = useState({
        userName: "EmpresaName",
        email: "EmpresaName@gmail.com",
        phone: "640 000 000",
        address: "Direccion del empresa",
    });
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    });

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
                <label className="perfilUserTexto4">{userData.userName}</label>
                </div>
                <div className="nombrePerfilUser">
                <label className="perfilUserTexto4">Correo electrónico:</label>
                <label className="perfilUserTexto4">{userData.email}</label>
                </div>
                <div className="nombrePerfilUser">
                <label className="perfilUserTexto4">Número de teléfono:</label>
                <label className="perfilUserTexto4">{userData.phone}</label>
                </div>
                <div className="nombrePerfilUser">
                <label className="perfilUserTexto4">Domicilio:</label>
                <label className="perfilUserTexto4">{userData.address}</label>
                </div>
                <button className="submitPerfilUsuario" onClick={changeOnClick}>
                Modificar
                </button>
            </div>
            ) : (
            <div className="cambioPerfilUser">
                <div className="derechaPerfilUser">
                <label className="perfilUserTitulo">Bienvenida User</label>
                <label className="perfilUserTexto3">Tus Datos</label>
                <div className="nombrePerfilUser2">
                    <label className="perfilUserTexto4">Nombre:</label>
                    <input
                    className="perfilUserInput"
                    type="text"
                    name="userName"
                    value={userData.userName}
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
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="nombrePerfilUser2">
                    <label className="perfilUserTexto4">Domicilio:</label>
                    <input
                    className="perfilUserInput"
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    />
                </div>
                <button className="submitPerfilUsuario" onClick={changeOnClick}>
                    Guardar
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
                <button className="submitPerfilUsuario">
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
