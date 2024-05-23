import React from "react";
import { Link } from 'react-router-dom';
import Header from "./header";
import Footer from "./footer";
import "./CSS/carrito.css";
import collar from "./img/collar.jpg";

function Carrito() {
  return (
    <>
      <Header />
      <div className="breadcrumb">
        <p><Link to="/home" className="link">Home</Link> / <Link to="/carrito" className="link">Carrito</Link></p>
      </div>
      <div className="carrito-container">
        <main>
          <h1 className="carrito-title">Tu Carrito de Compras</h1>
          <div className="carrito-item" data-aos="fade-right">
            <div className="carrito-item-left">
              <img src={collar} alt="collar" />
              <div className="carrito-item-details">
                <p className="carrito-texto1">Collar de Perlas</p>
                <p className="carrito-texto2">Elegante collar de perlas naturales</p>
                <p className="carrito-texto2">Nº de artículo: 123456</p>
                <p className="carrito-texto2">Talla: Única</p>
              </div>
            </div>
            <div className="carrito-item-right">
              <div>
                <p className="carrito-texto1">Precio: 100€</p>
                <p className="carrito-texto1">Subtotal: 100€</p>
              </div>
              <div>
                <p className="borde">Cantidad: 1</p>
                <button className="eliminar-btn">Eliminar</button>
              </div>
            </div>
          </div>
          <div className="carrito-summary" data-aos="fade-left">
            <div className="carrito-summary-left">
              <input type="text" className="carrito-input" placeholder="Código de Descuento" />
              <button className="carrito-texto3">Aplicar Código</button>
            </div>
            <div className="carrito-summary-right">
              <div className="parte1">
                <p className="carrito-texto1">Subtotal</p>
                <p className="carrito-texto1">100€</p>
              </div>
              <div className="parte2">
                <p className="carrito-texto1">Envío gratuito</p>
                <p className="carrito-texto1">0€</p>
              </div>
              <hr className="carrito-separator" />
              <div className="parte3">
                <p className="carrito-texto1">Total</p>
                <p className="carrito-texto1">100€</p>
              </div>
              <p className="carrito-texto4">Incl. IVA; Incl. gastos de envío</p>
            </div>
          </div>
          <button className="pago-btn" data-aos="zoom-in">Continuar con el Pago</button>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Carrito;
