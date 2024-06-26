import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "./header";
import Footer from "./footer";
import "./CSS/home.css";

import imagen4 from "../Icon/hecho-a-mano.png";
import imagen3 from "../Icon/colaborar 1.png"
import imagen2 from "../Icon/entrega-rapida.png";
import imagen5 from "./img/Rectangle 13.png";
import imagen6 from "./img/rectangle14.png";
import imagen7 from "./img/Rectangle 15.png";
import imagen8 from "./img/foto.png";
import imagen9 from "./img/image 1.png";
import imagen10 from "./img/pendientes.png";
import pendientes from "./img/rojo.png";
import champu from "./img/champu.png";
import plato from "./img/plato.png";

function Home() {
  const navigate = useNavigate();

  const handleProductClick = (id) => () => {
    console.log("Has seleccionado", id);
    navigate(`/producto/${id}`);
  };

  return (
    <>
      <Header />
      <div>
        <main className="main">
          <div className="parte1Home">
            <div className="contenido">
              <div className="texto">
                <p className="p1">CON MODELOS EXCLUSIVOS</p>
                <p className="p2">MANOS CREADORAS 2024</p>
              </div>
            </div>
          </div>

          {/* Segunda sección de la home */}
          <div className="parte2Home">
            <p className="centrado">SENCILLEZ, CONFORME Y CREATIVO</p>
            <p className="centrado2">
              Manos creadoras presenta sus nuevas creaciones para el hogar,
              joyerias y comesticos: ante nuestra mirada, el pasado se proyecta en
              el presente
            </p>
            <div className="imagenes">
              <div onClick={handleProductClick(8)}>
                <img src='joyeria/9.png' style={{width:'350px', height:'310.11px'}} alt="PENDIENTE PERLA" className="img" />
                <p className="p3">PENDIENTE PERLA</p>
              </div>
              <div onClick={handleProductClick(29)}>
                <img src={imagen6} alt="PLATO HEHUA" className="img" />
                <p className="p3">PLATO HEHUA</p>
              </div>
              <div onClick={handleProductClick(47)}>
                <img src={imagen7} alt="CHAMPU ROSAR"className="img" />
                <p className="p3">Set de Regalo</p>
              </div>
            </div>
          </div>
          
          {/* Tercera sección */}
          <div className="parte3Home">
            <div className="izquierdaHome">
              <Link to='/PaginaProceso'>
              <p>LA EXCLUSIVA COLECCIÓN DE VERANO</p>
              <p className="p4">KaiKai & Manos Creadoras</p>
              <img src={imagen8} alt="" className="img"/></Link>
            </div>
            <div className="derechaHome">
              
              <p>DESCUBRE ROJO PARA AMAR</p>
              <p className="p4A">Están aquí: colecciones Primavera / Verano Rojo 2024</p>
              <Link to='/joyeria/'><img src={imagen10} alt="" className="img"/></Link>
              <p>MUEBLES DESIGUALES</p>
              <p className="p4">Diseños pensados para tí</p>
              <Link to='/hogar/'><img src={imagen9} alt="" className="img"/></Link>
            </div>
          </div>

          {/* Cuarta sección */}
          <div className="parte4Home">
            <p>EL TIEMPO AVANZA</p>
            <p className="g">NOVEDADES</p>
            <div className="productosHome">
              <div onClick={handleProductClick(2)}>
                <img src={pendientes} alt="PENDIENTE ROJO" className="img" />
                <p>PENDIENTE ROJO</p>
                <p className="precio">€ 20</p>
              </div>
              <div onClick={handleProductClick(4)}>
                <img src="/joyeria/collar.png" alt="COLLAR DE PERLA" className="img" />
                <p>COLLAR DE PERLA</p>
                <p className="precio">€ 70</p>
              </div>
              <div onClick={handleProductClick(46)}>
                <img src={champu} alt="CHAMPU ANTICAIDA" className="img" />
                <p>CHAMPU ANTICAIDA</p>
                <p className="precio">€ 16</p>
              </div>
              <div onClick={handleProductClick(31)}>
                <img src={plato} alt="PLATO UNIVERSO" className="img" />
                <p>PLATO DORADO</p>
                <p className="precio">€ 5</p>
              </div>
            </div>
            <button className="buttonHome"><Link to="/joyeria/">VER TODO</Link></button>
          </div>

          {/* Quinta sección */}
          <div className="featuresHome">
            <p>MANOS CREADORAS - ARTESANOS PARA TOD@S</p>
            <p className="p">
              Manos Creadoras es un emporio de auténtica artesanía y creatividad,
              ofreciendo una colección exclusiva de productos hechos a mano para
              aquellos que valoran el arte tradicional y la singularidad. Nuestros
              especialistas en compra exploran rincones culturales de todo el
              mundo con un objetivo firme: seleccionar y llevar hasta su hogar las
              creaciones artesanales más exquisitas y originales. Con lanzamientos
              constantes de artículos únicos, una página web intuitiva y de fácil
              manejo, así como una aplicación móvil para que realice sus compras
              desde cualquier lugar, garantizamos una experiencia de compra
              excepcional que captura la esencia de visitar una boutique
              artesanal.
            </p>
            <div className="featureHomeContainer">
              <div className="featureHome">
                <img src={imagen4} alt="Icono de búsqueda" className="img"/>
                <h2>Selección de Artesanos</h2>
                <p>Somos +10 artesanos</p>
              </div>
              <div className="featureHome">
                <img src={imagen3} alt="Icono de artesanía" className="img"/>
                <h2>Colaboraciones con Artesano</h2>
              </div>
              <div className="featureHome">
                <img src={imagen2} alt="Icono de entrega" className="img"/>
                <h2>Entrega Rápida</h2>
                <p>1-3 días hábiles</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
