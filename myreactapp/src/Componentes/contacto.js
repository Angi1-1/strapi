import React from "react";
import { Link } from 'react-router-dom';
import Header from "./header";
import Footer from "./footer";
import "./CSS/contacto.css"; 

const Contacto = () => {
  return (<>
    <Header />
    <div className="breadcrumb">
      <p><Link to="/home" className="link">Home</Link> / <Link to="/contacto"  className="link">Contacto</Link></p>
    </div>
    <div className="legal">
      <div className="banner">
        <h1 className="tituloBanner">CONTACTE CON NOSOTROS</h1>
      </div>
      <div className="contenedor">
        <div className="izquierdo">
          <p className="textoFormulario">Para cualquier duda o sugerencia </p>
          <form className="formulario">
            <input type="text" placeholder="Nombre" className="inputForm" />
            <input type="text" placeholder="Correo electrónico" className="inputForm" />
            <input type="text" placeholder="Asunto" className="inputForm" />
            <textarea placeholder="Mensaje" className="textareaForm"></textarea>
            <button type="submit" className="botonContacto">Enviar</button>
          </form>
        </div>
        <div className="derecha">
          <p className="infoEmpresa mediano">Datos de la empresa</p>
          <p className="nombreEmpresa grande">Manos Creadoras</p>
          <p className="direccionEmpresa pequeña">Calle del Tajo, Villaviciosa de Odón 28670, Madrid España</p>
          <p className="telefonoEmpresa pequeña">Telefono: 912 321 123</p>
        </div>
      </div>
    </div>
    <Footer />

    </>
  );
};

export default Contacto;
