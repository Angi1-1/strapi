import React from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./CSS/sobreNosotros.css";

import imagen1 from "./img/imagen1.png";
import imagen2 from "./img/imagen2.png";

function importGoogleFont() {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

importGoogleFont();

const Contacto = () => {
  return (
    <>
      <Header />
      <div className="breadcrumb">
        <p>
          <Link to='/home' className="link">
            Home
          </Link>{" "}
          /{" "}
          <Link to='/legal' className="link">
            Legal
          </Link>
        </p>
      </div>
      <div className="legal">
        <div className="contentSobre diferenciado">
          <h1>La mejor selección de Artesanos</h1>
          <p>
            Manos Creadoras es una plataforma en línea dedicada a la venta de
            productos artesanales, donde cada pieza refleja la pasión y el
            talento de artesanos locales. Desde su creación, Manos Creadoras ha
            servido como un puente vital entre artesanos talentosos y un público
            global que valora el arte y la artesanía tradicional. Ofreciendo una
            amplia gama de productos únicos, desde joyería hecha a mano hasta
            cerámicas, la plataforma no solo celebra la diversidad de las
            artesanías, sino que también fomenta una economía sostenible y
            ética.
          </p>
        </div>
        <div className="contenedor">
          <div className="texto1">
            <h1>200 +</h1>
            <p>Artesanos Con Nosotros</p>
          </div>
          <div className="texto2">
            <h1>24 horas</h1>
            <p>Atención Al Cliente</p>
          </div>
          <div className="texto3">
            <h1>130+</h1>
            <p>Países a los que enviamos</p>
          </div>
        </div>
        <div className="bloque1">
          <p>
            En Manos Creadoras, cada artículo es seleccionado cuidadosamente
            para asegurar que cumple con los más altos estándares de calidad y
            originalidad. La plataforma se enorgullece de su compromiso con la
            autenticidad, promoviendo productos que no solo son hermosos y
            funcionales sino que también cuentan historias de cultura y
            tradición.{" "}
          </p>
          <img alt="manos creadoras" src={imagen1} className="img" />
        </div>
        <div className="bloque2">
          <img alt="manos creadoras" src={imagen2} className="img" />
          <p>
            Manos Creadoras proporciona herramientas y recursos para ayudar a
            estos creadores a prosperar en un mercado global. Este enfoque único
            no solo ha capturado la imaginación de consumidores de todo el
            mundo, sino que también ha establecido a Manos Creadoras como un
            líder en el mercado de productos artesanales auténticos y de
            calidad.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contacto;
